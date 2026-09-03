export interface NotePage {
  pageNumber: number;
  title: string;
  slug: string;
  imageUrl: string;
  caption?: string;
}

export interface Episode {
  id: string;
  episodeNumber: number;
  title: string;
  slug: string;
  description: string;
  topics: string[];
  pages: NotePage[];
  isAvailable: boolean;
}

export interface Season {
  id: string;
  seasonNumber: number;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  status: "available" | "in-progress" | "coming-soon";
  episodes: Episode[];
}

// --- Slug & Lookup Helpers ---

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function buildEpisodeSlug(episode: Episode): string {
  return `episode-${episode.episodeNumber}-${episode.slug}`;
}

export function buildPageSlug(page: NotePage): string {
  return page.slug;
}

export function getSeasonBySlug(seasonSlug: string): Season | undefined {
  return seasonsData.find(s => s.id === seasonSlug);
}

export function getEpisodeBySlug(
  seasonSlug: string,
  episodeSlug: string
): { season: Season; episode: Episode } | undefined {
  const season = getSeasonBySlug(seasonSlug);
  if (!season) return undefined;

  const episode = season.episodes.find(ep => buildEpisodeSlug(ep) === episodeSlug);
  if (!episode) return undefined;

  return { season, episode };
}

export function getPageBySlug(
  seasonSlug: string,
  episodeSlug: string,
  pageSlug: string
): { season: Season; episode: Episode; page: NotePage; pageIndex: number } | undefined {
  const result = getEpisodeBySlug(seasonSlug, episodeSlug);
  if (!result) return undefined;

  const { season, episode } = result;
  const pageIndex = episode.pages.findIndex(p => buildPageSlug(p) === pageSlug);
  if (pageIndex === -1) return undefined;

  return { season, episode, page: episode.pages[pageIndex], pageIndex };
}

export function getPageUrl(seasonId: string, episode: Episode, page: NotePage): string {
  return `/notes/${seasonId}/${buildEpisodeSlug(episode)}/${buildPageSlug(page)}`;
}

export function getEpisodeUrl(seasonId: string, episode: Episode, page?: NotePage): string {
  const targetPage = page || episode.pages[0];
  if (targetPage) {
    return getPageUrl(seasonId, episode, targetPage);
  }
  return `/notes/${seasonId}/${buildEpisodeSlug(episode)}`;
}

export function getSeasonUrl(seasonId: string): string {
  return `/notes/${seasonId}`;
}

// --- Data ---

