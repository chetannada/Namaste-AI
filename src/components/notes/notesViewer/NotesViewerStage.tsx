"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiBookOpen } from "react-icons/fi";
import { Episode, NotePage } from "@/data/notesData";
import { BASE_NOTE_HEIGHT } from "./notesViewerUtils";

interface NotesViewerStageProps {
  episode: Episode;
  currentPage?: NotePage;
  currentPageIndex: number;
  totalPages: number;
  zoomLevel: number;
  setViewportNode: (node: HTMLDivElement | null) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
}

export const NotesViewerStage = ({
  episode,
  currentPage,
  currentPageIndex,
  totalPages,
  zoomLevel,
  setViewportNode,
  onPrevPage,
  onNextPage,
}: NotesViewerStageProps) => {
  return (
    <div className="relative z-210 min-h-0 w-full flex-1">
      <div
        ref={setViewportNode}
        className={`absolute inset-0 overflow-auto overscroll-contain p-3 sm:p-6 touch-none ${
          zoomLevel > 1 ? "cursor-grab active:cursor-grabbing" : ""
        }`}
      >
        <div
          className={`flex min-h-full w-max min-w-full justify-center ${
            zoomLevel > 1 ? "items-start" : "items-center"
          }`}
        >
          <motion.div
            key={`${episode.id}-page-${currentPageIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-max rounded-2xl border border-border bg-surface/40 shadow-2xl shadow-black/60 backdrop-blur-xs"
          >
            {currentPage?.imageUrl ? (
              <Image
                src={currentPage.imageUrl}
                alt={currentPage.title || `Handwritten notes page ${currentPageIndex + 1}`}
                width={1200}
                height={900}
                priority
                draggable={false}
                className="w-auto rounded-2xl object-contain select-none"
                style={{
                  height: `calc(${BASE_NOTE_HEIGHT} * ${zoomLevel})`,
                  maxHeight: "none",
                  maxWidth: "none",
                }}
              />
            ) : (
              <div className="flex h-96 w-96 flex-col items-center justify-center gap-3 text-text-muted">
                <FiBookOpen size={40} className="text-primary/60" />
                <p className="text-sm font-medium">No note page uploaded yet</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {totalPages > 1 && (
        <button
          type="button"
          onClick={onPrevPage}
          disabled={currentPageIndex === 0}
          className={`
            absolute left-2 sm:left-6 top-1/2 z-220 flex h-11 w-11 sm:h-14 sm:w-14 -translate-y-1/2 items-center justify-center rounded-2xl border border-border bg-body/80 text-text-muted backdrop-blur-md transition-all duration-200
            ${
              currentPageIndex === 0
                ? "opacity-30 cursor-not-allowed"
                : "cursor-pointer hover:border-primary/50 hover:bg-surface hover:text-primary hover:scale-105 shadow-xl shadow-black/30"
            }
          `}
          aria-label="Previous note page"
        >
          <FiChevronLeft className="size-5 sm:size-7" />
        </button>
      )}

      {totalPages > 1 && (
        <button
          type="button"
          onClick={onNextPage}
          disabled={currentPageIndex === totalPages - 1}
          className={`
            absolute right-2 sm:right-6 top-1/2 z-220 flex h-11 w-11 sm:h-14 sm:w-14 -translate-y-1/2 items-center justify-center rounded-2xl border border-border bg-body/80 text-text-muted backdrop-blur-md transition-all duration-200
            ${
              currentPageIndex === totalPages - 1
                ? "opacity-30 cursor-not-allowed"
                : "cursor-pointer hover:border-primary/50 hover:bg-surface hover:text-primary hover:scale-105 shadow-xl shadow-black/30"
            }
          `}
          aria-label="Next note page"
        >
          <FiChevronRight className="size-5 sm:size-7" />
        </button>
      )}
    </div>
  );
};
