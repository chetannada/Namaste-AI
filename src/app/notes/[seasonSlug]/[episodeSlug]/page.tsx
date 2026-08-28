import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { seasonsData, getEpisodeBySlug, buildEpisodeSlug } from "@/data/notesData";
import Notes from "@/components/notes/Notes";

interface EpisodePageProps {
  params: Promise<{ seasonSlug: string; episodeSlug: string }>;
}

export async function generateStaticParams() {
  return seasonsData.flatMap(season =>
    season.episodes.map(ep => ({
      seasonSlug: season.id,
      episodeSlug: buildEpisodeSlug(ep),
    })),
  );
}

export async function generateMetadata({ params }: EpisodePageProps): Promise<Metadata> {
  const { seasonSlug, episodeSlug } = await params;
  const result = getEpisodeBySlug(seasonSlug, episodeSlug);

  if (!result) {
    return { title: "Episode Not Found — Namaste AI" };
  }

  const { season, episode } = result;
  const epNum = episode.episodeNumber < 10 ? `0${episode.episodeNumber}` : episode.episodeNumber;
  const title = `EP ${epNum}: ${episode.title} — Season ${season.seasonNumber} | Namaste AI Notes`;
  const ogImage = episode.pages[0]?.imageUrl;

  return {
    title,
    description: episode.description,
    alternates: {
      canonical: `/notes/${seasonSlug}/${episodeSlug}`,
    },
    openGraph: {
      title,
      description: episode.description,
      type: "article",
      ...(ogImage && { images: [{ url: ogImage, alt: episode.title }] }),
    },
  };
}

export default async function EpisodePage({ params }: EpisodePageProps) {
  const { seasonSlug, episodeSlug } = await params;
  const result = getEpisodeBySlug(seasonSlug, episodeSlug);

  if (!result) {
    notFound();
  }

  return <Notes initialSeasonSlug={seasonSlug} initialEpisodeSlug={episodeSlug} />;
}
