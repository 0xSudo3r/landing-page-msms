"use client";

import { useEffect, useState } from "react";
import { Download, Loader2, AlertCircle } from "lucide-react";
import type { ReleaseInfo } from "@/lib/github-release";

type FetchState =
  | { status: "loading" }
  | { status: "loaded"; data: ReleaseInfo }
  | { status: "error"; fallbackUrl: string };

const FALLBACK_URL =
  "https://github.com/0xSudo3r/mobile-shop-manager-arabic/releases/latest";

function formatFileSize(bytes: number | null): string | null {
  if (bytes === null) return null;
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
}

export function DownloadButton() {
  const [state, setState] = useState<FetchState>({ status: "loading" });

  useEffect(() => {
    async function fetchRelease() {
      try {
        const res = await fetch("/api/release");
        if (!res.ok) throw new Error("API error");
        const data: ReleaseInfo = await res.json();
        setState({ status: "loaded", data });
      } catch {
        setState({ status: "error", fallbackUrl: FALLBACK_URL });
      }
    }

    fetchRelease();
  }, []);

  const handleDownload = () => {
    if (state.status === "loaded") {
      window.location.href = `/api/download?url=${encodeURIComponent(state.data.downloadUrl)}`;
    }
  };

  if (state.status === "loading") {
    return (
      <div className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-zinc-900 border border-zinc-800 px-8 text-base font-bold text-zinc-500 shadow-sm animate-pulse w-[250px]">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span>جاري التجهيز...</span>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="flex flex-col items-center gap-4">
        <a
          href={state.fallbackUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-white px-8 text-base font-bold text-black transition-all hover:bg-zinc-200 active:scale-95 focus:ring-4 focus:ring-white/20 outline-none"
        >
          <AlertCircle className="h-5 w-5" />
          <span>تنزيل من GitHub</span>
        </a>
      </div>
    );
  }

  const { data } = state;
  const fileSize = formatFileSize(data.fileSize);

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={handleDownload}
        className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-white px-8 text-base font-bold text-black transition-all hover:bg-zinc-200 active:scale-95 focus:ring-4 focus:ring-white/20 outline-none"
      >
        <Download className="h-5 w-5" />
        <span>تنزيل للويندوز</span>
      </button>
      <div className="flex items-center gap-3 text-sm font-medium text-zinc-600 font-mono tracking-wider" dir="ltr">
        <span>{data.version}</span>
        {fileSize && (
          <>
            <span className="text-zinc-700">&middot;</span>
            <span>{fileSize}</span>
          </>
        )}
      </div>
    </div>
  );
}