"use client";

import { RefObject } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Episode } from "@/data/notesData";

interface NotesViewerFooterProps {
  episode: Episode;
  currentPageIndex: number;
  prevEpisode: Episode | null | undefined;
  nextEpisode: Episode | null | undefined;
  thumbnailStripRef: RefObject<HTMLDivElement | null>;
  onSelectEpisode: (episode: Episode) => void;
  onSelectPage: (idx: number) => void;
}

export const NotesViewerFooter = ({
  episode,
  currentPageIndex,
  prevEpisode,
  nextEpisode,
  thumbnailStripRef,
  onSelectEpisode,
  onSelectPage,
}: NotesViewerFooterProps) => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="relative z-210 flex h-20 w-full shrink-0 items-center gap-2 border-t border-border/80 bg-body/90 px-3 sm:px-8 backdrop-blur-md"
    >
      {prevEpisode && prevEpisode.isAvailable ? (
        <button
          type="button"
          onClick={() => onSelectEpisode(prevEpisode)}
          className="inline-flex shrink-0 items-center gap-1 rounded-xl border border-border/80 bg-surface/70 px-2 py-1.5 text-xs font-semibold text-text-muted hover:border-primary/50 hover:text-primary transition-colors cursor-pointer sm:gap-1.5 sm:px-3"
        >
          <FiChevronLeft size={14} />
          EP {prevEpisode.episodeNumber}
        </button>
      ) : (
        <div className="hidden w-20 shrink-0 sm:block" />
      )}

      <div ref={thumbnailStripRef} className="no-scrollbar min-w-0 flex-1 overflow-x-auto py-1">
        <div className="flex w-max min-w-full items-center justify-center gap-2 px-1">
          {episode.pages.map((page, idx) => (
            <button
              key={page.pageNumber}
              type="button"
              data-active-thumb={currentPageIndex === idx ? "true" : undefined}
              onClick={() => onSelectPage(idx)}
              className={`
                relative h-12 w-16 shrink-0 overflow-hidden rounded-xl border transition-all duration-200 cursor-pointer
                ${
                  currentPageIndex === idx
                    ? "border-primary ring-2 ring-primary/40 shadow-lg shadow-primary/20"
                    : "border-border/80 opacity-60 hover:opacity-100"
                }
              `}
            >
              <Image
                src={page.imageUrl}
                alt={`Thumbnail page ${idx + 1}`}
                fill
                sizes="64px"
                className="object-cover"
              />
              <span className="absolute bottom-0.5 right-1 rounded-sm bg-black/75 px-1 text-[9px] font-mono font-bold text-white">
                P{idx + 1}
              </span>
            </button>
          ))}
        </div>
      </div>

      {nextEpisode && nextEpisode.isAvailable ? (
        <button
          type="button"
          onClick={() => onSelectEpisode(nextEpisode)}
          className="inline-flex shrink-0 items-center gap-1 rounded-xl border border-border/80 bg-surface/70 px-2 py-1.5 text-xs font-semibold text-text-muted hover:border-primary/50 hover:text-primary transition-colors cursor-pointer sm:gap-1.5 sm:px-3"
        >
          EP {nextEpisode.episodeNumber}
          <FiChevronRight size={14} />
        </button>
      ) : (
        <div className="hidden w-20 shrink-0 sm:block" />
      )}
    </motion.footer>
  );
};
