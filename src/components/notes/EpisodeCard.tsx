"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Episode, getEpisodeUrl } from "@/data/notesData";
import { FiBookOpen, FiClock, FiEye, FiLock, FiArrowRight } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";

interface EpisodeCardProps {
  episode: Episode;
  seasonNumber: number;
  seasonSlug: string;
  onOpenEpisode: (episode: Episode) => void;
  index: number;
}

export const EpisodeCard = ({
  episode,
  seasonNumber,
  seasonSlug,
  onOpenEpisode,
  index,
}: EpisodeCardProps) => {
  const isAvailable = episode.isAvailable && episode.pages.length > 0;
  const thumbnail =
    episode.pages[0]?.imageUrl || "/images/notes/s1-e1/s1-e1-welcome-to-namaste-ai.webp";
  const readDuration = episode.pages.length <= 1 ? 4 : 4 + (episode.pages.length - 1) * 3;
  const episodeUrl = getEpisodeUrl(seasonSlug, episode);

  const handleCardClick = (e: React.MouseEvent) => {
    if (isAvailable) {
      e.preventDefault();
      onOpenEpisode(episode);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isAvailable && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onOpenEpisode(episode);
    }
  };

  const cardClasses = `
    group relative flex h-full flex-col overflow-hidden rounded-3xl border p-3.5 sm:p-4 transition-all duration-300
    ${
      isAvailable
        ? "cursor-pointer border-border bg-surface/75 backdrop-blur-md hover:border-primary/60 hover:bg-surface hover:shadow-2xl hover:shadow-primary/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        : "cursor-default border-border/60 bg-surface/40 opacity-75 backdrop-blur-xs"
    }
  `;

  const cardContent = (
    <>
      {isAvailable && (
        <div className="pointer-events-none absolute -inset-px rounded-3xl bg-linear-to-b from-primary/15 via-transparent to-accent/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      )}

      <div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl border border-border/80 bg-body">
        <Image
          src={thumbnail}
          alt={`Handwritten notes for Season ${seasonNumber} Episode ${episode.episodeNumber}: ${episode.title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover object-top transition-transform duration-500 ease-out transform-gpu group-hover:scale-106 ${
            !isAvailable ? "grayscale opacity-35" : ""
          }`}
        />

        <div className="absolute inset-0 bg-linear-to-t from-body/70 via-body/20 to-transparent pointer-events-none" />

        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2 z-10">
          <span className="inline-flex items-center gap-1 rounded-xl bg-body/90 px-2.5 py-1 text-xs font-bold text-primary backdrop-blur-md border border-primary/25 shadow-md">
            <span className="font-mono">
              EP {episode.episodeNumber < 10 ? `0${episode.episodeNumber}` : episode.episodeNumber}
            </span>
          </span>

          <span className="inline-flex items-center gap-1.5 rounded-xl bg-body/90 px-2.5 py-1 text-xs font-medium text-text-muted backdrop-blur-md border border-border/80 shadow-xs">
            <FiClock size={12} className="text-primary" />
            {readDuration} min read
          </span>
        </div>

        {isAvailable ? (
          <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-black/40">
            <span className="inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-primary via-secondary to-accent px-4 py-2 sm:px-5 sm:py-2.5 text-xs font-bold text-black shadow-xl shadow-primary/40 transform transition-transform duration-300 group-hover:scale-105">
              <FiEye size={15} />
              View Handwritten Notes
            </span>
          </div>
        ) : (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-1.5 bg-black/60 text-text-muted">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-border bg-surface text-text-muted shadow-md">
              <FiLock size={18} />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Coming Soon
            </span>
          </div>
        )}

        {isAvailable && (
          <div className="absolute bottom-2.5 left-2.5 z-10">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-body/90 px-2.5 py-1 text-[11px] font-semibold text-text backdrop-blur-md border border-border/80 shadow-xs">
              <FiBookOpen size={12} className="text-secondary" />
              {episode.pages.length} {episode.pages.length === 1 ? "Page" : "Pages"} of Notes
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between px-1.5 pt-4 pb-1">
        <div>
          <h3
            className={`text-lg font-bold tracking-tight transition-colors duration-200 ${
              isAvailable ? "text-text group-hover:text-primary" : "text-text-muted"
            }`}
          >
            {episode.title}
          </h3>

          <p className="mt-2 text-xs leading-relaxed text-text-muted line-clamp-2">
            {episode.description}
          </p>

          <div className="mt-3.5 flex flex-wrap gap-1.5">
            {episode.topics.map(topic => (
              <span
                key={topic}
                className="rounded-lg bg-surface-hover/80 px-2 py-0.5 text-[11px] font-medium text-text-muted border border-border/50 group-hover:border-primary/20 transition-colors"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-border/80 pt-3.5">
          <span className="text-xs text-text-muted font-medium">
            Season {seasonNumber} · Episode {episode.episodeNumber}
          </span>

          {isAvailable ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary transition-all duration-200 group-hover:text-accent">
              <HiOutlineSparkles size={14} className="text-accent" />
              View Notes
              <FiArrowRight
                size={13}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
          ) : (
            <span className="text-xs font-semibold text-text-muted/60">In Production</span>
          )}
        </div>
      </div>
    </>
  );

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={isAvailable ? { y: -6 } : undefined}
      transition={{
        delay: index * 0.08,
        duration: 0.45,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      }}
    >
      {isAvailable ? (
        <Link
          href={episodeUrl}
          onClick={handleCardClick}
          onKeyDown={handleKeyDown}
          aria-label={`View notes for Season ${seasonNumber} Episode ${episode.episodeNumber}: ${episode.title}`}
          className={cardClasses}
        >
          {cardContent}
        </Link>
      ) : (
        <div
          aria-label={`Season ${seasonNumber} Episode ${episode.episodeNumber} Coming Soon`}
          className={cardClasses}
        >
          {cardContent}
        </div>
      )}
    </motion.div>
  );
};

