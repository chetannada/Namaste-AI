import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  seasonsData,
  getPageBySlug,
  buildEpisodeSlug,
  buildPageSlug,
} from "@/data/notesData";
import Notes from "@/components/notes/Notes";

interface PageRouteProps {
  params: Promise<{
    seasonSlug: string;
    episodeSlug: string;
    pageSlug: string;
  }>;
}

export async function generateStaticParams() {
  return seasonsData.flatMap(season =>
    season.episodes.flatMap(ep =>
      ep.pages.map(page => ({
        seasonSlug: season.id,
        episodeSlug: buildEpisodeSlug(ep),
        pageSlug: buildPageSlug(page),
      })),
    ),
  );
}

export async function generateMetadata({ params }: PageRouteProps): Promise<Metadata> {
  const { seasonSlug, episodeSlug, pageSlug } = await params;
  const result = getPageBySlug(seasonSlug, episodeSlug, pageSlug);

  if (!result) {
    return { title: "Note Page Not Found — Namaste AI" };
  }

  const { season, episode, page } = result;
  const epNum = episode.episodeNumber < 10 ? `0${episode.episodeNumber}` : episode.episodeNumber;
  const title = `Page ${page.pageNumber}: ${page.title} — EP ${epNum}: ${episode.title} (Season ${season.seasonNumber}) | Namaste AI Notes`;
  const description = page.caption || episode.description;
  const ogImage = page.imageUrl;

  return {
    title,
    description,
    alternates: {
      canonical: `/notes/${seasonSlug}/${episodeSlug}/${pageSlug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      images: [{ url: ogImage, alt: page.title }],
    },
  };
}

export default async function NotePageRoute({ params }: PageRouteProps) {
  const { seasonSlug, episodeSlug, pageSlug } = await params;
  const result = getPageBySlug(seasonSlug, episodeSlug, pageSlug);

  if (!result) {
    notFound();
  }

  return (
    <Notes
      initialSeasonSlug={seasonSlug}
      initialEpisodeSlug={episodeSlug}
      initialPageSlug={pageSlug}
    />
  );
}
