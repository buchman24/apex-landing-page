"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, Loader2 } from "lucide-react";

type Track = "Architects" | "Founders";

export function ApplyDialog({
  defaultTrack = "Architects",
  children,
}: {
  defaultTrack?: Track;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [militaryTrack, setMilitaryTrack] = useState("");
  const [track, setTrack] = useState<Track>(defaultTrack);
  const [why, setWhy] = useState("");

  function reset() {
    setName("");
    setEmail("");
    setLinkedin("");
    setMilitaryTrack("");
    setTrack(defaultTrack);
    setWhy("");
    setError(null);
    setDone(false);
    setSubmitting(false);
  }

  function onOpenChange(next: boolean) {
    setOpen(next);
    if (next) {
      // Fresh form each time it opens; preselect the track of the button clicked.
      reset();
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, linkedin, militaryTrack, track, why }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }
      setDone(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[520px] max-h-[90vh] overflow-y-auto">
        {done ? (
          <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
            <CheckCircle2 className="h-12 w-12 text-primary" />
            <DialogTitle className="text-2xl">Application received</DialogTitle>
            <DialogDescription className="text-base">
              Thanks for applying to the {track} track. The APEX team will be in touch.
            </DialogDescription>
            <Button onClick={() => setOpen(false)} className="mt-2">
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Apply to APEX</DialogTitle>
              <DialogDescription>
                Tell us a bit about yourself and we&apos;ll get back to you.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="apply-name">Name *</Label>
                <Input id="apply-name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="apply-email">Email address *</Label>
                <Input
                  id="apply-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="apply-linkedin">LinkedIn profile</Label>
                <Input
                  id="apply-linkedin"
                  type="url"
                  placeholder="https://www.linkedin.com/in/…"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="apply-military">Military track / unit</Label>
                <Input
                  id="apply-military"
                  placeholder="e.g. 8200, Talpiot, Mamram…"
                  value={militaryTrack}
                  onChange={(e) => setMilitaryTrack(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="apply-track">Which track are you interested in? *</Label>
                <Select value={track} onValueChange={(v) => setTrack(v as Track)}>
                  <SelectTrigger id="apply-track">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Architects">Architects</SelectItem>
                    <SelectItem value="Founders">Founders</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="apply-why">Why do you want to do this track?</Label>
                <Textarea
                  id="apply-why"
                  rows={4}
                  value={why}
                  onChange={(e) => setWhy(e.target.value)}
                />
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting…
                  </>
                ) : (
                  "Submit application"
                )}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
