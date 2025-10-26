import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText } from "lucide-react";
import ArrowIcon from "../components/my-components-ui/Arrow";

type StacksGrouped = {
  frontend?: string[];
  backend?: string[];
  devops?: string[];
  tools?: string[];
  databases?: string[];
};

type Experience = {
  company: string;
  role: string;
  period: string;
  stacks?: StacksGrouped;
  points: string[];
  logo?: string;
  url?: string;
};

type StudyItem = {
  school: string;
  period: string;
  diploma: string;
  points?: string[];
  methods: string[];
  logo?: string;
  url?: string;
};

const EXPERIENCES: Experience[] = [
  {
    company: "Sidetrade",
    role: "Full stack Developer – Apprenticeship",
    period: "2024 – 2025",
    stacks: {
      frontend: ["React", "TypeScript", "Ant Design"],
      backend: ["C#", ".NET Framework", "ASP.NET Core", "REST API", "API Gateway"],
      devops: ["Azure DevOps", "Jenkins", "CI/CD"],
      tools: ["SQL Server", "Entity Framework", "Git", "Jira", "Scrum"],
    },
    points: [
      "CSV export with server-side sorting (front & server-side)",
      "Safe image deletion flow (confirm + rollback)",
      "Performance optimizations & UI responsiveness",
      "Sprint ceremonies & code reviews participation",
      "Jenkins CI/CD pipelines for automated deployment",
      "Azure DevOps boards management for feature tracking",
      "Production features used daily by major clients",
      "API Gateway routing & authentication configuration",
    ],
    logo: "/sidetrade.webp",
  },
  {
    company: "Freelance (Open to missions)",
    role: "Full-stack Developer",
    period: "Available now",
    stacks: {
      frontend: ["React", "TypeScript", "Vite", "Tailwind", "Ant Design"],
      backend: [
        "Node.js", "Express.js",
        "PHP", "Symfony", "Laravel",
        "C#", ".NET Core", "ASP.NET",
      ],
      databases: ["PostgreSQL", "SQL Server", "MongoDB", "Mongoose"],
      devops: ["Azure DevOps", "Jenkins", "CI/CD"],
      tools: ["Git", "Jira", "Scrum", "Postman"],
    },
    points: [
      "Available now • short-term missions • remote/hybrid",
      "Custom dashboards, B2B SaaS tools, e-commerce integrations",
      "MVPs delivered in 1–2 weeks with rapid iteration",
      "Clean architecture • API-first approach • tests",
      "Accessibility and performance budgets (Lighthouse)",
      "Deployment & handoff + optional 30-day maintenance",
      "French invoicing • NDA-friendly • quotes available",
    ],
    logo: "/malt-logo.webp",
    url: "https://www.malt.fr/profile/vincentnaulleau",
  },
];

const STUDIES: StudyItem[] = [
  {
    school: "Epitech — MSc in Computer Science",
    period: "2025 – 2027",
    diploma: "Master of Science in Computer Science (RNCP Level 7)",
    points: [
      "2-year work-study program combining courses and industry practice",
      "Specialization: AI, Cybersecurity, Cloud, or Software Architecture",
      "Capstone project with partner company",
      "Distributed systems, DevOps pipelines, and scalability focus",
      "Weekly sprint reviews, peer audits, and presentations",
    ],
    methods: ["Specialization-oriented learning", "Work-study immersion", "Industry projects"],
    logo: "/epitech-logo.webp",
    url: "https://www.epitech.eu/",
  },
  {
    school: "Epitech — MSc Preparatory Year",
    period: "2024 – 2025",
    diploma: "Preparatory year for MSc in Computer Science",
    points: [
      "4-month Piscine (full-time) followed by apprenticeship",
      "Strong foundations in algorithms & software design",
      "Front-end & back-end projects with real use cases",
      "Agile teamwork, code reviews, CI introduction",
    ],
    methods: ["Project-based learning", "Peer learning", "Weekly sprints & demos"],
    logo: "/epitech-logo.webp",
    url: "https://www.epitech.eu/formation-alternance/pre-msc-post-bac2/",
  },
  {
    school: "Web@cadémie by Epitech",
    period: "2023 – 2025",
    diploma: "Bachelor Web Development full stack (RNCP Level 6)",
    points: [
      "Intensive 2-year program focused on real-world projects",
      "Selective 5-week Piscine bootcamp",
      "1 year of apprenticeship experience",
      "Agile methodology (Scrum) & pair programming",
    ],
    methods: ["Learning by doing", "Project-based", "Collaborative learning"],
    logo: "/wac-logo.webp",
    url: "https://www.webacademie.org/",
  },
];

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[11px] sm:text-xs md:text-sm px-2.5 py-0.5 rounded-full border border-[#A67665]/40 text-[#A67665] bg-white/80 backdrop-blur-sm">
      {children}
    </span>
  );
}

function StackGroup({ label, items }: { label: string; items?: string[] }) {
  if (!items?.length) return null;
  return (
    <div className="mt-3">
      <p className="text-[10px] uppercase tracking-wide text-gray-500 mb-1">{label}</p>
      <div className="flex flex-wrap gap-1.5">{items.map((t) => <Chip key={t}>{t}</Chip>)}</div>
    </div>
  );
}