export const seasonsData: Season[] = [
  {
    id: "season-1",
    seasonNumber: 1,
    title: "Inside the Mind of AI",
    subtitle: "Foundations of Artificial Intelligence & LLMs",
    description:
      "Understand how modern AI models think, the mathematics behind neural networks, transformers architecture, self-attention, and prompt engineering fundamentals.",
    tag: "Core Foundations",
    status: "available",
    episodes: [
      {
        id: "s1-ep1",
        episodeNumber: 1,
        title: "Welcome to Namaste AI",
        slug: "welcome-to-namaste-ai",
        description:
          "Begin your Namaste AI journey and explore what AI is, how it works, and what you'll learn throughout the course.",
        topics: ["AI Overview", "Course Roadmap", "AI Stack"],
        isAvailable: true,
        pages: [
          {
            pageNumber: 1,
            title: "Roadmap about Namaste AI Course",
            slug: "roadmap-about-namaste-ai-course",
            imageUrl: "/images/notes/s1-e1/s1-e1-welcome-to-namaste-ai.webp",
            caption:
              "Course roadmap, prerequisites, learning approach, assignments, community, and practical project-building journey.",
          },
        ],
      },
      {
        id: "s1-ep2",
        episodeNumber: 2,
        title: "The Evolution of AI",
        slug: "the-evolution-of-ai",
        description:
          "Explore the evolution of Artificial Intelligence and the breakthroughs that shaped modern AI systems.",
        topics: [
          "History of AI",
          "Symbolic AI",
          "Rule Based AI",
          "Machine Learning",
          "Deep Learning",
        ],
        isAvailable: true,
        pages: [
          {
            pageNumber: 1,
            title: "What Is Artificial Intelligence?",
            slug: "what-is-artificial-intelligence",
            imageUrl: "/images/notes/s1-e2/s1-e2.1-what-is-artificial-intelligence.webp",
            caption:
              "Handwritten introduction to AI, real-world examples, its definition, and how machines learn to recognize patterns like humans.",
          },
          {
            pageNumber: 2,
            title: "The Evolution of Artificial Intelligence",
            slug: "the-evolution-of-artificial-intelligence",
            imageUrl: "/images/notes/s1-e2/s1-e2.2-can-machines-think.webp",
            caption:
              "Handwritten journey through AI history, from the Turing Test and birth of AI to the AI Winter, Synthetic Intelligence, and Deep Blue defeating Kasparov.",
          },
          {
            pageNumber: 3,
            title: "Rule-Based AI",
            slug: "rule-based-ai",
            imageUrl: "/images/notes/s1-e2/s1-e2.3-rule-based-ai.webp",
            caption:
              "Handwritten explanation of rule-based AI, where humans define if/else rules and machines follow them to make decisions.",
          },
          {
            pageNumber: 4,
            title: "Machine Learning",
            slug: "machine-learning",
            imageUrl: "/images/notes/s1-e2/s1-e2.4-machine-learning.webp",
            caption:
              "Handwritten explanation of machine learning, where humans provide examples and training data so machines can learn patterns and make predictions.",
          },
          {
            pageNumber: 5,
            title: "Deep Learning & Neural Networks",
            slug: "deep-learning-neural-networks",
            imageUrl: "/images/notes/s1-e2/s1-e2.5-deep-learning.webp",
            caption:
              "Handwritten explanation of deep learning, neural networks, real-world applications, and how data, computing power, GPUs, and the internet drove the deep learning revolution.",
          },
          {
            pageNumber: 6,
            title: "Machine Learning vs Deep Learning",
            slug: "machine-learning-vs-deep-learning",
            imageUrl:
              "/images/notes/s1-e2/s1-e2.6-difference-machine-learning-vs-deep-learning.webp",
            caption:
              "Handwritten comparison of machine learning and deep learning, covering data requirements, feature engineering, neural networks, workflows, and real-world examples.",
          },
          {
            pageNumber: 7,
            title: "Computer Vision Revolution",
            slug: "computer-vision-revolution",
            imageUrl: "/images/notes/s1-e2/s1-e2.7-computer-vision-revolution.webp",
            caption:
              "Handwritten explanation of ImageNet and AlexNet, showing how neural networks learned visual patterns and enabled image recognition, self-driving cars, face unlock, X-ray analysis, and product identification.",
          },
          {
            pageNumber: 8,
            title: "Natural Language Processing",
            slug: "natural-language-processing",
            imageUrl: "/images/notes/s1-e2/s1-e2.8-natural-language-processing.webp",
            caption:
              "Handwritten explanation of natural language processing, why human language is difficult for machines to understand, context and ambiguity in sentences, and NLP approaches including Bag of Words, n-grams, RNNs, and LSTMs.",
          },
          {
            pageNumber: 9,
            title: "Transformers & Large Language Models",
            slug: "transformers-large-language-models",
            imageUrl: "/images/notes/s1-e2/s1-e2.9-transformers-large-language-models.webp",
            caption:
              "Handwritten explanation of Transformers and Large Language Models, covering the 2017 'Attention Is All You Need' paper, how Transformers understand word relationships and context, and why large AI models require huge datasets, powerful GPUs, computing infrastructure, researchers, and high energy costs.",
          },
        ],
      },
    ],
  },
  {
    id: "season-2",
    seasonNumber: 2,
    title: "AI Native Software Engineer",
    subtitle: "Becoming an AI-Native Developer",
    description:
      "Learn how AI is transforming software development and discover the tools, workflows, and practices that help developers become AI-native engineers.",
    tag: "AI-Native Development",
    status: "coming-soon",
    episodes: [],
  },
  {
    id: "season-3",
    seasonNumber: 3,
    title: "Building AI Applications",
    subtitle: "From LLM APIs to AI-Powered Applications",
    description:
      "Learn how to use LLM APIs and modern AI capabilities to build practical AI-powered applications, integrate models into software, and turn AI concepts into real products.",
    tag: "AI Application Development",
    status: "coming-soon",
    episodes: [],
  },
  {
    id: "season-4",
    seasonNumber: 4,
    title: "Giving AI Knowledge (RAG)",
    subtitle: "Connecting AI with Your Own Knowledge",
    description:
      "Understand how Retrieval-Augmented Generation gives AI access to external and private knowledge, and learn how to build applications that can retrieve and use relevant information.",
    tag: "Retrieval-Augmented Generation",
    status: "coming-soon",
    episodes: [],
  },
  {
    id: "season-5",
    seasonNumber: 5,
    title: "From Chatbots To Agents",
    subtitle: "Building Intelligent AI Agents",
    description:
      "Explore the evolution from simple chatbots to intelligent AI agents that can reason, use tools, access context, perform tasks, and work together to solve complex problems.",
    tag: "AI Agents",
    status: "coming-soon",
    episodes: [],
  },
];
