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
    console.log("Step 1: Getting download URL from GitHub API");
    console.log("Original URL:", url);
    
    const response = await fetch(url, {
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/octet-stream",
      },
      redirect: "manual",
    });

    console.log("Step 2: GitHub response status:", response.status);
    console.log("Response headers:", Object.fromEntries(response.headers.entries()));

    if (response.status === 302 || response.status === 301) {
      const redirectUrl = response.headers.get("location");
      console.log("Step 3: Redirect URL:", redirectUrl);
      
      if (!redirectUrl) {
        throw new Error("No redirect URL provided");
      }

      console.log("Step 4: Fetching from redirect URL");
      const downloadResponse = await fetch(redirectUrl, {
        headers: {
          Accept: "application/octet-stream",
        },
      });

      console.log("Step 5: Download response status:", downloadResponse.status);

      if (!downloadResponse.ok) {
        throw new Error(`Download failed with status ${downloadResponse.status}`);
      }

      const contentLength = downloadResponse.headers.get("content-length");
      const contentType = downloadResponse.headers.get("content-type") || "application/octet-stream";

      const headers = new Headers();
      headers.set("Content-Type", contentType);
      headers.set("Content-Disposition", `attachment; filename="MobileShopManager-Setup-${version}.exe"`);
      if (contentLength) {
        headers.set("Content-Length", contentLength);
      }

      return new NextResponse(downloadResponse.body, {
        status: 200,
        headers,
      });
    }

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