function LogoBox({ src, alt, href }: { src?: string; alt: string; href?: string }) {
  const logo = (
    <div className="flex items-center justify-center w-[110px] h-[32px]">
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-contain" />
      ) : (
        <span className="font-semibold text-[#A67665]">{alt}</span>
      )}
    </div>
  );
  return href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:opacity-85 transition-opacity cursor-pointer"
    >
      {logo}
    </a>
  ) : (
    logo
  );
}

function WorkSlide({ exp }: { exp: Experience }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <LogoBox src={exp.logo} alt={exp.company} href={exp.url} />
        <span className="text-xs text-gray-500">{exp.period}</span>
      </div>
      <p className="text-[#A67665] font-semibold text-lg">{exp.role}</p>
      <ul className="space-y-1.5">
        {exp.points.map((p, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#A67665]" />
            <p className="text-sm text-gray-700">{p}</p>
          </li>
        ))}
      </ul>
      <div className="pt-2 space-y-2">
        <StackGroup label="Frontend" items={exp.stacks?.frontend} />
        <StackGroup label="Backend" items={exp.stacks?.backend} />
        <StackGroup label="Databases" items={exp.stacks?.databases} />
        <StackGroup label="DevOps" items={exp.stacks?.devops} />
        <StackGroup label="Tools" items={exp.stacks?.tools} />
      </div>
    </div>
  );
}

function StudySlide({ study }: { study: StudyItem }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <LogoBox src={study.logo} alt={study.school} href={study.url} />
        <span className="text-xs text-gray-500">{study.period}</span>
      </div>
      <p className="text-[#A67665] font-semibold text-lg">{study.diploma}</p>
      <ul className="space-y-1.5">
        {study.points?.map((p, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#A67665]" />
            <p className="text-sm text-gray-700">{p}</p>
          </li>
        ))}
      </ul>
      {study.methods.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {study.methods.map((m) => <Chip key={m}>{m}</Chip>)}
        </div>
      )}
    </div>
  );
}

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
};

const Journey: React.FC = () => {
  const [sectionSelected, setSectionSelected] = useState<"Work" | "Study">("Work");
  const [index, setIndex] = useState(0);
  const dirRef = useRef(0);

  const data = sectionSelected === "Work" ? EXPERIENCES : STUDIES;
  const max = data.length - 1;

  const goTo = (i: number) => {
    const clamped = Math.max(0, Math.min(i, max));
    dirRef.current = clamped > index ? 1 : -1;
    setIndex(clamped);
  };

  return (
    <section
      id="journey"
      className="relative flex flex-col items-center justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-24 sm:py-28 bg-gradient-to-b from-[#fdfbf9] to-white"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#A67665]/10 blur-[160px] rounded-full pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <p className="uppercase text-[10px] sm:text-xs font-semibold text-gray-500 tracking-[0.25em] mb-2">
          My Path
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
          Journey
        </h2>
        <div className="mx-auto mt-3 h-[2px] w-12 bg-[#A67665]" />
      </motion.div>
      <div className="w-full max-w-3xl bg-white/90 backdrop-blur-xl border border-[#e5e5e5]/70 shadow-[0_8px_30px_rgba(0,0,0,0.08)] rounded-3xl p-8 sm:p-10">
        {/* boutons */}
        <div className="flex justify-center gap-3 mb-8">
          {["Study", "Work"].map((s) => (
            <button
              key={s}
              onClick={() => { setSectionSelected(s as "Study" | "Work"); setIndex(0); }}
              className={`cursor-pointer w-28 sm:w-32 py-2 rounded-full font-semibold text-sm sm:text-base transition-all
                ${sectionSelected === s
                  ? "bg-[#A67665]/10 text-[#A67665] border border-[#A67665]/40 shadow-sm"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
            >
              {s}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait" custom={dirRef.current}>
          <motion.div
            key={`${sectionSelected}-${index}`}
            custom={dirRef.current}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            {sectionSelected === "Work" ? (
              <WorkSlide exp={EXPERIENCES[index]} />
            ) : (
              <StudySlide study={STUDIES[index]} />
            )}
          </motion.div>
        </AnimatePresence>
        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            className="cursor-pointer p-2 rounded-full bg-[#A67665]/10 shadow disabled:opacity-40"
          >
            <ArrowIcon width={20} height={20} className="rotate-180 text-[#A67665]" />
          </button>
          <div className="flex gap-2">
            {data.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`cursor-pointer h-7 w-7 sm:h-8 sm:w-8 rounded-full font-semibold text-xs sm:text-sm
                  ${i === index
                    ? "bg-[#A67665]/20 text-[#A67665] shadow-sm"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button
            onClick={() => goTo(index + 1)}
            disabled={index === max}
            className="cursor-pointer p-2 rounded-full bg-[#A67665]/10 shadow disabled:opacity-40"
          >
            <ArrowIcon width={20} height={20} className="text-[#A67665]" />
          </button>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          viewport={{ once: true }}
          className="mt-10 flex justify-center"
        >
          <a
            href="/docs/naulleau-vincent-resume.pdf"
            download="[Resume]Naulleau-Vincent.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#1a1a1a] text-white text-sm sm:text-base font-medium shadow-md hover:opacity-85 transition"
          >
            <FileText size={16} />
            <span>Download CV</span>
          </a>
        </motion.div>
      </div>
      <div className="mt-20 w-full max-w-5xl">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#A67665]/30 to-transparent" />
      </div>
    </section>
  );
};

export default Journey;
