export interface Member {
  id: string;
  name: string;
  description: string;
  imageSrc: string;
  linkedinUrl: string;
  isFounder?: boolean; // Optional: to distinguish if needed, though not used by showcase
}

export interface Alumni {
  id: string;
  name: string;
  description?: string;
  imageSrc: string;
  linkedinUrl: string;
  cohort?: string;
}

export const advisoryBoardMembers: Member[] = [
  { id: "adaf_f", name: "Adam Fisher", description: "Partner at Bessemer Venture Partners", imageSrc: "/team/adam_f.JPG", linkedinUrl: "https://www.linkedin.com/in/adamrfisher/" },
  { id: "omer_d", name: "Omer Dagan", description: "Entrepreneur, People-Centric CIO, Ex-Commander Lotem and Apex Advisory", imageSrc: "/team/omer_dagan.jpeg", linkedinUrl: "https://www.linkedin.com/in/omer-dagan-%F0%9F%8E%97%EF%B8%8F-957916149/" },
  { id: "danny_g", name: "Danny Grander", description: "Co-Founder at Snyk, Angel Investor", imageSrc: "/team/danny_grander.jpeg", linkedinUrl: "https://www.linkedin.com/in/grander/" },
  { id: "michael_c", name: "Michael Cohn", description: "Managing Partner at Overline", imageSrc: "/team/Michael Cohn.jpeg", linkedinUrl: "linkedin.com/in/michaelcohn" },
  { id: "elroei", name: "Elroei Buchman", description: "Venture Builder", imageSrc: "/team/elroei.png", linkedinUrl: "https://www.linkedin.com/in/elroei-buchman-9b59931/", isFounder: true },

];

export const foundingTeamMembers: Member[] = [
  { id: "avishag", name: "Avishag Bohbot", description: "Venture Builder VelocityX, Social Entrepreneur", imageSrc: "/team/avishag.jpeg", linkedinUrl: "https://www.linkedin.com/in/avishagbohbot/", isFounder: true },
  { id: "tal", name: "Tal Fialkow - AI Leader", description: "VP Cyber AI at Dream", imageSrc: "/team/tal.jpeg", linkedinUrl: "https://www.linkedin.com/in/tal-fialkow-486b8455/", isFounder: true },
  { id: "roy", name: "Roy Nissim - Champion Talpiot", description: "2x Founder | PhD", imageSrc: "/team/roy.jpeg", linkedinUrl: "https://www.linkedin.com/in/roy-nissim/", isFounder: true },
  { id: "shahar_l", name: "Shahar Lutati - Champion Psagot", description: "AI Architect, Hard problem solver, PhD", imageSrc: "/team/shahar_lutati.jpeg", linkedinUrl: "https://www.linkedin.com/in/shahar-lutati-4b4863118/" },
  { id: "ofek", name: "Ofek Censor - Champion Aram", description: "CEO at Rosewood Systems", imageSrc: "/team/ofek.jpeg", linkedinUrl: "https://www.linkedin.com/in/ofekc/", isFounder: true },
  { id: "amit", name: "Amit Buchman - COS", description: "Founder at LithiBlock", imageSrc: "/team/amit_buchman.JPG", linkedinUrl: "https://www.linkedin.com/in/amit-buchman-a7710b228/", isFounder: true },
  { id: "talya", name: "Talya Pines - Operations", description: "MBA at Chicago Booth", imageSrc: "/team/talya.jpeg", linkedinUrl: "https://www.linkedin.com/in/talya-pines/" },

];

