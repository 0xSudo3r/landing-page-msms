"use client";

import { useEffect, useState } from "react";
import { Download, Loader2 } from "lucide-react";

interface ReleaseData {
  version: string;
  downloadUrl: string;
}

export function DownloadButton() {
  const [data, setData] = useState<ReleaseData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLatestRelease() {
      try {
        const response = await fetch(
          "https://api.github.com/repos/0xSudo3r/mobile-shop-manager-arabic/releases/latest"
        );
        
        if (!response.ok) {
          throw new Error("No releases found");
        }
        
        const json = await response.json();
        const exeAsset = json.assets?.find((asset: any) => 
          asset.name.endsWith(".exe")
        );

        if (exeAsset) {
          setData({
            version: json.tag_name,
            downloadUrl: exeAsset.browser_download_url,
          });
        } else {
          setData({
            version: json.tag_name,
            downloadUrl: json.html_url,
          });
        }
      } catch (error) {
        // Always make it clickable and point to the requested URL
        setData({
          version: "أحدث إصدار",
          downloadUrl: "https://github.com/0xSudo3r/mobile-shop-manager-arabic/releases/latest",
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchLatestRelease();
  }, []);

  const handleClick = () => {
    console.log("Download triggered for:", data?.version);
  };

  if (isLoading) {
    return (
      <div className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-zinc-900 border border-zinc-800 px-8 text-base font-bold text-zinc-500 shadow-sm animate-pulse w-[250px]">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span>جاري التجهيز...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <a
        href={data?.downloadUrl || "#"}
        onClick={handleClick}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-white px-8 text-base font-bold text-black transition-all hover:bg-zinc-200 active:scale-95 focus:ring-4 focus:ring-white/20 outline-none"
      >
        <Download className="h-5 w-5" />
        <span>تنزيل للويندوز</span>
      </a>
      {data?.version && (
        <span className="text-sm font-medium text-zinc-600 font-mono tracking-wider" dir="ltr">
          {data.version}
        </span>
      )}
    </div>
  );
}





