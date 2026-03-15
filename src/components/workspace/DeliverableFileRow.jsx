import React from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Play, Loader2 } from "lucide-react";
import { useSignedUrl, downloadFile } from "@/components/utils/useSignedUrl";
import ShareLinkPopover from "@/components/workspace/ShareLinkPopover";

export default function DeliverableFileRow({ file, isVideo, FileIcon, shareUrl, onGenerate, onDisable, onReview, compact = false }) {
  const mediaUrl = useSignedUrl(file);

  return (
    <>
      {isVideo && (
        <Button
          variant="outline"
          size={compact ? "sm" : "sm"}
          onClick={() => mediaUrl && onReview(file, mediaUrl)}
          disabled={!mediaUrl}
          className={`rounded-lg text-sky-600 border-sky-200 hover:bg-sky-50 text-xs gap-1.5 ${compact ? "h-7" : ""}`}
        >
          {!mediaUrl
            ? <Loader2 className={`${compact ? "w-3 h-3" : "w-3.5 h-3.5"} animate-spin`} />
            : <Play className={compact ? "w-3 h-3" : "w-3.5 h-3.5"} />
          }
          Review
        </Button>
      )}
      <ShareLinkPopover
        file={file}
        shareUrl={shareUrl}
        onGenerate={onGenerate}
        onDisable={onDisable}
        compact={compact}
      />
      <button
        onClick={() => downloadFile(file)}
        className={`${compact ? "p-1.5" : "p-2"} rounded-lg hover:bg-zinc-100 transition-colors text-zinc-400 hover:text-zinc-700`}
      >
        <Download className={compact ? "w-3.5 h-3.5" : "w-4 h-4"} />
      </button>
    </>
  );
}