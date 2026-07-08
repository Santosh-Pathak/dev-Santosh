import { NextResponse } from "next/server";
import { XMLParser } from "fast-xml-parser";

const MEDIUM_USERNAME = "pathaksantosh987";
const MEDIUM_FEED_URL = `https://medium.com/feed/@${MEDIUM_USERNAME}`;

export interface MediumPost {
  title:       string;
  link:        string;
  pubDate:     string;
  author:      string;
  thumbnail:   string;
  description: string;
  categories:  string[];
  readingTime: number;
}

export interface MediumFeedResponse {
  status: "ok" | "error";
  posts:  MediumPost[];
  error?: string;
}

function stripHtml(html: string): string {
  return (html ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function estimateReadTime(text: string): number {
  return Math.max(1, Math.round(text.trim().split(/\s+/).length / 200));
}

/** Extract first <img src="..."> from an HTML string */
function extractFirstImage(html: string): string {
  const m = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return m ? m[1] : "";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function asArray(val: any): any[] {
  if (!val) return [];
  return Array.isArray(val) ? val : [val];
}

export async function GET() {
  try {
    const res = await fetch(MEDIUM_FEED_URL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; portfolio-bot/1.0; +https://santosh-pathak-portfolio.vercel.app)",
        "Accept": "application/rss+xml, application/xml, text/xml, */*",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Medium feed responded ${res.status}`);
    }

    const xml = await res.text();

    const parser = new XMLParser({
      ignoreAttributes:       false,
      attributeNamePrefix:    "@_",
      cdataPropName:          "__cdata",
      allowBooleanAttributes: true,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parsed: any = parser.parse(xml);
    const items = asArray(parsed?.rss?.channel?.item ?? []);

    if (items.length === 0) {
      return NextResponse.json<MediumFeedResponse>({
        status: "error",
        posts:  [],
        error:  "No posts found on this Medium profile yet.",
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const posts: MediumPost[] = items.slice(0, 6).map((item: any) => {
      const contentHtml: string =
        item["content:encoded"]?.["__cdata"] ??
        item["content:encoded"] ??
        item.description?.["__cdata"] ??
        item.description ??
        "";

      const descHtml: string =
        item.description?.["__cdata"] ??
        item.description ??
        "";

      const plainText  = stripHtml(contentHtml || descHtml);
      const thumbnail  = extractFirstImage(contentHtml) || extractFirstImage(descHtml);

      const rawCats = asArray(item.category ?? []);
      const categories: string[] = rawCats.map((c: unknown) =>
        typeof c === "object" && c !== null
          ? String((c as Record<string, unknown>)["__cdata"] ?? (c as Record<string, unknown>)["#text"] ?? c)
          : String(c)
      ).filter(Boolean);

      return {
        title:       String(item.title?.["__cdata"] ?? item.title ?? "Untitled"),
        link:        String(item.link ?? item.guid?.["#text"] ?? item.guid ?? "#"),
        pubDate:     String(item.pubDate ?? ""),
        author:      String(item["dc:creator"]?.["__cdata"] ?? item["dc:creator"] ?? MEDIUM_USERNAME),
        thumbnail,
        description: plainText.slice(0, 200) + (plainText.length > 200 ? "…" : ""),
        categories,
        readingTime: estimateReadTime(plainText),
      };
    });

    return NextResponse.json<MediumFeedResponse>({ status: "ok", posts });
  } catch (err) {
    console.error("[/api/medium]", err);
    return NextResponse.json<MediumFeedResponse>(
      { status: "error", posts: [], error: String(err) },
      { status: 500 }
    );
  }
}
