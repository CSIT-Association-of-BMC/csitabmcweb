export interface StatItem {
  label: string;
  value: string;
}

export interface PillarItem {
  title: string;
  description: string;
}

export interface PartnerItem {
  id: number;
  Image: string;
}

export interface TestimonialItem {
  id: number;
  image: string;
  Name: string;
  testimony: string;
  Post: string;
}

export const associationStats: StatItem[] = [
  { label: "Founded", value: "2016 AD" },
  { label: "Executive members", value: "16" },
  { label: "Community events", value: "110+" },
  { label: "Students Impacted", value: "10000+" },
  { label: "Partnered Org.", value: "100+" },
];

export const associationPillars: PillarItem[] = [
  {
    title: "Skill building & participation",
    description:
      "Workshops, training, and guided participation to help students learn and grow.",
  },
  {
    title: "Industry mentoring & networking",
    description:
      "Connecting students with professionals, alumni, and tech communities.",
  },
  {
    title: "Student welfare & campus support",
    description:
      "Working with the CSIT department to support events and student initiatives.",
  },
  {
    title: "Hackathons & innovation",
    description:
      "Hackathons and challenges that drive innovation and real-world problem solving.",
  },
];

export const Partnerdata: PartnerItem[] = [
  {
    id: 10,
    Image:
      "https://res.cloudinary.com/dol8m5gx7/image/upload/v1723191356/tech_j5vnyn.png",
  },
  {
    id: 3,
    Image:
      "https://res.cloudinary.com/dol8m5gx7/image/upload/v1723191322/3_mxc7jg.png",
  },
  {
    id: 4,
    Image:
      "https://res.cloudinary.com/dol8m5gx7/image/upload/v1723191324/4_cr2dm8.jpg",
  },
  {
    id: 1,
    Image:
      "https://res.cloudinary.com/dol8m5gx7/image/upload/v1723191319/1_a6ilde.jpg",
  },
  {
    id: 6,
    Image:
      "https://res.cloudinary.com/dyshj7mor/image/upload/v1765976095/DearHive_zf6cjb.png",
  },
  {
    id: 2,
    Image:
      "https://res.cloudinary.com/dyshj7mor/image/upload/v1765976095/DearHive_zf6cjb.png",
  },
  {
    id: 7,
    Image:
      "https://res.cloudinary.com/dyshj7mor/image/upload/v1757253969/programiz_e8pxfq.svg",
  },
  {
    id: 8,
    Image:
      "https://res.cloudinary.com/dol8m5gx7/image/upload/v1723191353/8_iuulbk.png",
  },
  {
    id: 9,
    Image:
      "https://res.cloudinary.com/dyshj7mor/image/upload/v1757253969/github_logo_w1hhva.png",
  },
  {
    id: 11,
    Image:
      "https://res.cloudinary.com/dyshj7mor/image/upload/v1757253581/tilottama_mun_qbymbt.jpg",
  },
  {
    id: 12,
    Image:
      "https://res.cloudinary.com/dyshj7mor/image/upload/v1765976095/DearHive_zf6cjb.png",
  },
  {
    id: 13,
    Image:
      "https://res.cloudinary.com/dyshj7mor/image/upload/v1757253582/2pm_w6e4sl.jpg",
  },
  {
    id: 14,
    Image:
      "https://res.cloudinary.com/dyshj7mor/image/upload/v1757253581/butwal-mun_cllopb.png",
  },
  {
    id: 15,
    Image:
      "https://res.cloudinary.com/dyshj7mor/image/upload/v1757253447/TU_o9uydr.jpg",
  },
  {
    id: 16,
    Image:
      "https://res.cloudinary.com/dyshj7mor/image/upload/v1757253969/programiz_e8pxfq.svg",
  },
  {
    id: 17,
    Image:
      "https://res.cloudinary.com/dyshj7mor/image/upload/v1757253970/nepal_bank_wdabtp.png",
  },
  {
    id: 18,
    Image:
      "https://res.cloudinary.com/dyshj7mor/image/upload/v1757253969/mero_job_orvduv.jpg",
  },
  {
    id: 19,
    Image:
      "https://res.cloudinary.com/dyshj7mor/image/upload/v1757254196/shineresunga_fitfis.png",
  },
];

