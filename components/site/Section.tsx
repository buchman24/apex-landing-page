import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/**
 * A page section. `scene` tells the 3D background where the camera should be
 * while this section is in view (see lib/scene/keyframes.ts).
 */
export function Section({
  id,
  scene,
  label,
  labelAsHeading,
  labelledBy,
  className,
  wide,
  children,
}: {
  id?: string
  scene?: string
  /** Small mono label on the hairline above the section. */
  label?: ReactNode
  /** The label is the section's heading (an h2 with id = labelledBy), for sections whose content has no heading of its own. */
  labelAsHeading?: boolean
  labelledBy?: string
  className?: string
  /** Use the full width. By default content keeps to a left column so the 3D scene owns the right side. */
  wide?: boolean
  children: ReactNode
}) {
  return (
    <section id={id} data-scene={scene} aria-labelledby={labelledBy} className={cn("section", className)}>
      <div className="wrap">
        <div className={wide ? "" : "col"}>
          {label ? (
            <div className="section-head mb-10 md:mb-14">
              {labelAsHeading ? (
                <h2 id={labelledBy} className="label">
                  {label}
                </h2>
              ) : (
                <p className="label">{label}</p>
              )}
            </div>
          ) : null}
          {children}
        </div>
      </div>
    </section>
  )
}

/** A full-screen pause in the page where the mountain holds the screen. Names the labels it shows. */
export function SceneBreak({ scene, labels }: { scene: string; labels?: string }) {
  return <div aria-hidden="true" data-scene={scene} data-scene-break={labels ?? ""} className="scene-break" />
}

/** Opening block for inner pages. */
export function PageIntro({
  scene,
  label,
  titleId,
  title,
  children,
}: {
  scene: string
  label: ReactNode
  titleId: string
  title: ReactNode
  children?: ReactNode
}) {
  return (
    <section data-scene={scene} aria-labelledby={titleId} className="relative">
      <div className="wrap pb-10 pt-[calc(var(--header-h)+4.5rem)] md:pb-16 md:pt-[calc(var(--header-h)+8rem)]">
        <div className="col">
          <p className="label">{label}</p>
          <h1 id={titleId} className="h-display mt-6 max-w-[16ch]">
            {title}
          </h1>
          {children}
        </div>
      </div>
    </section>
  )
}
