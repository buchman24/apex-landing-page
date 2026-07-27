"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ApplyForm, Track } from "@/components/apply-form";

export function ApplyDialog({
  defaultTrack = "Architects",
  children,
}: {
  defaultTrack?: Track;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[520px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Apply to APEX</DialogTitle>
          <DialogDescription>
            Tell us a bit about yourself and we&apos;ll get back to you.
          </DialogDescription>
        </DialogHeader>
        {/* Remounting on open resets the fields and re-applies the clicked track. */}
        <ApplyForm
          key={open ? "open" : "closed"}
          defaultTrack={defaultTrack}
          onClose={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
