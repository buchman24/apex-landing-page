import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import { ApplyForm } from "@/components/apply-form";

export const metadata: Metadata = {
  title: "Apply to APEX",
  description:
    "Apply to the APEX Architect or Founder track. Tell us about yourself and the APEX team will be in touch.",
};

export default function ApplyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar activePage="tracks" />

      <main className="flex-1 w-full py-12 md:py-20">
        <div className="container px-4 md:px-6 mx-auto max-w-2xl">
          <div className="text-center space-y-3 mb-8">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Apply to APEX</h1>
            <p className="text-muted-foreground md:text-lg">
              Tell us a bit about yourself and we&apos;ll get back to you.
            </p>
          </div>

          <div className="rounded-2xl border bg-card p-6 md:p-8 shadow-sm">
            <ApplyForm defaultTrack="Architects" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