export const communityMembers: Member[] = [
  // Apex Advisory - First Row
  // { id: "yaron_r", name: "Yaron Rosen", description: "Entrepreneur, a16z Scout, angel investor and Apex Advisory", imageSrc: "/team/yaron_rosen.jpg", linkedinUrl: "https://www.linkedin.com/in/yaron-rosen-3b46296/" },
  // { id: "david_m", name: "David Magerman", description: "Co-Founder @ Differential Ventures, Ex-renaissance fund and Apex Advisory", imageSrc: "/team/david_magerman.jpeg", linkedinUrl: "https://www.linkedin.com/in/david-magerman-954b25174/" },
  { id: "rotem_l", name: "Rotem Lapid", description: "Head of AI, ORT Israel", imageSrc: "/team/rotem_lapid.png", linkedinUrl: "https://www.linkedin.com/in/rotem-lapid-98b42370/" },
  { id: "ofer_s", name: "Ofer Shacham", description: "CEO at Majestic Labs AI", imageSrc: "/team/ofer_shacham.jpeg", linkedinUrl: "https://www.linkedin.com/in/ofershacham/" },
  { id: "gal_c", name: "Gal Chechik", description: "Sr. Director of AI Research at NVIDIA, Professor at BIU", imageSrc: "/team/gal_chechik.jpg", linkedinUrl: "https://www.linkedin.com/in/gal-chechik-00a6b44/" },

  // Additional Advisory Members
  // { id: "tom_h", name: "Tom Hoffen", description: "CTO and Co-Founder at Alta | AI Revenue Workforce", imageSrc: "/team/tom.png", linkedinUrl: "https://www.linkedin.com/in/tom-hoffen-8722b88a/" },
  { id: "seffi_c", name: "Seffi Cohen", description: "Postdoctoral Researcher at Harvard", imageSrc: "/team/seffi_cohen.jfif", linkedinUrl: "https://www.linkedin.com/in/seffi-cohen/" },
  { id: "ryan_g", name: "Ryan Gity", description: "CEO at G2 Systems and Technologies", imageSrc: "/team/ryan_gity.jpeg", linkedinUrl: "https://www.linkedin.com/in/ryan-gity/" }, 
  { id: "itay_p", name: "Itai Perez", description: "VP Robotics at Bluewhite", imageSrc: "/team/itay_perez.jpeg", linkedinUrl: "https://www.linkedin.com/in/taio/" },
  { id: "yehoshua_c", name: "Yehoshua (Shuki) Cohen", description: "VP Data at AI21 Labs", imageSrc: "/alumni/Yehoshua Cohen.jpg", linkedinUrl: "https://www.linkedin.com/in/shuki-cohen/?originalSubdomain=il"},
  {id: "amos_b", name: "Amos Bar Joseph", description: "CEO at getswan.com, Entrepreneur", imageSrc: "/team/amos.png", linkedinUrl: "https://www.linkedin.com/in/amos-bar-joseph/" },
  { id: "mark_m", name: "Mark Mendelman", description: "CTO at Highrise.ai", imageSrc: "/team/mark_m.jpeg", linkedinUrl: "https://www.linkedin.com/in/mark-mendelman-a845991b/" },
  { id: "idan_s", name: "Idan Schwartz", description: "Assistant Professor at BIU", imageSrc: "/team/idan_schwartz.png", linkedinUrl: "https://www.linkedin.com/in/idansc/" },
  { id: "ayal_b", name: "Ayal Baron", description: "CEO at TroupAI", imageSrc: "/team/ayal_baron.jpeg", linkedinUrl: "https://www.linkedin.com/in/ayalbaron/" },
  { id: "ofer_r", name: "Ofer Rozenberg", description: "Principal Engineer, AI Software Stack", imageSrc: "/team/ofer_rozenberg.jpeg", linkedinUrl: "https://www.linkedin.com/in/oferrosenberg/" },
  { id: "amos_y", name: "Amos Yoffe", description: "Director of Engineering at Cisco Foundation AI", imageSrc: "/team/amos_yoffe.jpeg", linkedinUrl: "https://www.linkedin.com/in/amosyoffe/" },
  { id: "ori_s", name: "Ori Striechman", description: "VP Research at Cyberillium | Investor", imageSrc: "/team/ori_striechman.jpeg", linkedinUrl: "https://www.linkedin.com/in/ori-striechman/" },
  { id: "philip_t", name: "Philip Tannor", description: "CEO at Deepchecks, Entrepreneur", imageSrc: "/team/phillip.png", linkedinUrl: "https://www.linkedin.com/in/philip-tannor-a6a910b7/" },
  // { id: "nir_y", name: "Nir Yaron", description: "Chief of Staff @ Ministry of Finance | Talpiot Alum | Ex. Cyber @ IDF", imageSrc: "/team/nir.png", linkedinUrl: "https://www.linkedin.com/in/nir-yaron-886051241/" },
  { id: "danny_h", name: "Danny Harnik", description: "Senior Technical Staff Member (STSM) at IBM Research", imageSrc: "/team/danny.png", linkedinUrl: "https://www.linkedin.com/in/danny-harnik-19a95436/" },
  // { id: "david_d", name: "Daniel Drizin", description: "VP R&D at Paragon", imageSrc: "/team/david_drizin.png", linkedinUrl: "https://www.linkedin.com/in/ddrizin/" },
  // { id: "adi_s", name: "Adi Sharabani", description: "Serial founder, Snyk", imageSrc: "/team/adi_sharabani.jfif", linkedinUrl: "https://www.linkedin.com/in/adisharabani/" },
  // { id: "shachar_c", name: "Shachar Cohen", description: "Software | Management | Talpiot", imageSrc: "/team/shachar.webp", linkedinUrl: "https://www.linkedin.com/in/shachar-cohen-480b86205/" },
  { id: "dan_p", name: "Dan Padnos", description: "Head of AI at Novee Security", imageSrc: "/team/dan_padnos.jpeg", linkedinUrl: "https://www.linkedin.com/in/dan-padnos/?originalSubdomain=il" },
  { id: "victor_s", name: "Victor Shafran", description: "Builder at Nebius", imageSrc: "/team/victor_s.jpg", linkedinUrl: "https://www.linkedin.com/in/victor-shafran-88b63b3/" },
  { id: "roy_s", name: "Roy Schroy", description: "Senior Director of R&D at Crusoe", imageSrc: "/team/roy_s.jpeg", linkedinUrl: "https://www.linkedin.com/in/roy-shchory-266578164/" },

  // Women members
  { id: "stav_l", name: "Stav Levy", description: "CEO and Co-Founder @ Alta | AI Revenue Workforce", imageSrc: "/team/stav_levy.jfif", linkedinUrl: "https://www.linkedin.com/in/stav-levy/" },
  // Rest of community
  // { id: "idan_h", name: "Idan Habler", description: "AI Security Researcher at CISCO", imageSrc: "/team/idan_h.jpeg", linkedinUrl: "https://www.linkedin.com/in/idan-habler/?originalSubdomain=il" },
  { id: "yaron_r", name: "Yaron Rosen", description: "Entrepreneur, a16z Scout, angel investor and Apex Advisory", imageSrc: "/team/yaron_rosen.jpg", linkedinUrl: "https://www.linkedin.com/in/yaron-rosen-3b46296/" },
  { id: "adi", name: "Adi Glasman", description: "Vice President of Engineering & Data Zendesk", imageSrc: "/team/adi.jpeg", linkedinUrl: "https://www.linkedin.com/in/glasman/" },
  // { id: "david_k", name: "David Kadouch", description: "Google AI, Technion", imageSrc: "/team/david_kadouch.jfif", linkedinUrl: "https://www.linkedin.com/in/davidkad/" },
  // { id: "gal", name: "Gal Peretz", description: "Head of AI @ Carbyne | Co-Host @ LangTalks podcast", imageSrc: "/team/gal_perez.png", linkedinUrl: "https://www.linkedin.com/in/gal-peretz/" },
  { id: "assaf_e", name: "Assaf Elovic", description: "Co-founder of Tavily (acquired by Nebius)", imageSrc: "/team/assaf_elovic.jpeg", linkedinUrl: "https://www.linkedin.com/in/assafe/" },
  { id: "roy_m", name: "Roy Miara", description: "AI leader at Tenzai", imageSrc: "/team/miara.png", linkedinUrl: "https://www.linkedin.com/in/miararoy/" },
  { id: "gadi_l", name: "Gadi Lifshitz", description: "Director of Engineering at Cato Networks", imageSrc: "/team/gadi.jpeg", linkedinUrl: "https://www.linkedin.com/in/lgadi/" },
  // { id: "ido_b", name: "Ido Ben Shaul", description: "AA-I Technologies", imageSrc: "/team/ido_ben_shaul.png", linkedinUrl: "https://www.linkedin.com/in/ido-ben-shaul-482449147/" },
  { id: "elad_l", name: "Elad Levi", description: "CTO at Plurai, PhD", imageSrc: "/team/elad_levi.jpeg", linkedinUrl: "https://www.linkedin.com/in/elad-levi-a938a3121/" },
  { id: "ilan_k", name: "Ilan Kadar", description: "CEO at Plurai, PhD", imageSrc: "/team/ilan_kader.jpeg", linkedinUrl: "https://www.linkedin.com/in/ilan-kadar-b57ba511b/" },
  { id: "roei_h", name: "Roei Haviv", description: "Investor at Bessemer Venture Partners", imageSrc: "/team/roei_h.jpg", linkedinUrl: "https://www.linkedin.com/in/roeihaviv/" },
  { id: "nativ", name: "Nativ Levy", description: "AI Researcher at Stealth", imageSrc: "/team/nativ.jpeg", linkedinUrl: "https://www.linkedin.com/in/nativ-levy/" },
  // { id: "benny_m", name: "Benny Meir", description: "DevOps Ninja", imageSrc: "/team/benny_meir.png", linkedinUrl: "" },
  { id: "almog_b", name: "Almog Baku", description: "GenAI Community Founder", imageSrc: "/team/almog_baku.png", linkedinUrl: "https://www.linkedin.com/in/almogbaku/" },
  { id: "tamir_m", name: "Tamir Meerovitch", description: "Sr. Growth Strategy Executive at Frost & Sullivan", imageSrc: "/team/tal_meerovitch.jpeg", linkedinUrl: "https://www.linkedin.com/in/tamir-meerovitch/" },
  { id: "itzik_p", name: "Itzik Polad", description: "Chief Data Officer at LSports", imageSrc: "/team/itzik.webp", linkedinUrl: "https://www.linkedin.com/in/itzik-polad/" },

];

