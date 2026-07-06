import { db } from "@/lib/db";
import { testimonials, blogPosts } from "@/lib/site-data";

export const dynamic = "force-dynamic";

const PLACEHOLDER_CONTENT = "<p>Detailed article content coming soon.</p>";

export async function GET() {
  try {
    let reviewsSeeded = 0;
    let blogSeeded = 0;

    const reviewCount = await db.review.count();
    if (reviewCount === 0 && testimonials.length > 0) {
      const r = await db.review.createMany({
        data: testimonials.map((t) => ({
          name: t.name,
          city: t.city,
          service: t.service,
          rating: t.rating,
          title: t.title,
          message: t.message,
          verified: true,
          approved: true,
        })),
      });
      reviewsSeeded = r.count;
    }

    const blogCount = await db.blogPost.count();
    if (blogCount === 0 && blogPosts.length > 0) {
      const b = await db.blogPost.createMany({
        data: blogPosts.map((p) => ({
          slug: p.slug,
          title: p.title,
          excerpt: p.excerpt,
          content: PLACEHOLDER_CONTENT,
          category: p.category,
          author: p.author,
          readTime: p.readTime,
          published: true,
        })),
      });
      blogSeeded = b.count;
    }

    const finalReviews = await db.review.count();
    const finalBlogs = await db.blogPost.count();

    return Response.json({
      success: true,
      seeded: {
        reviews: reviewsSeeded,
        blogPosts: blogSeeded,
      },
      counts: {
        reviews: finalReviews,
        blogPosts: finalBlogs,
      },
    });
  } catch (err) {
    console.error("[api/seed GET] error:", err);
    return Response.json(
      { success: false, error: "Something went wrong while seeding." },
      { status: 500 }
    );
  }
}
