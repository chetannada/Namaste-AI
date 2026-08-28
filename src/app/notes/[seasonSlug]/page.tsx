import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { seasonsData, getSeasonBySlug } from "@/data/notesData";
import Notes from "@/components/notes/Notes";

interface SeasonPageProps {
  params: Promise<{ seasonSlug: string }>;
}

export async function generateStaticParams() {
  return seasonsData.map(season => ({
    seasonSlug: season.id,
  }));
}

export async function generateMetadata({ params }: SeasonPageProps): Promise<Metadata> {
  const { seasonSlug } = await params;
  const season = getSeasonBySlug(seasonSlug);

  if (!season) {
    return { title: "Season Not Found — Namaste AI" };
  }

  return {
    title: `Season ${season.seasonNumber}: ${season.title} — Namaste AI Notes`,
    description: season.description,
    alternates: {
      canonical: `/notes/${seasonSlug}`,
    },
    openGraph: {
      title: `Season ${season.seasonNumber}: ${season.title} — Namaste AI Notes`,
      description: season.description,
      type: "website",
    },
  };
}

export default async function SeasonPage({ params }: SeasonPageProps) {
  const { seasonSlug } = await params;
  const season = getSeasonBySlug(seasonSlug);

  if (!season) {
    notFound();
  }

  return <Notes initialSeasonSlug={seasonSlug} />;
}
