'use client';

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
            doubling down on AI &mdash; ensuring that Israel&apos;s most exceptional talent
            doesn&apos;t just keep up, but leads.
          </p>
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
              researchers &mdash; ensuring Israel maintains its technological edge.
            </p>
          </div>

          <div className="flex justify-center">
            <HumanAIStackDiagram />
          </div>
        </div>
      </div>
    </section>
  );
}

function HumanAIStackDiagram() {
  // Three overlapping circles (r = 150) converging on APEX at the centroid.
  const r = 150;
  const tech = { cx: 280, cy: 200 };   // top
  const army = { cx: 205, cy: 320 };   // bottom-left
  const academia = { cx: 355, cy: 320 }; // bottom-right
  const center = { cx: 280, cy: 280 };

  return (
    <svg
      viewBox="0 0 560 540"
      className="w-full max-w-[480px] h-auto"
      role="img"
      aria-label="The Human AI Stack: Army, Tech Ventures, and Academia converging on APEX"
    >
      {/* Circles */}
      <g className="fill-primary/10 stroke-primary/40" strokeWidth={1.5}>
        <circle cx={tech.cx} cy={tech.cy} r={r} />
        <circle cx={army.cx} cy={army.cy} r={r} />
        <circle cx={academia.cx} cy={academia.cy} r={r} />
      </g>

      {/* APEX core */}
      <circle cx={center.cx} cy={center.cy} r={58} className="fill-primary" />
      {/* Simple mountain emblem */}
      <path
        d="M280 250 L300 285 L292 285 L280 268 L268 285 L260 285 Z"
        className="fill-primary-foreground"
      />
      <text
        x={center.cx}
        y={center.cy + 26}
        textAnchor="middle"
        className="fill-primary-foreground"
        style={{ fontSize: 22, fontWeight: 700, letterSpacing: '0.05em' }}
      >
        APEX
      </text>

      {/* Labels */}
      <g textAnchor="middle">
        <text x={tech.cx} y={70} className="fill-primary" style={{ fontSize: 20, fontWeight: 700 }}>
          TECH VENTURES
        </text>
        <text x={tech.cx} y={92} className="fill-foreground" style={{ fontSize: 14, fontWeight: 600 }}>
          Rapid scaling &amp; deployment
        </text>
      </g>

      <g textAnchor="middle">
        <text x={95} y={460} className="fill-primary" style={{ fontSize: 20, fontWeight: 700 }}>
          ARMY
        </text>
        <text x={95} y={482} className="fill-foreground" style={{ fontSize: 14, fontWeight: 600 }}>
          Top 0.1%
        </text>
        <text x={95} y={500} className="fill-foreground" style={{ fontSize: 14, fontWeight: 600 }}>
          Technical Genius
        </text>
      </g>

      <g textAnchor="middle">
        <text x={465} y={460} className="fill-primary" style={{ fontSize: 20, fontWeight: 700 }}>
          ACADEMIA
        </text>
        <text x={465} y={482} className="fill-foreground" style={{ fontSize: 14, fontWeight: 600 }}>
          Foundational
        </text>
        <text x={465} y={500} className="fill-foreground" style={{ fontSize: 14, fontWeight: 600 }}>
          AI Research
        </text>
      </g>
    </svg>
  );
}
