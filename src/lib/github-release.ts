const GITHUB_OWNER = "0xSudo3r";
const GITHUB_REPO = "mobile-shop-manager-arabic";
const ASSET_PATTERN = /^MobileShopManager-Setup-[\d.]+\.exe$/;

interface GitHubAsset {
  name: string;
  browser_download_url: string;
  size: number;
}

interface GitHubRelease {
  tag_name: string;
  name: string;
  body: string;
  html_url: string;
  published_at: string;
  assets: GitHubAsset[];
}

interface ReleaseInfo {
  version: string;
  downloadUrl: string;
  releaseUrl: string;
  fileSize: number | null;
  publishedAt: string;
}

async function fetchLatestRelease(token?: string): Promise<ReleaseInfo> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/releases/latest`;
  const response = await fetch(url, { headers, next: { revalidate: 300 } });

  if (!response.ok) {
    throw new Error(`GitHub API returned ${response.status}`);
  }

  const release: GitHubRelease = await response.json();
  const exeAsset = release.assets.find((a) => ASSET_PATTERN.test(a.name));

  return {
    version: release.tag_name,
    downloadUrl: exeAsset?.browser_download_url ?? release.html_url,
    releaseUrl: release.html_url,
    fileSize: exeAsset?.size ?? null,
    publishedAt: release.published_at,
  };
}

async function fetchReleaseByVersion(
  version: string,
  token?: string
): Promise<ReleaseInfo> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/releases/tags/${version}`;
  const response = await fetch(url, { headers, next: { revalidate: 300 } });

  if (!response.ok) {
    throw new Error(`GitHub API returned ${response.status}`);
  }

  const release: GitHubRelease = await response.json();
  const exeAsset = release.assets.find((a) => ASSET_PATTERN.test(a.name));

  return {
    version: release.tag_name,
    downloadUrl: exeAsset?.browser_download_url ?? release.html_url,
    releaseUrl: release.html_url,
    fileSize: exeAsset?.size ?? null,
    publishedAt: release.published_at,
  };
}

export { fetchLatestRelease, fetchReleaseByVersion };
export type { ReleaseInfo };
