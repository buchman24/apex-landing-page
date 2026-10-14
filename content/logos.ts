/*
  Company logo permissions.

  Logos are TEXT ONLY on the site until a company gives written permission.
  Note: a website logo is listed as a paid benefit in the APEX Sponsor Package.

  When a company approves, add it here with the image path under public/logos/, e.g.:
    { company: "NVIDIA", src: "/logos/nvidia.svg", permission: "Email from <name>, <date>" },
  The logo row will then show the image for that company and text for the rest.
*/

export type LogoPermission = { company: string; src: string; permission: string }

export const permittedLogos: LogoPermission[] = []
