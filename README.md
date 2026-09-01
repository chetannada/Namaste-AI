# Namaste AI 🚀

**Namaste AI** is a hands-on learning journey to understand modern **Artificial Intelligence** and build real-world AI applications.

Created while learning from the **[Namaste AI course 🔥](https://namastedev.com/learn/namaste-ai?_aff=946684804112)** by **Akshay Saini**, Founder of **[NamasteDev](https://namastedev.com/?_aff=946684804112)**.

This repository is my **learning in public** journey, where I share my **handwritten notes, learnings, experiments, and projects** as I explore AI. ✍️🤖

> 💡 **The goal is not just to use AI tools.**
>
> **Understand how AI works → Build with AI → Learn by doing → Share the journey.** 🚀

### 🌐 Live Demo

🔗 **[namaste-ai-dev.vercel.app](https://namaste-ai-dev.vercel.app)**

✍️ **Take Notes** • 💡 **Learn concepts** • 🛠️ **Build Projects** • 🚀 **Learn in Public**

## 📚 Course Roadmap

> 🚀 **Learn AI step by step — from understanding the foundations to building real-world AI applications.**
>
> ✍️ Along the way, I'm also creating and sharing my **handwritten notes** so my learning stays public and useful to others.

## 🧠 Season 1 — Inside the Mind of AI

> **Understand how AI evolved, how modern AI systems work, and what happens inside an LLM.**

### 🎬 Episode 01 — Welcome to Namaste AI

🌱 Begin your Namaste AI journey and explore what AI is, how it works, and what you'll learn throughout the course.

**What you'll learn**

- 🤖 What is AI?
- 🧠 How AI systems work
- 🗺️ Course roadmap
- 🚀 What we'll build and explore

✍️ **Handwritten Notes:**

- 📝 **Roadmap about Namaste AI Course** [View Notes 🚀](https://namaste-ai-dev.vercel.app/notes/season-1/episode-1-welcome-to-namaste-ai/roadmap-about-namaste-ai-course)

---

### 🕰️ Episode 02 — The Evolution of AI

Explore the evolution of Artificial Intelligence and the breakthroughs that shaped modern AI systems.

**What you'll learn**

- 🧠 How AI started
- 📜 Important AI milestones
- ♟️ Rule-based AI
- 🤖 Machine Learning
- 🔥 The evolution toward modern AI

✍️ **Handwritten Notes:**

- 📝 **What Is Artificial Intelligence?** [View Notes 🚀](https://namaste-ai-dev.vercel.app/notes/season-1/episode-2-the-evolution-of-ai/what-is-artificial-intelligence)
- 📝 **The Evolution of Artificial Intelligence** [View Notes 🚀](https://namaste-ai-dev.vercel.app/notes/season-1/episode-2-the-evolution-of-ai/the-evolution-of-artificial-intelligence)
- 📝 **Rule-Based AI** [View Notes 🚀](https://namaste-ai-dev.vercel.app/notes/season-1/episode-2-the-evolution-of-ai/rule-based-ai)
- 📝 **Machine Learning** [View Notes 🚀](https://namaste-ai-dev.vercel.app/notes/season-1/episode-2-the-evolution-of-ai/machine-learning)
- 📝 **Deep Learning & Neural Networks** [View Notes 🚀](https://namaste-ai-dev.vercel.app/notes/season-1/episode-2-the-evolution-of-ai/deep-learning-neural-networks)
- 📝 **Machine Learning vs Deep Learning** [View Notes 🚀](https://namaste-ai-dev.vercel.app/notes/season-1/episode-2-the-evolution-of-ai/machine-learning-vs-deep-learning)
- 📝 **Computer Vision Revolution** [View Notes 🚀](https://namaste-ai-dev.vercel.app/notes/season-1/episode-2-the-evolution-of-ai/computer-vision-revolution)
- 📝 **Natural Language Processing** [View Notes 🚀](https://namaste-ai-dev.vercel.app/notes/season-1/episode-2-the-evolution-of-ai/natural-language-processing)

## 🌱 Structure of this Project

```
Namaste-AI/
│
├── 📁 public/                          # Static assets served at root
│   └── 📁 images/
│       ├── 🖼️ hero-ai.webp             # Hero section background image
│       └── 📁 notes/                   # Handwritten note images (per episode)
│           ├── 📁 s1-e1/               # Season 1 · Episode 01 notes
│           │   └── s1-e1-welcome-to-namaste-ai.webp
│           └── 📁 s1-e2/               # Season 1 · Episode 02 notes
│               ├── s1-e2.1-what-is-artificial-intelligence.webp
│               ├── s1-e2.2-can-machines-think.webp
│               ├── s1-e2.3-rule-based-ai.webp
│               └── s1-e2.4-machine-learning.webp
│
├── 📁 src/                             # Application source code
│   ├── 📁 app/                         # Next.js App Router (pages & layouts)
│   │   ├── 🎨 globals.css              # Global styles, theme tokens, design system
│   │   ├── 🖼️ icon.jpg                 # Favicon / app icon
│   │   ├── 📄 layout.tsx               # Root layout (metadata, fonts, providers)
│   │   └── 📁 notes/
│   │       ├── 📄 page.tsx             # Redirects to default season (/notes)
│   │       └── 📁 [seasonSlug]/        # Season routes (/notes/season-1)
│   │           ├── 📄 page.tsx         # Season overview page
│   │           └── 📁 [episodeSlug]/   # Episode routes (/notes/season-1/episode-1-...)
│   │               ├── 📄 page.tsx     # Episode viewer page
│   │               └── 📁 [pageSlug]/  # Direct page routes (/notes/.../rule-based-ai)
│   │                   └── 📄 page.tsx # Individual note page with custom SEO
│   │
│   ├── 📁 components/                  # Reusable React components
│   │   ├── 📁 home/
│   │   │   └── 🧩 Hero.tsx             # Landing page hero section
│   │   ├── 📁 layout/
│   │   │   ├── 🧩 Header.tsx           # Top navigation bar
│   │   │   ├── 🧩 Navbar.tsx           # Desktop navigation links
│   │   │   ├── 🧩 Sidebar.tsx          # Mobile slide-out menu
│   │   │   └── 🧩 Footer.tsx           # Site footer with social links
│   │   └── 📁 notes/
│   │       ├── 🧩 Notes.tsx            # Main notes page orchestrator
│   │       ├── 🧩 NotesHero.tsx        # Notes page hero / header
│   │       ├── 🧩 SeasonTabs.tsx       # Horizontal scrollable season tabs
│   │       ├── 🧩 SeasonBanner.tsx     # Active season info banner
│   │       ├── 🧩 NotesFilter.tsx      # Search bar + topic filter chips
│   │       ├── 🧩 EpisodeCard.tsx      # Episode card with thumbnail & metadata
│   │       └── 🧩 NotesViewerModal.tsx # Fullscreen notes viewer (zoom, nav, download)
│   │
│   ├── 📁 context/
│   │   └── 🔧 ThemeContext.tsx         # Light / Dark theme provider
│   │
│   └── 📁 data/
│       └── 📋 notesData.ts             # All seasons, episodes & note pages data
│
├── ⚙️ next.config.ts                   # Next.js configuration
├── ⚙️ tsconfig.json                    # TypeScript configuration
├── ⚙️ eslint.config.mjs                # ESLint configuration
├── ⚙️ postcss.config.mjs               # PostCSS / Tailwind CSS config
├── ⚙️ .prettierrc                      # Prettier code formatter config
└── 📦 package.json                     # Dependencies & scripts

```

> 💡 **Note images** are organized by season and episode (`s1-e1/`, `s1-e2/`, ...) so adding new episodes is as simple as dropping images into the right folder and updating `notesData.ts`.

## 🎻 Prerequisites

Before running the application, make sure you have the following installed:

- **Node.js**: `v18.x` or later.
- **Package Manager**: `npm` (v9+), `yarn`, `pnpm`, or `bun`.

## 🔥 Clone this Repository

Follow these steps to set up and run RepoSpark locally:

### 1. Clone the Repo

```bash
git clone https://github.com/chetannada/Namaste-AI.git
```

### 2. Go to the project directory

```bash
cd Namaste-AI
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to start analyzing repositories!

## ✏️ Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

To contribute:

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`). Ensure pre-commit hooks (Husky, Prettier, ESLint) pass successfully.
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

Please follow our coding standards:

- Always use TypeScript (avoid `any`).
- Prefer Server Components; use Client Components only when necessary.
- Keep components modular, reusable, and avoid UI duplication.

## 📄 License

MIT License

## 🤝 Let's Connect

[![linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/chetannada/)
[![twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/chetannada)
[![discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discordapp.com/users/916005177838956555)
