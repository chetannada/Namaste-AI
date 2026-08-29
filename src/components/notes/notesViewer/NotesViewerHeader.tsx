"use client";

import { motion } from "framer-motion";
import {
  FiX,
  FiZoomIn,
  FiZoomOut,
  FiRotateCcw,
  FiMaximize2,
  FiDownload,
  FiBookOpen,
} from "react-icons/fi";
import { Episode, Season, NotePage } from "@/data/notesData";

interface NotesViewerHeaderProps {
  episode: Episode;
  season: Season | null;
  currentPage?: NotePage;
  currentPageIndex: number;
  totalPages: number;
  zoomLevel: number;
  onZoomOut: () => void;
  onZoomIn: () => void;
  onResetZoom: () => void;
  onClose: () => void;
}

export const NotesViewerHeader = ({
  episode,
  season,
  currentPage,
  currentPageIndex,
  totalPages,
  zoomLevel,
  onZoomOut,
  onZoomIn,
  onResetZoom,
  onClose,
}: NotesViewerHeaderProps) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative z-210 flex h-16 sm:h-20 w-full shrink-0 items-center justify-between border-b border-border/80 bg-body/80 px-4 sm:px-8 backdrop-blur-md"
    >
      <div className="flex items-center gap-3">
        <span className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-primary/10 px-3 py-1 text-xs font-bold text-primary border border-primary/20">
          Season {season?.seasonNumber} · EP {episode.episodeNumber}
        </span>

        <div>
          <h2 className="text-sm sm:text-base font-bold text-text line-clamp-1">{episode.title}</h2>
          <p className="hidden text-xs text-text-muted sm:block">
            {currentPage?.title || `Page ${currentPageIndex + 1}`}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <span className="flex items-center gap-1.5 rounded-xl border border-border bg-surface/70 px-3 py-1.5 text-xs font-mono font-medium text-text-muted backdrop-blur-md">
          <FiBookOpen size={13} className="text-primary" />
          <span>{currentPageIndex + 1}</span>
          <span className="text-border">/</span>
          <span>{totalPages}</span>
        </span>

        <button
          type="button"
          onClick={onResetZoom}
          className="inline-flex h-8 min-w-8 items-center justify-center rounded-xl border border-border bg-surface/70 px-2 text-[11px] font-mono font-medium text-text-muted backdrop-blur-md hover:bg-hover hover:text-primary transition-colors md:hidden"
          title="Reset Zoom"
          aria-label={`Zoom ${Math.round(zoomLevel * 100)} percent. Tap to reset.`}
        >
          {Math.round(zoomLevel * 100)}%
        </button>

        <div className="hidden items-center rounded-xl border border-border bg-surface/70 p-0.5 backdrop-blur-md md:flex">
          <button
            type="button"
            onClick={onZoomOut}
            className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-text-muted hover:bg-hover hover:text-primary transition-colors"
            title="Zoom Out"
          >
            <FiZoomOut size={15} />
          </button>
          <button
            type="button"
            onClick={onResetZoom}
            className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-text-muted hover:bg-hover hover:text-primary transition-colors"
            title="Reset Zoom"
          >
            <FiRotateCcw size={13} />
          </button>
          <button
            type="button"
            onClick={onZoomIn}
            className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-text-muted hover:bg-hover hover:text-primary transition-colors"
            title="Zoom In"
          >
            <FiZoomIn size={15} />
          </button>
        </div>

        {currentPage?.imageUrl && (
          <a
            href={currentPage.imageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-7 w-7 sm:h-9 sm:w-9 cursor-pointer items-center justify-center rounded-lg sm:rounded-xl border border-border bg-surface/70 text-text-muted hover:bg-hover hover:text-primary transition-colors"
            title="Open Notes in New Tab"
          >
            <FiMaximize2 className="size-3.5 sm:size-4" />
          </a>
        )}

        {currentPage?.imageUrl && (
          <a
            href={currentPage.imageUrl}
            download={`Namaste-AI-S${season?.seasonNumber}-EP${episode.episodeNumber}-Page${currentPageIndex + 1}.webp`}
            className="inline-flex h-7 w-7 sm:h-9 sm:w-9 cursor-pointer items-center justify-center rounded-lg sm:rounded-xl border border-border bg-surface/70 text-text-muted hover:bg-hover hover:text-primary transition-colors"
            title="Download Notes"
          >
            <FiDownload className="size-3.5 sm:size-4" />
          </a>
        )}

        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-8 w-8 sm:h-9 sm:w-9 cursor-pointer items-center justify-center rounded-xl border border-highlight/40 bg-highlight/10 text-highlight hover:bg-highlight hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-highlight/25 backdrop-blur-md transition-all duration-200"
          aria-label="Close Notes Viewer"
          title="Close Notes Viewer"
        >
          <FiX className="size-4 sm:size-4.5" />
        </button>
      </div>
    </motion.header>
  );
};
