import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const version = searchParams.get("version") || "latest";

  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    console.error("Download API: No GitHub token configured");
    return new NextResponse("GitHub token not configured", { status: 500 });
  }

  try {
    const owner = "0xSudo3r";
    const repo = "mobile-shop-manager-arabic";
    
    console.log("Fetching latest release from GitHub API...");
    
    const releaseResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/releases/latest`,
      {
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github+json",
        },
      }
    );

    if (!releaseResponse.ok) {
      throw new Error(`Failed to fetch release: ${releaseResponse.status}`);
    }

    const release = await releaseResponse.json();
    const exeAsset = release.assets?.find((asset: any) =>
      asset.name.endsWith(".exe")
    );

    if (!exeAsset) {
      throw new Error("No .exe asset found in release");
    }

    console.log("Found asset:", exeAsset.name);
    console.log("Asset URL:", exeAsset.url);

    const assetId = exeAsset.id;
    
    const assetResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/releases/assets/${assetId}`,
      {
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/octet-stream",
        },
      }
    );

    if (!assetResponse.ok) {
      throw new Error(`Failed to fetch asset: ${assetResponse.status}`);
    }

    const contentLength = assetResponse.headers.get("content-length");
    const contentType = assetResponse.headers.get("content-type") || "application/octet-stream";

    const headers = new Headers();
    headers.set("Content-Type", contentType);
    headers.set("Content-Disposition", `attachment; filename="MobileShopManager-Setup-${version}.exe"`);
    if (contentLength) {
      headers.set("Content-Length", contentLength);
    }

    return new NextResponse(assetResponse.body, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Download proxy error:", error);
    return new NextResponse(`Failed to download: ${error instanceof Error ? error.message : String(error)}`, {
      status: 500,
    });
  }
}