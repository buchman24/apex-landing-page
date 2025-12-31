import Image from "next/image"

export function PartnersSection() {
  return (
    <section className="w-full py-12 md:py-16 bg-background scroll-mt-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Our Mentors & Lecturers</h2>
            <p className="max-w-[700px] text-muted-foreground">
              Learn from industry leaders at the forefront of AI innovation.
            </p>
          </div>
        </div>
        {/*  Columbia, Harvard, MIT, Stanford,  Technion, Berkely, Princton ,Cornell 
 Pinecone, Nvidia, Ai21, Antropic , Snowflake, Aiwork, Bria, Bright data, Vast data, Aidoc, Anecdotes ai, d-ID, Run.ai, Deci ai,  L-Sport, Silverfort, Coralogix Redhat,  Monday, Zendesk,  Meckinzey, Jp Morgan, Blackrock, BCG,   Dream Security, Wiz, Eon.io, Google, Microsoft, IBM, Meta, Microsoft, */}
        <div className="mx-auto grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 items-center gap-8 py-8">
          {/* Universities */}
          <Image
            src="https://cdn.brandfetch.io/columbia.edu/w/400/h/400"
            alt="Columbia"
            width={120}
            height={60}
            className="object-contain h-12 w-auto mx-auto"
          />
          <Image
            src="https://cdn.brandfetch.io/harvard.edu/w/400/h/400"
            alt="Harvard"
            width={120}
            height={60}
            className="object-contain h-12 w-auto mx-auto"
          />
          <Image
            src="https://cdn.brandfetch.io/mit.edu/w/400/h/400"
            alt="MIT"
            width={120}
            height={60}
            className="object-contain h-12 w-auto mx-auto"
          />
          <Image
            src="https://cdn.brandfetch.io/stanford.edu/w/400/h/400"
            alt="Stanford"
            width={120}
            height={60}
            className="object-contain h-12 w-auto mx-auto"
          />
          <Image
            src="https://cdn.brandfetch.io/ats.org/w/400/h/400"
            alt="Technion"
            width={120}
            height={60}
            className="object-contain h-12 w-auto mx-auto"
          />
          <Image
            src="https://cdn.brandfetch.io/berkeley.edu/w/400/h/400"
            alt="Berkeley"
            width={120}
            height={60}
            className="object-contain h-12 w-auto mx-auto"
          />
          {/* <Image
            src="https://cdn.brandfetch.io/princeton.edu/w/400/h/400?c=1idjQoo38323pC02ZXr"
            alt="Princeton"
            width={120}
            height={60}
            className="object-contain h-12 w-auto mx-auto"
          /> */}
          <Image
            src="https://cdn.brandfetch.io/cornell.edu/w/400/h/400"
            alt="Cornell"
            width={120}
            height={60}
            className="object-contain h-12 w-auto mx-auto"
          />
          
          {/* Companies */}
          <Image
            src="https://cdn.brandfetch.io/pinecone.io/w/400/h/400"
            alt="Pinecone"
            width={120}
            height={60}
            className="object-contain h-12 w-auto mx-auto"
          />
          <Image
            src="https://cdn.brandfetch.io/nvidia.com/w/400/h/400"
            alt="Nvidia"
            width={120}
            height={60}
            className="object-contain h-12 w-auto mx-auto"
          />
          <Image
            src="https://cdn.brandfetch.io/ai21.com/w/400/h/400"
            alt="AI21"
            width={120}
            height={60}
            className="object-contain h-12 w-auto mx-auto"
          />
          <Image
            src="https://cdn.brandfetch.io/anthropic.com/w/400/h/400"
            alt="Anthropic"
            width={120}
            height={60}
            className="object-contain h-12 w-auto mx-auto"
          />
          <Image
            src="https://cdn.brandfetch.io/ai.work//w/400/h/400"
            alt="Aiwork"
            width={120}
            height={60}
            className="object-contain h-12 w-auto mx-auto"
          />
          <Image
            src="https://cdn.brandfetch.io/bria.ai/w/400/h/400"
            alt="Bria"
            width={120}
            height={60}
            className="object-contain h-12 w-auto mx-auto"
          />
          <Image
            src="https://cdn.brandfetch.io/brightdata.com/w/400/h/400"
            alt="Bright Data"
            width={120}
            height={60}
            className="object-contain h-12 w-auto mx-auto"
          />
          <Image
            src="https://cdn.brandfetch.io/vastdata.com/w/400/h/400"
            alt="Vast Data"
            width={120}
            height={60}
            className="object-contain h-12 w-auto mx-auto"
          />
          <Image
            src="https://cdn.brandfetch.io/aidoc.com/w/400/h/400"
            alt="Aidoc"
            width={120}
            height={60}
            className="object-contain h-12 w-auto mx-auto"
          />
          <Image
            src="https://cdn.brandfetch.io/anecdotes.ai/w/400/h/400"
            alt="Anecdotes AI"
            width={120}
            height={60}
            className="object-contain h-12 w-auto mx-auto"
          />
          <Image
            src="https://cdn.brandfetch.io/run.ai/w/400/h/400"
            alt="Run.ai"
            width={120}
            height={60}
            className="object-contain h-12 w-auto mx-auto"
          />
          {/* <Image
            src="https://cdn.brandfetch.io/deci.ai/w/400/h/400"
            alt="Deci AI"
            width={120}
            height={60}
            className="object-contain h-12 w-auto mx-auto"
          /> */}
          {/* <Image
            src="https://cdn.brandfetch.io/l-sport.com/w/400/h/400"
            alt="L-Sport"
            width={120}
            height={60}
            className="object-contain h-12 w-auto mx-auto"
          /> */}
          <Image
            src="https://cdn.brandfetch.io/silverfort.com/w/400/h/400"
            alt="Silverfort"
            width={120}
            height={60}
            className="object-contain h-12 w-auto mx-auto"
          />
          <Image
            src="https://cdn.brandfetch.io/coralogix.com/w/400/h/400"
            alt="Coralogix"
            width={120}
            height={60}
            className="object-contain h-12 w-auto mx-auto"
          />
          <Image
            src="https://cdn.brandfetch.io/redhat.com/w/400/h/400"
            alt="RedHat"
            width={120}
            height={60}
            className="object-contain h-12 w-auto mx-auto"
          />
          <Image
            src="https://cdn.brandfetch.io/monday.com/w/400/h/400"
            alt="Monday"
            width={120}
            height={60}
            className="object-contain h-12 w-auto mx-auto"
          />
          <Image
            src="https://cdn.brandfetch.io/zendesk.com/w/400/h/400"
            alt="Zendesk"
            width={120}
            height={60}
            className="object-contain h-12 w-auto mx-auto"
          />
          <Image
            src="https://cdn.brandfetch.io/mckinsey.com/w/400/h/400"
            alt="McKinsey"
            width={120}
            height={60}
            className="object-contain h-12 w-auto mx-auto"
          />
          {/* <Image
            src="https://cdn.brandfetch.io/jpmorgan.com/w/400/h/400"
            alt="JP Morgan"
            width={120}
            height={60}
            className="object-contain h-12 w-auto mx-auto"
          />
          <Image
            src="https://cdn.brandfetch.io/blackrock.com/w/400/h/400"
            alt="BlackRock"
            width={120}
            height={60}
            className="object-contain h-12 w-auto mx-auto"
          /> */}
          <Image
            src="https://cdn.brandfetch.io/lsports.eu/w/400/h/400"
            alt="Cyber.ai"
            width={120}
            height={60}
            className="object-contain h-12 w-auto mx-auto"
          />
          <Image
            src="https://cdn.brandfetch.io/bcg.com/w/400/h/400"
            alt="BCG"
            width={120}
            height={60}
            className="object-contain h-12 w-auto mx-auto"
          />
          {/* <Image
            src="https://cdn.brandfetch.io/dreamgroup.com//w/400/h/400"
            alt="Dream Security"
            width={120}
            height={60}
            className="object-contain h-12 w-auto mx-auto"
          /> */}
          <Image
            src="https://cdn.brandfetch.io/wiz.io/w/400/h/400"
            alt="Wiz"
            width={120}
            height={60}
            className="object-contain h-12 w-auto mx-auto"
          />
          <Image
            src="https://cdn.brandfetch.io/google.com/w/400/h/400"
            alt="Google"
            width={120}
            height={60}
            className="object-contain h-12 w-auto mx-auto"
          />
          <Image
            src="https://cdn.brandfetch.io/microsoft.com/w/400/h/400"
            alt="Microsoft"
            width={120}
            height={60}
            className="object-contain h-12 w-auto mx-auto"
          />
          <Image
            src="https://cdn.brandfetch.io/ibm.com/w/400/h/400"
            alt="IBM"
            width={120}
            height={60}
            className="object-contain h-12 w-auto mx-auto"
          />
          <Image
            src="https://cdn.brandfetch.io/meta.com/w/400/h/400"
            alt="Meta"
            width={120}
            height={60}
            className="object-contain h-12 w-auto mx-auto"
          />

        </div>
      </div>
    </section>
  )
} 
