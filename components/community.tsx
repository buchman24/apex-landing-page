import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Linkedin } from "lucide-react"
import { advisoryBoardMembers, foundingTeamMembers, communityMembers, Member } from "@/data/members"

function MemberCard({ member }: { member: Member }) {
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="aspect-square relative">
        <Image
          src={member.imageSrc}
          alt={member.name}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-lg">{member.name}</CardTitle>
        {member.description && (
          <CardDescription>{member.description}</CardDescription>
        )}
      </CardHeader>
      <CardFooter className="p-4 flex justify-start gap-3 pt-0 mt-auto">
        <Link href={member.linkedinUrl} target="_blank" rel="noopener noreferrer">
          <Button variant="ghost" size="icon" aria-label="LinkedIn">
            <Linkedin className="h-5 w-5" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export function Community() {
  return (
    <section className="w-full py-12 md:py-24 bg-background">
      <div className="container px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Team</h2>
          <p className="text-muted-foreground md:text-xl mt-2">
            The core team leading APEX.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-2 lg:grid-cols-6 mb-16">
          {foundingTeamMembers.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>

        {/* <div className="flex flex-col items-center justify-center mt-12 mb-20 text-center">
          <p className="mb-4 text-lg text-muted-foreground">
            Want to see who came through APEX?
          </p>
          <Link
            href="/community/alumni"
            className="inline-flex items-center justify-center rounded-2xl bg-blue-500 px-10 py-5 text-lg font-semibold text-white shadow-lg transition hover:bg-blue-600"
          >
            Meet the Apex Alumni
          </Link>
        </div> */}

        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Advisory Board</h2>
          <p className="text-muted-foreground md:text-xl mt-2">
            Industry leaders supporting and advising APEX.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-2 lg:grid-cols-6 mb-16">
          {advisoryBoardMembers.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>

        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Community</h2>
          <p className="text-muted-foreground md:text-xl mt-2">
            Our valued community members contributing to APEX&apos;s mission.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {communityMembers.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  )
}