export const allMembers: Member[] = [...foundingTeamMembers, ...communityMembers];

// Alumni from first APEX Architect Beta Cohort
export const alumniMembers: Alumni[] = [
  { id: "aviel_zecharia", name: "Aviel Zecharia", description: "Architect at Palo Alto Networks", imageSrc: "/alumni/aviel_z.jpeg", linkedinUrl: "https://www.linkedin.com/in/aviel-zecharia-832a66131/", cohort: "Cohort 2" },
  { id: "ilan_voronel", name: "Ilan Voronel", description: "Team Leader, Machine Learning and Data Science at Glassbox", imageSrc: "/alumni/ilan_v.jpeg", linkedinUrl: "https://www.linkedin.com/in/ilan-voronel/", cohort: "Cohort 2" },
  { id: "iddan_golomb", name: "Iddan Golomb", description: "Co-Founder & CPO at Sayata", imageSrc: "/alumni/iddan_g.jpeg", linkedinUrl: "https://www.linkedin.com/in/iddangolomb/", cohort: "Cohort 2" },
  { id: "omri_gotlib", name: "Omri Gotlib", description: "Team Lead, Security Research", imageSrc: "/alumni/omri_g.jpeg", linkedinUrl: "https://www.linkedin.com/in/omri-gotlib-223288260/", cohort: "Cohort 2" },
  { id: "benzion_kossowsky", name: "Benzion Kossowsky", description: "Team Lead at OneStep", imageSrc: "/alumni/benzion_k.jpeg", linkedinUrl: "https://www.linkedin.com/in/benzionkossowsky", cohort: "Cohort 2" },
  { id: "omer_onn", name: "Omer Onn", description: "Cloud & Technology Alliance Manager at Akeyless", imageSrc: "/alumni/omer_o.jpeg", linkedinUrl: "https://www.linkedin.com/in/omer-onn-0b980961", cohort: "Cohort 2" },
  { id: "gil_raytan", name: "Gil Raytan", description: "Director of Engineering at Remitly", imageSrc: "/alumni/gil_r.jpeg", linkedinUrl: "https://www.linkedin.com/in/gil-raytan/", cohort: "Cohort 2" },
  { id: "ron_galay", name: "Ron Galay", description: "Senior Software Engineer at Datadog", imageSrc: "/alumni/ron_g.jpeg", linkedinUrl: "https://www.linkedin.com/in/ron-galay-0b451662", cohort: "Cohort 2" },
  { id: "guy_yoshpe", name: "Guy Yoshpe", description: "Software Engineer at Wiz", imageSrc: "/alumni/guy_y.jpeg", linkedinUrl: "https://www.linkedin.com/in/yoshpe", cohort: "Cohort 2" },
  { id: "michal_ran_shchory", name: "Michal Ran Shchory", description: "Software & Algorithms at Protai", imageSrc: "/alumni/michal_r.jpeg", linkedinUrl: "https://www.linkedin.com/in/michal-ran", cohort: "Cohort 2" },
  { id: "hila_shmuel", name: "Hila Shmuel", description: "Project Manager & Web Team Lead at Matrix", imageSrc: "/alumni/hila_s.png", linkedinUrl: "https://www.linkedin.com/in/hilashmuel/", cohort: "Cohort 2" },
  { id: "ido_kazma", name: "Ido Kazma", description: "Algo Team Lead at Q.ai", imageSrc: "/alumni/ido_k.png", linkedinUrl: "https://www.linkedin.com/in/idokazma", cohort: "Cohort 2" },
  { id: "yuri_shapira", name: "Yuri Shapira", description: "Principal Researcher at PureSec", imageSrc: "/alumni/yuri_s.jpeg", linkedinUrl: "https://www.linkedin.com/in/yurishapira", cohort: "Cohort 2" },
  { id: "eyal_horowicz", name: "Eyal Horowicz", description: "Senior Software Engineer at Claroty", imageSrc: "/alumni/eyal_h.jpeg", linkedinUrl: "https://www.linkedin.com/in/eyal-horowicz", cohort: "Cohort 2" },
  { id: "benny_rousso", name: "Benny Rousso", description: "CEO at Xcardia", imageSrc: "/alumni/benny_r.jpeg", linkedinUrl: "https://www.linkedin.com/in/benny-rousso-27832b32b", cohort: "Cohort 2" },
  { id: "lior_lev_tov", name: "Lior Lev Tov", description: "Software Engineer at Eon.io", imageSrc: "/alumni/lior_l.jpeg", linkedinUrl: "https://www.linkedin.com/in/liorlevtov", cohort: "Cohort 2" },
  { id: "liran_markin", name: "Liran Markin", description: "CEO at Edwin", imageSrc: "/alumni/liran_m.jpeg", linkedinUrl: "https://www.linkedin.com/in/liran-markin/", cohort: "Cohort 2" },
  { id: "mor_shemesh", name: "Mor Shemesh", description: "Founding Engineer at Stealth", imageSrc: "/alumni/mor_s.jpeg", linkedinUrl: "https://www.linkedin.com/in/mor-shemesh-1bb04a155", cohort: "Cohort 2" },
  { id: "roy_moshe", name: "Roy Moshe", description: "CEO at Stealth", imageSrc: "/alumni/roy_m.jpeg", linkedinUrl: "https://www.linkedin.com/in/roy-moshe-0727b115b", cohort: "Cohort 2" },
  { id: "michael_komraz", name: "Michael Komraz", description: "Director of Product Strategy at Snyk", imageSrc: "/alumni/michael_k.png", linkedinUrl: "https://www.linkedin.com/in/michael-komraz/", cohort: "Cohort 2" },
  { id: "almog_zer", name: "Almog Zer", description: "R&D Group Lead at Stealth", imageSrc: "/alumni/almog_z.jpeg", linkedinUrl: "https://www.linkedin.com/in/almog-zer-865897118", cohort: "Cohort 2" },
  { id: "bar_matityahu", name: "Bar Matityahu", description: "Founder at Stealth", imageSrc: "/alumni/bar_m.jpeg", linkedinUrl: "https://www.linkedin.com/in/bar-matityahu", cohort: "Cohort 2" },
  { id: "kfir_shoar", name: "Kfir Shoar", description: "Software Developer at Cyera", imageSrc: "/alumni/kfir_s.jpeg", linkedinUrl: "https://www.linkedin.com/in/kfirshoar", cohort: "Cohort 2" },
  { id: "peleg_ben_hamo", name: "Peleg Ben Hamo", description: "Software Developer at Cyera", imageSrc: "/alumni/peleg_b.jpeg", linkedinUrl: "https://www.linkedin.com/in/peleg-ben-hamo-a90034355", cohort: "Cohort 2" },
  { id: "jonathan_gilat", name: "Jonathan Gilat", description: "CTO at Medida AI", imageSrc: "/alumni/jonathan_g.jpeg", linkedinUrl: "https://www.linkedin.com/in/jonathangilat", cohort: "Cohort 2" },
  { id: "tzah_pahima", name: "Tzah Pahima", description: "Cloud Security Researcher at Orca Security", imageSrc: "/alumni/tzah_p.jpeg", linkedinUrl: "https://www.linkedin.com/in/tzah-pahima-6b5b75178", cohort: "Cohort 2" },
  { id: "yakov_kosoburd", name: "Yakov Kosoburd", description: "MSc Research Student at Weizmann Institute", imageSrc: "/alumni/yakov_k.png", linkedinUrl: "https://www.linkedin.com/in/yakov-kosoburd-8b8aa127a", cohort: "Cohort 2" },
  { id: "barak_lavy", name: "Barak Lavy", description: "CTO at Stealth", imageSrc: "/alumni/barak_l.jpeg", linkedinUrl: "https://www.linkedin.com/in/barak-lavy", cohort: "Cohort 2" },
  { id: "michael_zuzovski", name: "Michael Zuzovski", description: "Researcher at Tel Aviv University", imageSrc: "/alumni/michael_z.jpeg", linkedinUrl: "https://www.linkedin.com/in/michael-z-2355655a", cohort: "Cohort 2" },
  { id: "shachar_resisi", name: "Shachar Resisi", description: "Algorithm Developer at Vayyar Imaging", imageSrc: "/alumni/schachar_r.jpeg", linkedinUrl: "https://www.linkedin.com/in/shachar-resisi", cohort: "Cohort 2" },
  { id: "shaked_yehezkel", name: "Shaked Yehezkel", description: "Researcher at Tel Aviv University", imageSrc: "/alumni/shaked_y.jpeg", linkedinUrl: "https://www.linkedin.com/", cohort: "Cohort 2" },
  { id: "sharon_brizinov", name: "Sharon Brizinov", description: "Security Researcher", imageSrc: "/alumni/sharon_b.jpeg", linkedinUrl: "https://www.linkedin.com/in/sharonbrizinov/", cohort: "Cohort 2" },
  { id: "tomer_goren", name: "Tomer Goren", description: "Building", imageSrc: "/alumni/tomer_g.png", linkedinUrl: "https://www.linkedin.com/", cohort: "Cohort 2" },
  { id: "gal_wiernik", name: "Gal Wiernik", description: "CTO at Edwin", imageSrc: "/alumni/gal_w.jpeg", linkedinUrl: "https://www.linkedin.com/in/galwiernik", cohort: "Cohort 2" },
  { id: "aharon_blank", name: "Aharon Blank", description: "Researcher at Technion", imageSrc: "/alumni/aharon_blank.jpg", linkedinUrl: "https://www.linkedin.com/in/aharon-blank-42b03829a/", cohort: "Beta Cohort 2024" },
  { id: "uri_shaked", name: "Uri Shaked", description: "Voiding warranties at Wokwi.com, Keepin' it Chippin' at TinyTapeout.com", imageSrc: "/alumni/uri_shaked.png", linkedinUrl: "https://www.linkedin.com/in/urishaked/", cohort: "Beta Cohort 2024" },
  { id: "eyal_kraft", name: "Eyal Kraft", description: "CTO @ Stealth", imageSrc: "/alumni/eyal_kraft.jpeg", linkedinUrl: "https://www.linkedin.com/in/eyalkraft/", cohort: "Beta Cohort 2024" },
  { id: "eldad_kepten", name: "Eldad Kepten", description: "Leading Data Scientist from Research to Product", imageSrc: "/alumni/eldad_kepten.jpeg", linkedinUrl: "https://www.linkedin.com/in/eldad-kepten-441ba124/", cohort: "Beta Cohort 2024" },
  { id: "michal_shilo", name: "Michal Shilo", description: "Data scientist and Talpiot graduate", imageSrc: "/alumni/michal_shilo.jpeg", linkedinUrl: "https://www.linkedin.com/in/michal-shilo-ba3002190/", cohort: "Beta Cohort 2024" },
  { id: "amir_anisman", name: "Amir Anisman", description: "Talpiot XVII", imageSrc: "/alumni/amir_anisman.jpg", linkedinUrl: "https://www.linkedin.com/in/amir-anisman-a8214520b/", cohort: "Beta Cohort 2024" },
  { id: "assaf_monsa", name: "Assaf Monsa", description: "Co-Founder, CTO & VP R&D @ D-Fend Solutions", imageSrc: "/alumni/assaf_monsa.jpeg", linkedinUrl: "https://www.linkedin.com/in/assaf-monsa-72a84/", cohort: "Beta Cohort 2024" },
  { id: "gai_gutherz", name: "Gai Gutherz", description: "Head of Technical Product @ Miggo", imageSrc: "/alumni/gai_gutherz.jpeg", linkedinUrl: "https://www.linkedin.com/in/gai-gutherz/", cohort: "Beta Cohort 2024" },
  { id: "danny_grander", name: "Danny Grander", description: "Co-Founder @ Snyk, Angel Investor", imageSrc: "/alumni/danny_grander.jpeg", linkedinUrl: "https://www.linkedin.com/in/grander/", cohort: "Beta Cohort 2024" },
  { id: "noy_duany", name: "Noy Duany", description: "R&D Team Lead @Hopper Security", imageSrc: "/alumni/noy_duany.jpeg", linkedinUrl: "https://www.linkedin.com/in/noyduany/", cohort: "Beta Cohort 2024" },
  { id: "daniel_ohayon", name: "Daniel Ohayon", description: "MSc. Student at Technion | Psagot", imageSrc: "/alumni/daniel_ohayon.jpeg", linkedinUrl: "https://www.linkedin.com/in/daniel-ohayon-45b68513a/", cohort: "Beta Cohort 2024" },
  { id: "daniel_drizin", name: "Daniel Drizin", description: "VP R&D at Paragon", imageSrc: "/alumni/daniel_drizin.jpeg", linkedinUrl: "https://www.linkedin.com/in/ddrizin/", cohort: "Beta Cohort 2024" },
  { id: "dror_ben_eliezer", name: "Dror Ben Eliezer", description: "Independent Consultant | ex-Nike | Talpiot", imageSrc: "/alumni/dror_ben_eliezer.jpeg", linkedinUrl: "https://www.linkedin.com/in/dror-ben-eliezer-b084406/", cohort: "Beta Cohort 2024" },
  { id: "meir_adest", name: "Meir Adest", description: "Co-Founder, SolarEdge Technologies", imageSrc: "/alumni/meir_adest.png", linkedinUrl: "https://www.linkedin.com/in/meiradest/", cohort: "Beta Cohort 2024" },
  { id: "michael_kellner", name: "Michael Kellner", description: "Co-Founder & CTO @SendBlocks", imageSrc: "/alumni/michael_kellner.jpeg", linkedinUrl: "https://www.linkedin.com/in/michael-kellner-689258206/", cohort: "Beta Cohort 2024" },
  { id: "nadav_zemach", name: "Nadav Zemach", description: "Director Advisor - Ministry of Finance General", imageSrc: "/alumni/nadav_zemach.jpg", linkedinUrl: "https://www.linkedin.com/in/nadav-zemach-477a42365/", cohort: "Beta Cohort 2024" },
  { id: "omer_hay", name: "Omer Hay", description: "Software Engineer | R&D Team Lead", imageSrc: "/alumni/omer_hay.jpeg", linkedinUrl: "https://www.linkedin.com/in/hay-omer/", cohort: "Beta Cohort 2024" },
  { id: "inbal_beracha", name: "Inbal Beracha", description: "Founding Engineer @Stealth", imageSrc: "/alumni/inbal_beracha.jpeg", linkedinUrl: "https://www.linkedin.com/in/inbal-beracha-a668ab182/", cohort: "Beta Cohort 2024" },
  { id: "eran_hirsch", name: "Eran Hirsch", description: "Freelance Full-Stack, Ex-Meta", imageSrc: "/alumni/eran_hirsch.jpeg", linkedinUrl: "https://www.linkedin.com/in/eranhirsch/", cohort: "Beta Cohort 2024" },
  { id: "eran_hertzmann", name: "Eran Hertzmann", description: "Product Executive | AI-Powered Digital Health", imageSrc: "/alumni/eran_hertzmann.jpeg", linkedinUrl: "https://www.linkedin.com/in/eran-hertzmann-24a400/", cohort: "Beta Cohort 2024" },
  { id: "zvi_wexlstein", name: "Zvi Wexlstein", description: "Software Architect at Polar (An IBM Company)", imageSrc: "/alumni/zvi_wexlstein.jpeg", linkedinUrl: "https://www.linkedin.com/in/zvi-wexlstein/", cohort: "Beta Cohort 2024" },
  { id: "ronen_tur", name: "Ronen Tur", description: "Director of Algorithms and Deep Learning | Talpiot", imageSrc: "/alumni/ronen_tur.jpeg", linkedinUrl: "https://www.linkedin.com/in/ronen-tur-641a0a18/", cohort: "Beta Cohort 2024" },
  { id: "roee_yaron", name: "Roee Yaron", description: "Physicist @ Ministry of Defense | Talpiot", imageSrc: "/alumni/roee_yaron.jpg", linkedinUrl: "https://www.linkedin.com/", cohort: "Beta Cohort 2024" },
  { id: "rami_anati", name: "Rami anati", description: "Team Lead, Back End Project Manager", imageSrc: "/alumni/rami_anati.jpeg", linkedinUrl: "https://www.linkedin.com/in/ramianati/", cohort: "Beta Cohort 2024" },
  { id: "shachar_cohen", name: "Shachar Cohen", description: "Software R&D Engineer and Manager | Talpiot", imageSrc: "/alumni/shachar_cohen.jpeg", linkedinUrl: "https://www.linkedin.com/in/shachar-cohen-480b86205/", cohort: "Beta Cohort 2024" },
  { id: "shai_elroy", name: "Shai Elroy", description: "R&D Team Lead, Cyber", imageSrc: "/alumni/shai_elroy.jpeg", linkedinUrl: "https://www.linkedin.com/in/shai-elroy/", cohort: "Beta Cohort 2024" },
  { id: "aviel_adler", name: "Aviel Adler", description: "", imageSrc: "/alumni/placeholder.png", linkedinUrl: "https://www.linkedin.com/in/aviel-a-a87b2612/", cohort: "Beta Cohort 2024" },
];
