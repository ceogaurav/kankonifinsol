import ZAI from "z-ai-web-dev-sdk";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

interface EligibilityPayload {
  income?: unknown;
  employment?: unknown;
  creditScore?: unknown;
  loanAmount?: unknown;
  city?: unknown;
  age?: unknown;
  loanType?: unknown;
}

interface EligibleBank {
  bank: string;
  rate: string;
  maxAmount: string;
}

interface EligibilityResult {
  eligible: boolean;
  approvalChance: number;
  eligibleBanks: EligibleBank[];
  estimatedEMI: string;
  interestRate: string;
  loanAmount: string;
  tenure: string;
  summary: string;
  suggestions: string[];
}

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

function toNumber(v: unknown): number | null {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string") {
    const n = parseFloat(v.replace(/[^\d.-]/g, ""));
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

function formatINR(n: number): string {
  const rounded = Math.round(n);
  return `₹${rounded.toLocaleString("en-IN")}`;
}

/**
 * Compute an EMI using the standard reducing-balance formula.
 */
function computeEMI(
  principal: number,
  annualRatePct: number,
  tenureYears: number
): number {
  const r = annualRatePct / 100 / 12;
  const n = Math.max(1, Math.round(tenureYears * 12));
  if (r === 0) return principal / n;
  const factor = Math.pow(1 + r, n);
  return (principal * r * factor) / (factor - 1);
}

function buildFallback(input: {
  income: number;
  creditScore: number;
  loanAmount: number;
  loanType?: string;
}): EligibilityResult {
  const { income, creditScore, loanAmount } = input;

  const eligible = creditScore >= 680 && income >= 20000;
  const approvalChance = clamp(Math.round(creditScore - 500), 0, 100);

  // Rough rate estimate based on credit score
  const baseRate =
    creditScore >= 800
      ? 10.49
      : creditScore >= 750
        ? 11.25
        : creditScore >= 700
          ? 12.5
          : 14.0;

  // Tenure based on loan type (default 5 years)
  const tenureYears = 5;
  const emi = computeEMI(loanAmount, baseRate, tenureYears);

  // Pick 3 deterministic banks based on creditScore
  const allBanks: EligibleBank[] = [
    { bank: "ICICI", rate: `${baseRate.toFixed(2)}% p.a.`, maxAmount: formatINR(loanAmount) },
    { bank: "HDFC", rate: `${(baseRate + 0.15).toFixed(2)}% p.a.`, maxAmount: formatINR(loanAmount) },
    { bank: "SBI", rate: `${(baseRate + 0.25).toFixed(2)}% p.a.`, maxAmount: formatINR(loanAmount) },
    { bank: "Axis", rate: `${(baseRate + 0.1).toFixed(2)}% p.a.`, maxAmount: formatINR(loanAmount) },
    { bank: "Kotak", rate: `${(baseRate + 0.2).toFixed(2)}% p.a.`, maxAmount: formatINR(loanAmount) },
  ];
  const startIdx = creditScore % allBanks.length;
  const eligibleBanks = [
    allBanks[startIdx],
    allBanks[(startIdx + 1) % allBanks.length],
    allBanks[(startIdx + 2) % allBanks.length],
  ];

  const suggestions: string[] = [];
  if (creditScore < 750) {
    suggestions.push("Improve your CIBIL score to 750+ to unlock the lowest interest rates.");
  }
  if (income < 30000) {
    suggestions.push("Add a co-applicant with stable income to boost your eligibility.");
  }
  suggestions.push("Keep credit card utilisation below 30% of your limit for the next 60 days.");
  suggestions.push("Use Kankoni's balance-transfer service to lower your EMI if you already have a loan.");

  return {
    eligible,
    approvalChance,
    eligibleBanks,
    estimatedEMI: `${formatINR(emi)}/mo`,
    interestRate: `${baseRate.toFixed(2)}% p.a.`,
    loanAmount: formatINR(loanAmount),
    tenure: `${tenureYears} years`,
    summary: eligible
      ? `Based on your CIBIL ${creditScore} and monthly income ${formatINR(income)}, you appear eligible for a loan around ${formatINR(loanAmount)} at ${baseRate.toFixed(2)}% p.a.`
      : `With CIBIL ${creditScore} and monthly income ${formatINR(income)}, your eligibility is currently limited. Strengthening your credit profile can improve your approval odds.`,
    suggestions,
  };
}

/**
 * Strips ```json ... ``` code fences (and any leading/trailing prose) and
 * returns the parsed JSON object, or null on failure.
 */
function parseLooseJSON(text: string): unknown | null {
  if (!text) return null;

  // Strip code fences if present
  const fenceMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fenceMatch ? fenceMatch[1] : text;

  // Try direct parse first
  try {
    return JSON.parse(candidate.trim());
  } catch {
    // fall through
  }

  // Find the first `{` ... last `}` and try parsing that slice
  const start = candidate.indexOf("{");
  const end = candidate.lastIndexOf("}");
  if (start !== -1 && end !== -1 && end > start) {
    try {
      return JSON.parse(candidate.slice(start, end + 1));
    } catch {
      // fall through
    }
  }

  return null;
}

function isValidResult(v: unknown): v is EligibilityResult {
  if (typeof v !== "object" || v === null) return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.eligible === "boolean" &&
    typeof o.approvalChance === "number" &&
    Array.isArray(o.eligibleBanks) &&
    typeof o.summary === "string"
  );
}

