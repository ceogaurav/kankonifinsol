import nodemailer from "nodemailer";

interface EmailPayload {
  subject: string;
  html: string;
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendFormNotification(payload: EmailPayload) {
  if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
    console.warn("SMTP credentials not found. Email notification skipped.");
    return;
  }

  try {
    await transporter.sendMail({
      from: `"Kankoni Finsol" <${process.env.SMTP_EMAIL}>`,
      to: "kankonidsa@gmail.com",
      subject: payload.subject,
      html: payload.html,
    });
    console.log("Form notification email sent successfully.");
  } catch (error) {
    console.error("Failed to send form notification email:", error);
  }
}
