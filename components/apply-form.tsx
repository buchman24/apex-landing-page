"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, Loader2 } from "lucide-react";

export type Track = "Architects" | "Founders";

export function ApplyForm({
  defaultTrack = "Architects",
  onClose,
}: {
  defaultTrack?: Track;
  // When rendered in a modal, pass a handler so the success screen can offer a
  // Close button. On the standalone /apply page this is omitted.
  onClose?: () => void;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [militaryTrack, setMilitaryTrack] = useState("");
  const [track, setTrack] = useState<Track>(defaultTrack);
  const [why, setWhy] = useState("");

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

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
        <CheckCircle2 className="h-12 w-12 text-primary" />
        <p className="text-2xl font-semibold">Application received</p>
        <p className="text-muted-foreground">
          Thanks for applying to the {track} track. The APEX team will be in touch.
        </p>
        {onClose && (
          <Button onClick={onClose} className="mt-2">
            Close
          </Button>
        )}
      </div>
    );
  }

  return (
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
        <Label htmlFor="apply-linkedin">LinkedIn profile *</Label>
        <Input
          id="apply-linkedin"
          type="url"
          placeholder="https://www.linkedin.com/in/…"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
          required
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
  );
}
