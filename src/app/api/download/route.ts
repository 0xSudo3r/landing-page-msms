import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  const version = searchParams.get("version") || "latest";

  if (!url || !url.includes("github.com")) {
    console.error("Download API: Invalid URL provided");
    return new NextResponse("Invalid URL", { status: 400 });
  }

  const token = process.env.GITHUB_TOKEN || process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  if (!token) {
    console.error("Download API: No GitHub token configured");
    return new NextResponse("GitHub token not configured", { status: 500 });
  }

  try {
    console.log("Downloading from:", url);
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/octet-stream",
      },
    });

    console.log("GitHub response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      console.error("GitHub API error:", response.status, errorText);
      throw new Error(`GitHub returned ${response.status}: ${errorText}`);
    }

    const contentLength = response.headers.get("content-length");
    const contentType = response.headers.get("content-type") || "application/octet-stream";

    const headers = new Headers();
    headers.set("Content-Type", contentType);
    headers.set("Content-Disposition", `attachment; filename="MobileShopManager-Setup-${version}.exe"`);
    if (contentLength) {
      headers.set("Content-Length", contentLength);
    }

    return new NextResponse(response.body, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Download proxy error:", error);
    return new NextResponse(`Failed to download: ${error instanceof Error ? error.message : String(error)}`, { 
      status: 500 
    });
  }
}