export const TestimonialData: TestimonialItem[] = [
  {
    id: 1,
    image:
      "https://res.cloudinary.com/dol8m5gx7/image/upload/v1723191198/Rabin_iuak4j.jpg",
    Name: "Rabin Pandey",
    testimony:
      "Technology can be our closest companion, and technology can likewise be the greatest partypopper of our lives. It plays a major role in our lives. As a part of CSIT Association of BMC, the most challenging part for me was to make the changes in directions, systems as well college guidelines which somehow got solved and which was possible by our team. Majority of innovation will be exhibited soon and lastly working with an energetic team leading by me was a wonderful experience ever in my lifetime.",
    Post: "Senior Advisor of CSITABMC",
  },
  {
    id: 2,
    image:
      "https://res.cloudinary.com/dol8m5gx7/image/upload/v1723191203/saroj_gmx9dk.jpg",
    Name: "Saroj Dahal",
    testimony:
      "My first session on 'Roadmap to IT Career' organized by CSIT Association of BMC was a memorable one. I felt a cosy aura while mentoring on the event. Truth to be told, I always had a good vibe with Butwal people and from this event, I surely can say that, 'I felt it'. Cheers to the Team.",
    Post: "Fullstack Developer and CTO at Cliffbyte",
  },
  {
    id: 3,
    image:
      "https://res.cloudinary.com/dol8m5gx7/image/upload/v1723191193/prakash_kaxftv.jpg",
    Name: "Prakash Dhakal",
    testimony:
      "CSIT Association of BMC एउटा परिवार हो, म यो संस्थालाई, संस्था भन्दा पनि परिवार भन्न रुचाउने गर्छु। जहिले देखि यस संस्थाको जन्म भयो त्यसपछि नै सम्पुर्ण बिद्यार्थीको अभिभावकको रुपमा काम गरिरहेको छ,बिद्यार्थीहरुको आवाज उठाउने र सम्बोधन गराउने काम गरिरहेको छ। यस संस्थाले क्याम्पसमै उल्लेखनीय कामहरु त गरेको छ सङ्सङै बिद्यार्थी-बिद्यार्थी बिचको घनिष्ठ आत्मियता बढाउन महत्त्वपूर्ण योगदान गरेको छ। CSIT पढ्ने बिद्यार्थी एकजुट छन भन्ने सन्देश क्याम्पसभर दिएको छ। मैले आज सम्म धेरै संस्थामा काम गरेको छु,मलाइ ती संस्थामध्ये सबैभन्दा प्यारो संस्था CSITABMC नै हो।",
    Post: "Former President at CSITABMC",
  },
  {
    id: 4,
    image:
      "https://res.cloudinary.com/dol8m5gx7/image/upload/v1723191192/manoj_sewh6d.jpg",
    Name: "Manoj Pokharel",
    testimony:
      "CSIT Association of BMC speaks a lot more about whole student problem rather than just being a group of people. They always focus on unity, co-operation, and strengths to develop a better relationship between student and administration.",
    Post: "President at CSIT Association of Nepal-Rupandehi",
  },
  {
    id: 5,
    image:
      "https://res.cloudinary.com/dol8m5gx7/image/upload/v1723191192/mahendra_zw1m9i.jpg",
    Name: "Mahendra Kandel",
    testimony:
      "I consider CSIT Association of BMC as a group of leaders of tech community who are always eager to impart knowledge and has willingness to see the change. Despite being an organization inside academic boundary it always had contributed to national tech community. Proud to be a part of it and kudos to the new team.",
    Post: "Former President at CSITABMC",
  },
  {
    id: 6,
    image:
      "https://res.cloudinary.com/dol8m5gx7/image/upload/v1723191201/Sujan_wpthhs.jpg",
    Name: "Sujan Khatiwada",
    testimony:
      "It was a nice moment to share the experience with curious IT people at CSIT Association, BMC.",
    Post: "Fullstack Developer and founder at sathibhai.com",
  },
  {
    id: 7,
    image:
      "https://res.cloudinary.com/dol8m5gx7/image/upload/v1723191200/sindhu_o5pjdy.jpg",
    Name: "Sindhu Aryal",
    testimony:
      "Seeing the CSIT Association of BMC growing beautifully with the mission and vision of helping IT enthusiasts to find a way out of their IT career, widening the reach beyond the college and giving back to the community; gives me immense pleasure. Hats off to you guys for your tireless efforts on shaping it in a way so that upcoming students don't have to face the same barriers as we did in the past.",
    Post: "Web Developer and President at Butwal Coder Girls",
  },
  {
    id: 8,
    image:
      "https://res.cloudinary.com/dol8m5gx7/image/upload/v1723191190/bishan_uso0w3.jpg",
    Name: "Bishan Bashyal",
    testimony:
      "CSIT Association of BMC a group of highly energetic tech enthusiasts. I remember founding this organization from scratch and now the new tenures took this organization to next level, more than I imagined.",
    Post: "IT Officer and Founder President of CSITABMC",
  },
];