const SYSTEM_PROMPT =
  "You are Kankoni's AI loan-eligibility engine. You MUST respond with STRICT JSON ONLY — no markdown, no code fences, no prose, no explanation. The JSON must exactly match the requested shape.";

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    if (!rateLimit(`eligibility:${ip}`, 15, 60_000)) {
      return Response.json(
        { success: false, error: "Too many requests. Please try again shortly." },
        { status: 429 }
      );
    }

    let body: EligibilityPayload;
    try {
      body = (await req.json()) as EligibilityPayload;
    } catch {
      return Response.json(
        { success: false, error: "Invalid JSON body." },
        { status: 400 }
      );
    }

    const income = toNumber(body.income);
    const creditScore = toNumber(body.creditScore);
    const loanAmount = toNumber(body.loanAmount);
    const age = toNumber(body.age);

    if (income === null || creditScore === null || loanAmount === null) {
      return Response.json(
        {
          success: false,
          error: "income, creditScore and loanAmount are required (numeric).",
        },
        { status: 400 }
      );
    }

    if (creditScore < 300 || creditScore > 900) {
      return Response.json(
        { success: false, error: "creditScore must be between 300 and 900." },
        { status: 400 }
      );
    }

    if (income < 0 || loanAmount < 0) {
      return Response.json(
        { success: false, error: "income and loanAmount must be positive." },
        { status: 400 }
      );
    }

    const employment = isNonEmptyString(body.employment)
      ? body.employment.trim()
      : "Salaried";
    const city = isNonEmptyString(body.city) ? body.city.trim() : "India";
    const loanType = isNonEmptyString(body.loanType)
      ? body.loanType.trim()
      : "Personal Loan";
    const ageStr = age !== null ? `${age}` : "30";

    const userPrompt = `Assess Indian loan eligibility. Respond with STRICT JSON ONLY of this exact shape (no markdown, no prose):

{
  "eligible": boolean,
  "approvalChance": integer 0-100,
  "eligibleBanks": [ { "bank": "ICICI", "rate": "9.99% p.a.", "maxAmount": "₹1,00,00,000" } ],
  "estimatedEMI": "₹12,345/mo",
  "interestRate": "9.99% p.a.",
  "loanAmount": "₹1,00,00,000",
  "tenure": "5 years",
  "summary": "1-2 sentence human summary",
  "suggestions": ["actionable suggestion", "actionable suggestion", "actionable suggestion"]
}

Rules:
- Provide 3 to 5 banks in eligibleBanks from real Indian lenders (ICICI, HDFC, SBI, Axis, Kotak, IDFC First, Bajaj Finance, Tata Capital, Yes Bank, IndusInd, Federal, BOB, PNB, Canara).
- For Personal Loans (if CIBIL is 730 or above), specifically assign these starting interest rates: ICICI (9.99%), HDFC (9.99%), IDFC First (9.99%), Axis (13.00%), Aditya Birla (13.00%). Do not invent rates below 8.35% for home loans.
- Amounts must be formatted with ₹ and Indian digit grouping (e.g. ₹1,00,00,000).
- approvalChance must be a whole number 0-100 consistent with eligible.
- suggestions: exactly 3 short, actionable items.
- Keep summary to 1-2 sentences.
- Output ONLY the JSON object.

Applicant profile:
- Monthly income: ₹${income.toLocaleString("en-IN")}
- Employment: ${employment}
- CIBIL score: ${creditScore}
- Loan amount requested: ₹${loanAmount.toLocaleString("en-IN")}
- Loan type: ${loanType}
- City: ${city}
- Age: ${ageStr} years`;

    let result: EligibilityResult | null = null;
    let usedFallback = false;

    try {
      const zai = await ZAI.create();
      const completion = await zai.chat.completions.create({
        messages: [
          { role: "assistant", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
        thinking: { type: "disabled" },
      });
      const raw = completion?.choices?.[0]?.message?.content || "";
      const parsed = parseLooseJSON(raw);
      if (parsed && isValidResult(parsed)) {
        result = parsed;
      } else {
        usedFallback = true;
      }
    } catch (llmErr) {
      console.error("[api/eligibility LLM] error:", llmErr);
      usedFallback = true;
    }

    if (!result) {
      result = buildFallback({ income, creditScore, loanAmount, loanType });
      usedFallback = true;
    }

    return Response.json({
      success: true,
      ...(usedFallback ? { fallback: true } : {}),
      result,
    });
  } catch (err) {
    console.error("[api/eligibility POST] error:", err);
    return Response.json(
      { success: false, error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
