// Portfolio content constants
export const DEVELOPER_INFO = {
  name: "Chase Pelky",
  title: "AI-Focused Software Developer",
  subtitle: "I build intuitive UIs and powerful AI-driven applications",
  bio: "Passionate about creating innovative solutions that bridge the gap between cutting-edge AI technology and intuitive user experiences. I specialize in full-stack development with a focus on AI integration, turning complex problems into elegant, user-friendly applications.",
  location: "Michigan, USA",
  email: "chaselawrence06@gmail.com",
} as const;

export const SOCIAL_LINKS = {
  github: "https://github.com/loviti",
  linkedin: "https://linkedin.com/in/chasepelky",
  email: "mailto:chaselawrence06@gmail.com",
} as const;

export const SKILLS = [
  "TypeScript",
  "Next.js", 
  "React",
  "Tailwind CSS",
  "Framer Motion",
  "Python",
  "TensorFlow / PyTorch",
  "Supabase",
  "PostgreSQL",
  "Docker",
  "Git",
  "Figma",
  "AI Prompt Engineering"
] as const;

export const FEATURED_PROJECTS = [
  {
    id: "proj-ai-cat",
    title: "AI Cat-Guard",
    shortDescription: "Raspberry Pi vision model that identifies which cat is using a Litter-Robot and logs weight/health metrics.",
    longDescription: "A computer vision solution that revolutionizes pet health monitoring. Using TensorFlow on Raspberry Pi, the system identifies individual cats and tracks their litter box usage patterns, providing valuable health insights to pet owners and veterinarians.",
    technologies: ["Python", "TensorFlow", "FastAPI", "Supabase"],
    outcome: "Increased vet diagnostic speed by 33%",
    githubUrl: "https://github.com/loviti/ai-cat-guard",
    liveUrl: null,
    imageUrl: "/images/projects/ai-cat-guard.png",
    featured: true,
  },
  {
    id: "proj-rfq",
    title: "RFQ Fast-Track", 
    shortDescription: "Internal React app that streamlines RFQ submissions for automotive supplier Rassini.",
    longDescription: "A comprehensive business application that digitizes and automates the Request for Quote process for a major automotive supplier. The solution integrates with existing Excel workflows while providing a modern, intuitive interface.",
    technologies: ["React", "Node", "ExcelJS", "Azure"],
    outcome: "Cut quote prep time from 2 hours → 15 minutes",
    githubUrl: null,
    liveUrl: null,
    imageUrl: "/images/projects/rfq-fast-track.png",
    featured: true,
  },
  {
    id: "proj-mc-mod",
    title: "CardCrafter Mod",
    shortDescription: "Minecraft Fabric mod generating collectible buff cards with GUI book.",
    longDescription: "A creative Minecraft modification that adds a trading card game element to the popular sandbox game. Players can collect, trade, and use magical cards that provide various gameplay benefits.",
    technologies: ["Java", "Fabric API"],
    outcome: "5k+ downloads, 4.8★ on CurseForge",
    githubUrl: "https://github.com/loviti/cardcrafter-mod",
    liveUrl: "https://www.curseforge.com/minecraft/mc-mods/cardcrafter",
    imageUrl: "/images/projects/cardcrafter.png",
    featured: true,
  },
  {
    id: "proj-productivity",
    title: "TaskSpark Web",
    shortDescription: "React + local-LLM productivity tracker that auto-tags tasks & fetches motivational Shorts.",
    longDescription: "An AI-powered productivity application that uses local language models to intelligently categorize tasks and provide personalized motivation through curated video content. Built with privacy-first principles.",
    technologies: ["Next.js", "LangChain", "Supabase", "YouTube API"],
    outcome: "20% increase in daily task completion in pilot",
    githubUrl: "https://github.com/loviti/taskspark-web",
    liveUrl: null,
    imageUrl: "/images/projects/taskspark.png",
    featured: true,
  },
] as const;

export const TESTIMONIALS = [
  {
    quote: "Chase delivered a production-ready AI prototype in record time.",
    name: "Dr. Emily Larson",
    title: "Professor, Kettering University",
  },
  {
    quote: "Our RFQ throughput skyrocketed thanks to Chase's intuitive UI.",
    name: "Carlos Rodriguez", 
    title: "Manufacturing Engineer, Rassini",
  },
] as const;

export const NAVIGATION_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;

// Note: AI Chatbot now uses dynamic data from Supabase instead of pre-seeded responses 