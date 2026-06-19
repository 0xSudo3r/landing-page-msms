import { NextResponse } from "next/server";
import { fetchLatestRelease } from "@/lib/github-release";
import type { ReleaseInfo } from "@/lib/github-release";

let cached: { data: ReleaseInfo; timestamp: number } | null = null;
const CACHE_TTL = 5 * 60 * 1000;

export async function GET() {
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return NextResponse.json(cached.data, {
      headers: { "X-Data-Source": "cache" },
    });
  }

  try {
    const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN || undefined;
    const data = await fetchLatestRelease(token);
    cached = { data, timestamp: Date.now() };

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        "X-Data-Source": "github-api",
      },
    });
  } catch {
    return NextResponse.json(
      {
        version: "أحدث إصدار",
        downloadUrl:
          "https://github.com/0xSudo3r/mobile-shop-manager-arabic/releases/latest",
        releaseUrl:
          "https://github.com/0xSudo3r/mobile-shop-manager-arabic/releases/latest",
        fileSize: null,
        publishedAt: new Date().toISOString(),
      },
      { status: 200 }
    );
  }
}
