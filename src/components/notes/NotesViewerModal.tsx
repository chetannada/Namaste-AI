"use client";

import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { Episode, Season, NotePage } from "@/data/notesData";
import { useNotesViewer } from "./notesViewer/useNotesViewer";
import { NotesViewerHeader } from "./notesViewer/NotesViewerHeader";
import { NotesViewerStage } from "./notesViewer/NotesViewerStage";
import { NotesViewerFooter } from "./notesViewer/NotesViewerFooter";

interface NotesViewerModalProps {
  episode: Episode | null;
  season: Season | null;
  initialPageIndex?: number;
  isOpen: boolean;
  onClose: () => void;
  onSelectEpisode: (episode: Episode) => void;
  onPageChange?: (pageIndex: number, page: NotePage) => void;
}

export const NotesViewerModal = ({
  episode,
  season,
  initialPageIndex = 0,
  isOpen,
  onClose,
  onSelectEpisode,
  onPageChange,
}: NotesViewerModalProps) => {
  const {
    mounted,
    currentPageIndex,
    zoomLevel,
    currentPage,
    totalPages,
    prevEpisode,
    nextEpisode,
    thumbnailStripRef,
    setViewportNode,
    handlePrevPage,
    handleNextPage,
    handleSelectPage,
    handleZoomOut,
    handleZoomIn,
    handleResetZoom,
  } = useNotesViewer({
    episode,
    season,
    initialPageIndex,
    isOpen,
    onClose,
    onPageChange,
  });

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && episode && (
        <div className="fixed inset-0 z-200 flex flex-col">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-xl"
            aria-hidden="true"
          />

          <NotesViewerHeader
            episode={episode}
            season={season}
            currentPage={currentPage}
            currentPageIndex={currentPageIndex}
            totalPages={totalPages}
            zoomLevel={zoomLevel}
            onZoomOut={handleZoomOut}
            onZoomIn={handleZoomIn}
            onResetZoom={handleResetZoom}
            onClose={onClose}
          />

          <NotesViewerStage
            episode={episode}
            currentPage={currentPage}
            currentPageIndex={currentPageIndex}
            totalPages={totalPages}
            zoomLevel={zoomLevel}
            setViewportNode={setViewportNode}
            onPrevPage={handlePrevPage}
            onNextPage={handleNextPage}
          />

          <NotesViewerFooter
            episode={episode}
            currentPageIndex={currentPageIndex}
            prevEpisode={prevEpisode}
            nextEpisode={nextEpisode}
            thumbnailStripRef={thumbnailStripRef}
            onSelectEpisode={onSelectEpisode}
            onSelectPage={handleSelectPage}
          />
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
