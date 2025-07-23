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

// AI Chatbot pre-seeded Q&A
export const CHATBOT_QA = [
  {
    question: "Who is Chase Pelky?",
    answer: "I'm an AI-focused software developer who loves building innovative solutions that bridge cutting-edge AI technology with intuitive user experiences. I specialize in full-stack development with React, Next.js, Python, and various AI frameworks."
  },
  {
    question: "What are your main skills?",
    answer: "My primary skills include TypeScript, Next.js, React, Python, TensorFlow/PyTorch, and Supabase. I'm particularly passionate about AI prompt engineering and creating seamless user interfaces for complex AI systems."
  },
  {
    question: "Tell me about the AI Cat-Guard project",
    answer: "AI Cat-Guard is a computer vision system I built using TensorFlow on Raspberry Pi. It identifies individual cats using a Litter-Robot and tracks their health metrics. This project increased vet diagnostic speed by 33% and showcases my ability to apply AI to real-world problems."
  },
  {
    question: "What about the RFQ Fast-Track project?",
    answer: "RFQ Fast-Track is a React application I developed for automotive supplier Rassini. It streamlines their Request for Quote process, cutting preparation time from 2 hours down to just 15 minutes. The project involved integrating with existing Excel workflows while providing a modern UI."
  },
  {
    question: "Do you have any gaming projects?",
    answer: "Yes! I created CardCrafter, a Minecraft Fabric mod that adds a trading card game element to Minecraft. It has over 5,000 downloads and a 4.8-star rating on CurseForge. This project demonstrates my Java skills and game development experience."
  },
  {
    question: "How can I contact you?",
    answer: "You can reach me at chaselawrence06@gmail.com, connect with me on LinkedIn at linkedin.com/in/chasepelky, or check out my code on GitHub at github.com/loviti. I'm always open to discussing new opportunities and interesting projects!"
  }
] as const; 