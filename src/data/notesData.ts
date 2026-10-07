export const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/bcctbhur/image/upload";

export function cdnImage(path: string): string {
  return `${CLOUDINARY_BASE_URL}/${path}`;
}

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
            imageUrl: cdnImage("v1789754264/s1-e1-p1-welcome-to-namaste-ai.webp"),
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
          "Rule Based AI",
          "Machine Learning",
          "Deep Learning",
          "Computer Vision",
          "NLP",
          "Transformers & LLMs",
          "Generative AI",
        ],
        isAvailable: true,
        pages: [
          {
            pageNumber: 1,
            title: "What Is Artificial Intelligence?",
            slug: "what-is-artificial-intelligence",
            imageUrl: cdnImage("v1789756205/s1-e2-p1-what-is-artificial-intelligence.webp"),
            caption:
              "Handwritten introduction to AI, real-world examples, its definition, and how machines learn to recognize patterns like humans.",
          },
          {
            pageNumber: 2,
            title: "The Evolution of Artificial Intelligence",
            slug: "the-evolution-of-artificial-intelligence",
            imageUrl: cdnImage("v1789756205/s1-e2-p2-can-machines-think.webp"),
            caption:
              "Handwritten journey through AI history, from the Turing Test and birth of AI to the AI Winter, Synthetic Intelligence, and Deep Blue defeating Kasparov.",
          },
          {
            pageNumber: 3,
            title: "Rule-Based AI",
            slug: "rule-based-ai",
            imageUrl: cdnImage("v1789756204/s1-e2-p3-rule-based-ai.webp"),
            caption:
              "Handwritten explanation of rule-based AI, where humans define if/else rules and machines follow them to make decisions.",
          },
          {
            pageNumber: 4,
            title: "Machine Learning",
            slug: "machine-learning",
            imageUrl: cdnImage("v1789756205/s1-e2-p4-machine-learning.webp"),
            caption:
              "Handwritten explanation of machine learning, where humans provide examples and training data so machines can learn patterns and make predictions.",
          },
          {
            pageNumber: 5,
            title: "Deep Learning & Neural Networks",
            slug: "deep-learning-neural-networks",
            imageUrl: cdnImage("v1789756207/s1-e2-p5-deep-learning.webp"),
            caption:
              "Handwritten explanation of deep learning, neural networks, real-world applications, and how data, computing power, GPUs, and the internet drove the deep learning revolution.",
          },
          {
            pageNumber: 6,
            title: "Machine Learning vs Deep Learning",
            slug: "machine-learning-vs-deep-learning",
            imageUrl: cdnImage(
              "v1789756205/s1-e2-p6-difference-machine-learning-vs-deep-learning.webp"
            ),
            caption:
              "Handwritten comparison of machine learning and deep learning, covering data requirements, feature engineering, neural networks, workflows, and real-world examples.",
          },
          {
            pageNumber: 7,
            title: "Computer Vision Revolution",
            slug: "computer-vision-revolution",
            imageUrl: cdnImage("v1789756205/s1-e2-p7-computer-vision-revolution.webp"),
            caption:
              "Handwritten explanation of ImageNet and AlexNet, showing how neural networks learned visual patterns and enabled image recognition, self-driving cars, face unlock, X-ray analysis, and product identification.",
          },
          {
            pageNumber: 8,
            title: "Natural Language Processing",
            slug: "natural-language-processing",
            imageUrl: cdnImage("v1789756205/s1-e2-p8-natural-language-processing.webp"),
            caption:
              "Handwritten explanation of natural language processing, why human language is difficult for machines to understand, context and ambiguity in sentences, and NLP approaches including Bag of Words, n-grams, RNNs, and LSTMs.",
          },
          {
            pageNumber: 9,
            title: "Transformers & Large Language Models",
            slug: "transformers-large-language-models",
            imageUrl: cdnImage("v1789756206/s1-e2-p9-transformers-large-language-models.webp"),
            caption:
              "Handwritten explanation of Transformers and Large Language Models, covering the 2017 'Attention Is All You Need' paper, how Transformers understand word relationships and context, and why large AI models require huge datasets, powerful GPUs, computing infrastructure, researchers, and high energy costs.",
          },
          {
            pageNumber: 10,
            title: "Generative AI",
            slug: "generative-ai",
            imageUrl: cdnImage("v1789756206/s1-e2-p10-generative-ai.webp"),
            caption:
              "Handwritten explanation of Generative AI, comparing traditional AI tasks like classification, prediction, and recommendation with AI that creates new content such as poems and images, along with multimodal AI that works with text, images, audio, video, and documents.",
          },
          {
            pageNumber: 11,
            title: "The ChatGPT Moment & AI Today",
            slug: "chatgpt-moment-ai-today",
            imageUrl: cdnImage("v1789756206/s1-e2-p11-chat-gpt-moment-multimodal-ai.webp"),
            caption:
              "Handwritten explanation of the ChatGPT moment in November 2022, the rise of the AI model race, multimodal AI across text, images, audio, video, and documents, and how modern AI can think, plan, use APIs and tools, remember context, search the web, write code, work autonomously, and complete tasks.",
          },
          {
            pageNumber: 12,
            title: "Timeline of AI & The Future of AI",
            slug: "timeline-of-ai-future",
            imageUrl: cdnImage("v1789756206/s1-e2-p12-timeline-of-ai.webp"),
            caption:
              "Handwritten timeline of AI from Alan Turing and the birth of Artificial Intelligence through rule-based AI, machine learning, deep learning, AlexNet, AlphaGo, Transformers, and ChatGPT, followed by Agentic AI and key industry trends including multimodal AI, multi-agent orchestration, reasoning models, RAG, MCP, and robotics.",
          },
        ],
      },
      {
        id: "s1-ep3",
        episodeNumber: 3,
        title: "Does ChatGPT know or Does it Guess?",
        slug: "does-chatgpt-know-or-does-it-guess",
        description:
          "Understand how ChatGPT generates answers and whether it truly knows or simply predicts what comes next",
        topics: [
          "ChatGPT",
          "Search Engines vs LLMs",
          "How LLMs Generate Responses",
          "Knowledge Cutoff",
          "Base Model vs AI Assistant",
          "Inference vs Training",
          "AI Hallucinations",
          "Tools & Web Search",
          "RAG",
        ],
        isAvailable: true,
        pages: [
          {
            pageNumber: 1,
            title: "Google Search vs ChatGPT",
            slug: "google-search-vs-chatgpt",
            imageUrl: cdnImage("v1789756825/s1-e3-p1-google-search-vs-chatgpt.webp"),
            caption:
              "Handwritten comparison of Google Search and ChatGPT, explaining how search engines retrieve existing information while ChatGPT generates responses using model knowledge, context, and available tools, along with the risk of AI hallucinations when a question contains false or unsupported information.",
          },
          {
            pageNumber: 2,
            title: "Search Engines vs LLMs",
            slug: "search-engines-vs-llms",
            imageUrl: cdnImage("v1789756825/s1-e3-p2-search-engines-vs-llms.webp"),
            caption:
              "Handwritten comparison of search engines and Large Language Models (LLMs), explaining how search engines retrieve relevant information from indexed sources while LLMs generate responses by using learned patterns to predict and produce text.",
          },
          {
            pageNumber: 3,
            title: "How Search Engines Discover New Pages",
            slug: "how-search-engines-discover-new-pages",
            imageUrl: cdnImage("v1789756825/s1-e3-p3-how-search-engines-discover-new-pages.webp"),
            caption:
              "Handwritten explanation of how search engines discover and index new web pages, covering how crawlers find content, search engines organize information in their index, and how indexed pages can later appear in search results.",
          },
          {
            pageNumber: 4,
            title: "How LLMs Generate Responses",
            slug: "how-llms-generate-responses",
            imageUrl: cdnImage("v1789756825/s1-e3-p4-how-llms-generate-responses.webp"),
            caption:
              "Handwritten explanation of how Large Language Models generate responses by predicting the next word, using patterns learned from large amounts of training data to understand context and produce relevant text.",
          },
          {
            pageNumber: 5,
            title: "LLM Knowledge & Knowledge Cutoff",
            slug: "llm-knowledge-and-knowledge-cutoff",
            imageUrl: cdnImage("v1789756825/s1-e3-p5-llm-knowledge-and-knowledge-cutoff.webp"),
            caption:
              "Handwritten explanation of what knowledge an LLM contains, how training adjusts billions of parameters to learn patterns and predict tokens, why an LLM does not store webpages directly, and what a knowledge cutoff means, including why models do not automatically learn new information.",
          },
          {
            pageNumber: 6,
            title: "Base Model vs AI Assistant",
            slug: "base-model-vs-ai-assistant",
            imageUrl: cdnImage("v1789756825/s1-e3-p6-base-model-vs-ai-assistant.webp"),
            caption:
              "Handwritten comparison of base language models and AI assistants, explaining how base models predict the next token while assistants such as ChatGPT, Claude, and Gemini combine language models with instructions, training, interfaces, tools, safety, and context to understand requests and perform tasks.",
          },
          {
            pageNumber: 7,
            title: "What Gets Added on Top of the Base Model",
            slug: "what-gets-added-on-top-of-base-model",
            imageUrl: cdnImage(
              "v1789756826/s1-e3-p7-what-gets-added-on-top-of-the-base-model.webp"
            ),
            caption:
              "Handwritten explanation of the capabilities and controls added on top of a base language model, including web search, files, instruction tuning, human feedback, memory, safety training, retrieval, tools, system instructions, content filters, conversation management, guardrails, and security.",
          },
          {
            pageNumber: 8,
            title: "Inference vs Training",
            slug: "inference-vs-training",
            imageUrl: cdnImage("v1789756826/s1-e3-p8-inference-vs-training.webp"),
            caption:
              "Handwritten explanation of training and inference in AI, showing how models learn from large amounts of data by making predictions and adjusting weights during training, while inference is the process of using a trained model to process a prompt and generate an output, with a real-world driving example.",
          },
          {
            pageNumber: 9,
            title: "Why AI Models Produce Confidently Wrong Answers",
            slug: "why-models-confidently-produce-wrong-answers",
            imageUrl: cdnImage(
              "v1789756826/s1-e3-p9-why-models-confidently-produce-wrong-answers.webp"
            ),
            caption:
              "Handwritten explanation of AI hallucinations and why fluent, confident language does not guarantee truth, showing how models can generate incorrect, unsupported, or misleading information and why important AI-generated claims should be verified against reliable evidence.",
          },
          {
            pageNumber: 10,
            title: "Why Do Hallucinations Happen?",
            slug: "why-do-hallucinations-happen",
            imageUrl: cdnImage("v1789756826/s1-e3-p10-why-do-hallucinations-happen.webp"),
            caption:
              "Handwritten explanation of why AI hallucinations happen, covering insufficient or ambiguous information, outdated knowledge, false assumptions, unreliable patterns in training data, the model's tendency to generate helpful answers, and probabilistic text generation that can produce plausible but incorrect information.",
          },
          {
            pageNumber: 11,
            title: "Types of AI Hallucinations",
            slug: "types-of-ai-hallucinations",
            imageUrl: cdnImage("v1789756826/s1-e3-p11-types-of-hallucinations.webp"),
            caption:
              "Handwritten explanation of common types of AI hallucinations, including invented facts, fabricated citations, incorrect combinations of information, outdated facts, false precision, and broken reasoning where a response may sound convincing but contain factual or logical errors.",
          },
          {
            pageNumber: 12,
            title: 'Why Do Models Sometimes Say "I Don\'t Know"?',
            slug: "why-do-models-sometimes-say-i-dont-know",
            imageUrl: cdnImage(
              "v1789756827/s1-e3-p12-why-do-models-sometimes-say-i-don-t-know.webp"
            ),
            caption:
              'Handwritten explanation of why AI assistants may say "I don\'t know" or refuse to answer, covering assistant training, system instructions, weak learned patterns, safety rules, tool requirements for current or external information, and how prompt wording can affect the response.',
          },
          {
            pageNumber: 13,
            title: "The Confidence Illusion & Reducing Hallucinations",
            slug: "confidence-illusion-reducing-hallucinations",
            imageUrl: cdnImage("v1789961330/s1-e3-p13-the-confidence-illusion.webp"),
            caption:
              "Handwritten explanation of the confidence illusion in AI, showing why confident and professional language does not guarantee truth, along with practical ways to reduce hallucinations by separating facts from assumptions, asking for uncertainty, requesting reliable sources, and using web search to verify current information.",
          },
          {
            pageNumber: 14,
            title: "Base Model Without Tools",
            slug: "base-model-without-tools",
            imageUrl: cdnImage("v1789961331/s1-e3-p14-base-model-without-tools.webp"),
            caption:
              "Handwritten explanation of how a base model processes prompts using learned patterns to generate text, why some questions require external tools for current or precise information, and how tools such as web search, calculators, code execution, weather, location, calendars, email, databases, internal documents, files, and APIs extend AI capabilities.",
          },
          {
            pageNumber: 15,
            title: "Web Search + LLMs",
            slug: "web-search-llms",
            imageUrl: cdnImage("v1789961331/s1-e3-p15-web-search-llms.webp"),
            caption:
              "Handwritten explanation of how web search provides retrieval of relevant external information while an LLM generates a useful response from the retrieved evidence, showing how search and language generation work together to provide clearer and more up-to-date answers.",
          },
          {
            pageNumber: 16,
            title: "What Is RAG?",
            slug: "what-is-rag",
            imageUrl: cdnImage("v1789961331/s1-e3-p16-what-is-rag.webp"),
            caption:
              "Handwritten explanation of Retrieval-Augmented Generation (RAG), showing how relevant information is retrieved and added to the model's context before generating an answer, with an airline chatbot example and why retrieval tools can reduce limitations without guaranteeing perfect answers.",
          },
          {
            pageNumber: 17,
            title: "Does the Model Know Itself?",
            slug: "does-the-model-know-itself",
            imageUrl: cdnImage("v1789961331/s1-e3-p17-does-the-model-know-itself.webp"),
            caption:
              "Handwritten explanation of how an AI model's knowledge about itself can come from training, conversation context, system instructions, and tools, and why it may not have complete knowledge of its exact version, parameters, or runtime environment.",
          },
        ],
      },
      {
        id: "s1-ep4",
        episodeNumber: 4,
        title: "The Secret Language of LLMs",
        slug: "the-secret-language-of-llms",
        description:
          "Discover how Large Language Models represent, process, and understand language behind the scenes.",
        topics: ["Tokens", "Embeddings", "Attention", "Context Window"],
        isAvailable: true,
        pages: [
          {
            pageNumber: 1,
            title: "Computers Cannot Understand Words Like Humans",
            slug: "computers-cannot-understand-words-like-humans",
            imageUrl: cdnImage(
              "v1790180974/s1-e4-p1-computers-cannot-understand-words-like-humans.webp"
            ),
            caption:
              "Handwritten explanation of how LLMs process text through tokenization, token IDs, and numerical representations, showing how text is broken into smaller tokens before a neural network repeatedly predicts the next token to generate a response.",
          },
          {
            pageNumber: 2,
            title: "What Is a Token and Tokenizer?",
            slug: "what-is-a-token-and-tokenizer",
            imageUrl: cdnImage("v1790520542/s1-e4-p2-what-is-a-token-and-tokenizer.webp"),
            caption:
              "Handwritten explanation of tokens and tokenizers, showing how text is split into smaller pieces, how each token is assigned a token ID, and how tokenizers encode text into model input and decode token IDs back into text, with examples and a LEGO-piece analogy.",
          },
          {
            pageNumber: 3,
            title: "Words vs Characters vs Tokens",
            slug: "words-vs-characters-vs-tokens",
            imageUrl: cdnImage("v1790520542/s1-e4-p3-words-vs-characters-vs-tokens.webp"),
            caption:
              "Handwritten explanation comparing words, characters, and tokens, showing why one word can become multiple tokens, how each token is represented by a token ID, and why token counts can differ across AI models because different models may use different tokenizers.",
          },
          {
            pageNumber: 4,
            title: "Why Do Models Use Subword Tokenization?",
            slug: "why-do-models-use-subword-tokenization",
            imageUrl: cdnImage("v1790520545/s1-e4-p4-why-do-models-use-subword-tokenization.webp"),
            caption:
              'Handwritten explanation of whole-word, character, and subword tokenization, showing why subwords provide a balance between vocabulary size and sequence length by breaking words into reusable pieces such as "un", "trust", and "able".',
          },
          {
            pageNumber: 5,
            title: "Why Does Every LLM Have Its Own Vocabulary?",
            slug: "why-does-every-llm-have-its-own-vocabulary",
            imageUrl: cdnImage(
              "v1790704028/s1-e4-p5-why-does-every-llm-have-its-own-vocabulary.webp"
            ),
            caption:
              "Handwritten explanation of tokenizer vocabulary, showing how tokens and token IDs work together to convert text into numerical sequences, why each tokenizer has its own vocabulary, and how different AI models can split the same word into different tokens.",
          },
          {
            pageNumber: 6,
            title: "What Is Byte Pair Encoding (BPE)?",
            slug: "what-is-byte-pair-encoding",
            imageUrl: cdnImage("v1790704026/s1-e4-p6-what-is-byte-pair-encoding.webp"),
            caption:
              'Handwritten explanation of Byte Pair Encoding (BPE), showing how tokenizers repeatedly merge frequently occurring neighboring pieces to create reusable vocabulary tokens, with examples such as "low", "lower", and "lowest", and how common subword pieces can be reused across different words.',
          },
          {
            pageNumber: 7,
            title: "BPE vs WordPiece vs Unigram",
            slug: "bpe-vs-wordpiece-vs-unigram",
            imageUrl: cdnImage("v1790959523/s1-e4-p7-bpe-vs-word-piece-vs-unigram.webp"),
            caption:
              "Handwritten comparison of BPE, WordPiece, and Unigram tokenization, explaining how BPE merges frequent neighboring pieces, WordPiece selects useful vocabulary pieces, and Unigram starts with many possible pieces and removes less useful ones, with easy real-world analogies.",
          },
          {
            pageNumber: 8,
            title: "Token Boundaries Are Not Meaning Boundaries",
            slug: "token-boundaries-not-meaning-boundaries",
            imageUrl: cdnImage(
              "v1790959523/s1-e4-p8-what-does-token-boundaries-are-not-meaning-boundaries.webp"
            ),
            caption:
              "Handwritten explanation of why token boundaries do not represent meaning boundaries, showing how sentences with similar character counts can produce different token counts depending on vocabulary patterns, familiarity, and how efficiently the tokenizer can represent the text.",
          },
          {
            pageNumber: 9,
            title: "English vs Other Languages",
            slug: "english-vs-other-languages",
            imageUrl: cdnImage("v1790976709/s1-e4-p9-english-vs-other-languages.webp"),
            caption:
              "Handwritten comparison of English, Hindi, Hinglish, and mixed-script text, showing how sentences with similar meanings can require different numbers of tokens because tokenizers process character sequences and vocabulary pieces differently.",
          },
          {
            pageNumber: 10,
            title: "Hinglish & Tokenization Fertility",
            slug: "hinglish-tokenization-fertility",
            imageUrl: cdnImage("v1790976709/s1-e4-p10-why-is-hinglish-especially-interesting.webp"),
            caption:
              "Handwritten explanation of why Hinglish can tokenize differently due to mixed English vocabulary, Hindi grammar, Roman script, informal spellings, and local expressions, along with how humans understand meaning differently from tokenizers and how tokenization fertility measures the number of tokens used to represent text.",
          },
          {
            pageNumber: 11,
            title: "How LLMs Tokenize Emojis & Special Characters",
            slug: "llm-tokenization-emojis-special-characters",
            imageUrl: cdnImage("v1790976709/s1-e4-p11-how-does-an-llm-handle-emojis.webp"),
            caption:
              "Handwritten explanation of how tokenizers represent emojis, whitespace, capital letters, punctuation, and other special characters, showing why one emoji or character does not necessarily equal one token and how small changes in text can produce different token sequences and token IDs.",
          },
          {
            pageNumber: 12,
            title: "How Does an LLM Process Code?",
            slug: "how-does-llms-process-code",
            imageUrl: cdnImage("v1790976710/s1-e4-p12-how-does-an-llm-process-code.webp"),
            caption:
              "Handwritten explanation of how LLMs process code by tokenizing programming syntax into tokens and token IDs, showing how whitespace, indentation, punctuation, and formatting can change tokenization, and how the full model input can include system instructions, context, messages, and tool results.",
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
