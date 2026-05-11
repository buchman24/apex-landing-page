export interface Mentor {
  id: string;
  name: string;
  description: string;
  imageSrc: string;
  linkedinUrl: string;
  specializations: string[];
  calendlyUrl: string;
}

export const mentors: Mentor[] = [
  {
    id: "mentor_1",
    name: "Jane Doe",
    description: "CEO at Example Corp",
    imageSrc: "/team/placeholder.png",
    linkedinUrl: "https://www.linkedin.com/",
    specializations: ["Fundraising", "GTM"],
    calendlyUrl: "https://calendly.com/placeholder",
  },
  {
    id: "mentor_2",
    name: "John Smith",
    description: "CTO at Example Corp",
    imageSrc: "/team/placeholder.png",
    linkedinUrl: "https://www.linkedin.com/",
    specializations: ["ML Infrastructure", "Team Building"],
    calendlyUrl: "https://calendly.com/placeholder",
  },
  {
    id: "mentor_3",
    name: "Sara Cohen",
    description: "Partner at Example VC",
    imageSrc: "/team/placeholder.png",
    linkedinUrl: "https://www.linkedin.com/",
    specializations: ["Venture Capital", "Product Strategy"],
    calendlyUrl: "https://calendly.com/placeholder",
  },
];
