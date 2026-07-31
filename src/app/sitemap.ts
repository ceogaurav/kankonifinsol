import { MetadataRoute } from 'next';

const pages = [
  "",
  "?p=services",
  "?p=eligibility",
  "?p=emi",
  "?p=compare",
  "?p=about",
  "?p=partners",
  "?p=reviews",
  "?p=resources",
  "?p=contact",
  "?p=careers",
  "?p=privacy",
  "?p=terms"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.kankonifinsol.com';

  return pages.map((page) => ({
    url: `${baseUrl}/${page}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: page === "" ? 1 : 0.8,
  }));
}
