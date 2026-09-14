import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono, Audiowide } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const audiowide = Audiowide({
  weight: "400",
  variable: "--font-audiowide",
  subsets: ["latin"],
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;
const SITE_NAME = "Namaste AI";
const SITE_DESCRIPTION =
  "Namaste AI — Free handwritten notes and study material covering AI concepts from the Namaste AI course. Explore the history of AI, neural networks, deep learning, transformers, LLMs, prompt engineering, RAG, AI agents, and more. An open-source learning resource by Chetan Nada.";

export const metadata: Metadata = {
  title: {
    default: "Namaste AI — Learn AI Concepts & Build Real-World AI Projects",
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "namaste ai",
    "namaste ai course",
    "namaste ai notes",
    "namaste ai handwritten notes",
    "namaste ai by akshay saini",
    "namastedev",
    "namastedev ai",
    "akshay saini ai course",
    "namaste ai season 1",
    "namaste ai episode notes",
    "ai course notes",
    "ai course by akshay saini",
    "free ai notes",
    "artificial intelligence",
    "machine learning",
    "deep learning",
    "neural networks",
    "generative ai",
    "gen ai",
    "large language models",
    "llm",
    "gpt",
    "chatgpt",
    "openai",
    "gemini ai",
    "claude ai",
    "llama",
    "open source llm",
    "prompt engineering",
    "fine tuning llm",
    "rag",
    "retrieval augmented generation",
    "vector database",
    "embeddings",
    "transformers",
    "attention mechanism",
    "ai agents",
    "agentic ai",
    "mcp",
    "model context protocol",
    "ai tools",
    "langchain",
    "ai applications",
    "ai projects",
    "ai powered apps",
    "build with ai",
    "learn ai",
    "ai tutorial",
    "ai notes",
    "ai handwritten notes",
    "handwritten ai notes",
    "ai engineering",
    "ai native",
    "software engineering",
    "history of ai",
    "evolution of ai",
    "rule based ai",
    "neural networks explained",
    "computer vision",
    "nlp",
    "natural language processing",
    "attention is all you need",
    "next token prediction",
    "ai hallucinations",
    "search engines vs llms",
    "how chatgpt works",
    "does chatgpt guess",
    "google search vs chatgpt",
    "how llms generate responses",
    "deep learning vs machine learning",
    "imagenet alexnet",
    "rnn lstm",
    "bag of words",
    "ai timeline",
    "alan turing ai",
    "alphago",
    "multimodal ai",
    "ai native software engineer",
    "building ai applications",
    "chatbots to agents",
    "giving ai knowledge",
    "rag tutorial",
    "retrieval augmented generation tutorial",
    "vector database tutorial",
    "ai knowledge base",
    "ai agent tutorial",
    "multi agent orchestration",
    "agentic ai tutorial",
    "mcp tutorial",
    "model context protocol tutorial",
    "learn ai from scratch",
    "ai for beginners",
  ],
  authors: [{ name: "Chetan Nada", url: "https://www.linkedin.com/in/chetannada/" }],
  creator: "Chetan Nada",
  publisher: "Chetan Nada",
  openGraph: {
    title: "Namaste AI — Learn AI Concepts & Build Real-World AI Projects",
    description: SITE_DESCRIPTION,
    url: BASE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/hero-ai.webp",
        width: 1200,
        height: 630,
        alt: "Namaste AI — Learn AI from concepts to real projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Namaste AI — Learn AI Concepts & Build Real-World AI Projects",
    description: SITE_DESCRIPTION,
    creator: "@chetannada",
    images: ["/images/hero-ai.webp"],
  },

  generator: "Next.js",
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "ba0nbpoJTwd43GMnWoqslECLZ68I8E1Ah_GZ-hMi_aM",
  },
};

const jsonLdWebsite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: BASE_URL,
  description: SITE_DESCRIPTION,
  inLanguage: "en-US",
  author: {
    "@type": "Person",
    name: "Chetan Nada",
    url: "https://www.linkedin.com/in/chetannada",
    sameAs: [
      "https://x.com/chetannada",
      "https://github.com/chetannada",
      "https://www.linkedin.com/in/chetannada",
    ],
  },
  publisher: {
    "@type": "Person",
    name: "Chetan Nada",
  },
};

const jsonLdLearningResource = {
  "@context": "https://schema.org",
  "@type": "LearningResource",
  name: "Namaste AI — Handwritten Notes & Study Material",
  description:
    "Free, open-source handwritten notes and study material covering AI concepts from the Namaste AI course — created by Chetan Nada as a community learning resource.",
  url: BASE_URL,
  inLanguage: "en-US",
  learningResourceType: "handwritten notes",
  educationalLevel: "Beginner to Intermediate",
  teaches: [
    "Artificial Intelligence",
    "Machine Learning",
    "Deep Learning",
    "Neural Networks",
    "Transformers",
    "Large Language Models",
    "Prompt Engineering",
    "Retrieval-Augmented Generation",
    "AI Agents",
    "Generative AI",
  ],
  author: {
    "@type": "Person",
    name: "Chetan Nada",
    url: "https://www.linkedin.com/in/chetannada",
  },
  isAccessibleForFree: true,
  license: "https://opensource.org/licenses/MIT",
};

const jsonLdBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: BASE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Notes",
      item: `${BASE_URL}/notes`,
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${audiowide.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-body text-text">
        <Script
          id="json-ld-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
        <Script
          id="json-ld-learning-resource"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdLearningResource) }}
        />
        <Script
          id="json-ld-breadcrumb"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
        />
        <ThemeProvider>
          <Header />
          <main className="grow flex flex-col">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
