'use client';

import Image from "next/image"

export function HumanInfrastructureSection() {
  return (
    <section
      id="human-infrastructure"
      className="w-full py-16 md:py-24 lg:py-32 bg-background scroll-mt-16 overflow-hidden"
    >
      <div className="container px-4 md:px-6">
        {/* Headline block */}
        <div className="flex flex-col items-center justify-center space-y-6 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-foreground uppercase leading-tight">
            Building the Human Infrastructure Behind Israel&apos;s AI Future
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
            In a time of war and an accelerating AI race, Israel cannot afford to fall behind.
            APEX is the external rails for the builders, researchers, and architects who are
            doubling down on AI - ensuring that Israel&apos;s most exceptional talent
            doesn&apos;t just keep up, but leads.
          </p>
        </div>

        {/* Real cohort photo — the human infrastructure, in the flesh */}
        <div className="mt-12 md:mt-16 max-w-5xl mx-auto">
          <Image
            src="/apex_groupphoto.jpg"
            width={1600}
            height={900}
            alt="The APEX cohort — Israel's elite AI builders and founders"
            className="rounded-xl object-cover w-full max-h-[460px] shadow-sm"
          />
        </div>

        {/* The Model */}
        <div className="mt-16 md:mt-24 grid gap-10 lg:grid-cols-2 lg:gap-16 items-center max-w-6xl mx-auto">
          <div className="space-y-5">
            <div className="inline-flex flex-col">
              <span className="text-sm font-semibold tracking-[0.25em] text-muted-foreground uppercase">
                The Model
              </span>
              <span className="mt-1 h-px w-16 bg-primary/40" />
            </div>
            <h3 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
              The Human AI Stack
            </h3>
            <p className="text-lg md:text-xl text-foreground/80">
              We must dominate the Human Application Layer.
            </p>
            <p className="text-base md:text-lg font-medium text-foreground leading-relaxed">
              APEX brings exceptional talent together with the country&apos;s best builders and
              researchers - ensuring Israel maintains its technological edge.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-[520px] rounded-2xl bg-white p-4 sm:p-6 shadow-sm">
              <HumanAIStackDiagram />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HumanAIStackDiagram() {
  // Three overlapping circles in a classic 3-set Venn, converging on the APEX core.
  const r = 180;
  const tech = { cx: 450, cy: 290 };      // top
  const army = { cx: 360, cy: 455 };      // bottom-left
  const academia = { cx: 540, cy: 455 };  // bottom-right

  const circleFill = '#e9f1fc';
  const circleStroke = '#1f2a44';
  const titleBlue = '#2e8bf5';
  const navy = '#0f1e3d';
  const coreBlue = '#1f7ae0';

  return (
    <svg
      viewBox="-20 10 940 650"
      className="w-full h-auto"
      role="img"
      aria-label="The Human AI Stack: Army, Tech Ventures, and Academia converging on APEX"
    >
      {/* Circles */}
      <g fill={circleFill} fillOpacity={0.75} stroke={circleStroke} strokeWidth={1.5}>
        <circle cx={tech.cx} cy={tech.cy} r={r} />
        <circle cx={army.cx} cy={army.cy} r={r} />
        <circle cx={academia.cx} cy={academia.cy} r={r} />
      </g>

      {/* APEX core — rounded downward triangle (Reuleaux) over the central intersection */}
      <path
        d="M388,372 A123 123 0 0 1 512,372 A123 123 0 0 1 450,478 A123 123 0 0 1 388,372 Z"
        fill={coreBlue}
      />
      {/* Mountain emblem */}
      <path
        d="M412,408 L450,360 L488,408 L470,408 L450,382 L430,408 Z"
        fill="#ffffff"
      />
      <rect x={406} y={414} width={88} height={2.5} fill="#ffffff" opacity={0.9} />
      <text
        x={450}
        y={452}
        textAnchor="middle"
        fill="#ffffff"
        style={{ fontSize: 30, fontWeight: 800, letterSpacing: '0.06em' }}
      >
        APEX
      </text>

      {/* Labels */}
      <g textAnchor="middle">
        <text x={450} y={52} fill={titleBlue} style={{ fontSize: 30, fontWeight: 800 }}>
          TECH VENTURES
        </text>
        <text x={450} y={84} fill={navy} style={{ fontSize: 22, fontWeight: 700 }}>
          Rapid scaling &amp;
        </text>
        <text x={450} y={110} fill={navy} style={{ fontSize: 22, fontWeight: 700 }}>
          deployment
        </text>
      </g>

      <g textAnchor="middle">
        <text x={95} y={470} fill={titleBlue} style={{ fontSize: 30, fontWeight: 800 }}>
          ARMY
        </text>
        <text x={95} y={502} fill={navy} style={{ fontSize: 22, fontWeight: 700 }}>
          Top 0.1%
        </text>
        <text x={95} y={528} fill={navy} style={{ fontSize: 22, fontWeight: 700 }}>
          Technical Genius
        </text>
      </g>

      <g textAnchor="middle">
        <text x={805} y={478} fill={titleBlue} style={{ fontSize: 30, fontWeight: 800 }}>
          ACADEMIA
        </text>
        <text x={805} y={510} fill={navy} style={{ fontSize: 22, fontWeight: 700 }}>
          Foundational
        </text>
        <text x={805} y={536} fill={navy} style={{ fontSize: 22, fontWeight: 700 }}>
          AI Research
        </text>
      </g>
    </svg>
  );
}
