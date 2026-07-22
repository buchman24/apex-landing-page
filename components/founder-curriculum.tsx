import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface CurriculumModule {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  featured: string[];
}

// APEX Founders Sprint — 8-Week Curriculum
const founderModules: CurriculumModule[] = [
  {
    id: "item-1",
    title: "Module 1 — Finding the Definitive Problem",
    subtitle: "How to identify a problem worth solving in the AI era",
    content:
      "Most founders spend 6–12 months in trial and error before finding the right problem. We collapse that timeline. Using proven ideation methodology and hands-on interview frameworks, founders learn to pressure-test a thesis until it's ironclad — and distinguish between the user who feels the pain and the economic buyer who signs the check.",
    featured: [
      "Ideation Playbook",
      "The Mom Test",
      "Fireside with founders who have the scars",
      "Design Partner Sessions",
      "Office Hours",
    ],
  },
  {
    id: "item-2",
    title: "Module 2 — Mapping the Friction: Cyber",
    subtitle: "Where is AI security heading — and what hasn't been built yet?",
    content:
      "Israel's cyber edge is real. But the AI security landscape is shifting faster than most founders realize. This module maps the friction in AI-native cyber — from national-scale defense systems to enterprise security — and surfaces the white-space problems worth building on.",
    featured: [
      "State of AI in Cyber",
      "Open Technical Challenges",
      "White-Space Opportunities",
      "Design Partner Sessions",
      "Office Hours",
    ],
  },
  {
    id: "item-3",
    title: "Module 3 — Mapping the Friction: Agents",
    subtitle: "The agentic era is here. What does that mean for what you're building?",
    content:
      "From single model calls to multi-agent systems — the infrastructure of AI is changing and so are the problems worth solving. This module maps the friction in the agents space and helps founders find their wedge before the market does.",
    featured: [
      "Agents & Beyond",
      "Unsolved Bottlenecks",
      "Founder Blockers",
      "Design Partner Sessions",
      "Office Hours",
    ],
  },
  {
    id: "item-4",
    title: "Module 4 — Mapping the Friction: Infrastructure",
    subtitle: "You can't build on sand. Understand the stack before you pick your layer.",
    content:
      "Power, memory, data centers — the infrastructure layer is being reinvented. This module gives founders a first-principles understanding of AI infrastructure economics and where the real opportunities sit before the window closes.",
    featured: [
      "Infrastructure & Power",
      "The AI Memory Wall",
      "Market Outlook",
      "Design Partner Sessions",
      "Office Hours",
    ],
  },
  {
    id: "item-5",
    title: "Module 5 — GPU Economics: Building Lean in a High-Compute World",
    subtitle: "How do you build a high-compute startup without a high-compute budget?",
    content:
      "In an era where GPU richness defines the leaderboard, early founders must master the art of building within constraints. This is not theoretical cloud talk — it is the hard math of tokens, infra, and execution. Founders leave with a real tech budget and a defensible infra thesis.",
    featured: [
      "GPU 101",
      "Neocloud Edge",
      "Hardware Survival Tactics",
      "Architectural Stress Test Workshop",
      "Office Hours",
    ],
  },
  {
    id: "item-6",
    title: "Module 6 — Go-To-Market: Stop Selling Your Product",
    subtitle: "The best founders don't pitch. They discover.",
    content:
      "Most founders think they need to learn how to sell. They don't. They need to understand what their customer is actually buying. This module reframes GTM as a discovery discipline — and gives founders the framework to find PMF through every sales conversation, not after it.",
    featured: [
      "Value Selling & PMF",
      "SPICED Framework",
      "The Five Levels of Value",
      "Design Partner Sessions",
      "Office Hours",
    ],
  },
  {
    id: "item-7",
    title: "Module 7 — The Network Effect: Validation at Scale",
    subtitle: "Your network is your next round and the time you save.",
    content:
      "Access is the shortcut. This module gives founders direct 1:1 time with CTOs, VPs of R&D, and Heads of AI from Israel's leading companies. No panels. No theater. Just honest feedback from operators who want Israel to win — and structured sessions designed to surface the signals that matter.",
    featured: [
      "Operator Validation Sessions",
      "Industry 1:1s",
      "Design Partner Pairings",
      "Office Hours",
    ],
  },
  {
    id: "item-8",
    title: "Module 8 — Demo Day & The Path Forward",
    subtitle: "The start line, not the finish line.",
    content:
      "This is not a graduation. It is a launchpad. Founders present their validated problem, customer thesis, GTM motion, and infra strategy to a room of investors and operators. The goal is not a perfect pitch — it is a clear, honest account of what you know, what you validated, and what you are going to do next.",
    featured: [
      "Founder Presentations",
      "Investor Feedback Sessions",
      "Alumni Community Launch",
      "Office Hours — Open Forever",
    ],
  },
]

export function FounderCurriculum() {
  return (
    <div className="space-y-6">
      <Accordion type="single" collapsible className="w-full">
        {founderModules.map((module) => (
          <AccordionItem key={module.id} value={module.id}>
            <AccordionTrigger className="text-left">
              <span className="flex flex-col items-start gap-1">
                <span className="font-semibold">{module.title}</span>
                <span className="text-sm font-normal italic text-muted-foreground">
                  {module.subtitle}
                </span>
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <p className="mb-4">{module.content}</p>
              <p className="text-sm">
                <span className="font-semibold">Featured: </span>
                {module.featured.join(" · ")}
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="border-t pt-6 text-muted-foreground">
        <p>
          No panels. No networking theater. Just high-signal work with people who are building
          Israel&apos;s AI future.
        </p>
        <p className="mt-2 font-medium text-foreground">Let&apos;s build. Israel. AI. 🗻</p>
      </div>
    </div>
  )
}
