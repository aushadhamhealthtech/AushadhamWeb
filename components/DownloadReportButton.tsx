"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Download, FileText } from "lucide-react";

export default function DownloadReportButton({
  filename,
  sizeLabel,
}: {
  filename: string;
  sizeLabel: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        size="icon"
        aria-label="Download report"
        className="h-9 w-9 rounded-full bg-[#228573]"
        onClick={() => setOpen(true)}
      >
        <Download className="h-4 w-4" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm rounded-3xl border-0 p-0">
          <DialogTitle className="sr-only">Download successful</DialogTitle>
          <DialogDescription className="sr-only">
            Report download completed successfully.
          </DialogDescription>
          <div className="rounded-3xl bg-white px-6 pb-6 pt-5">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f1f5f4] text-[#1f2a27]">
                <FileText className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-base font-semibold text-[#1f2a27]">{filename}</p>
                <p className="text-sm text-gray-500">{sizeLabel}</p>
              </div>
              <span className="text-sm font-semibold text-[#1a8f7a]">Download successful</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
