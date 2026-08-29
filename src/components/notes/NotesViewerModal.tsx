"use client";

import { useState, useEffect, useLayoutEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { Episode, Season, NotePage } from "@/data/notesData";
import {
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiZoomIn,
  FiZoomOut,
  FiRotateCcw,
  FiMaximize2,
  FiDownload,
  FiBookOpen,
} from "react-icons/fi";

const MIN_ZOOM = 0.75;
const MAX_ZOOM = 2.5;
const ZOOM_STEP = 0.25;
const BASE_NOTE_HEIGHT = "72vh";

function clampZoom(value: number) {
  return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, value));
}

function touchDistance(a: Touch, b: Touch) {
  return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
}

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
  const [currentPageIndex, setCurrentPageIndex] = useState(initialPageIndex);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [mounted, setMounted] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const thumbnailStripRef = useRef<HTMLDivElement>(null);
  const [viewportEl, setViewportEl] = useState<HTMLDivElement | null>(null);
  const zoomLevelRef = useRef(1);
  const pinchRef = useRef<{ startDistance: number; startZoom: number } | null>(null);
  const panRef = useRef<{
    startX: number;
    startY: number;
    startScrollLeft: number;
    startScrollTop: number;
  } | null>(null);
  const pendingScrollRef = useRef<{ left: number; top: number } | null>(null);

  const setViewportNode = useCallback((node: HTMLDivElement | null) => {
    viewportRef.current = node;
    setViewportEl(node);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setCurrentPageIndex(initialPageIndex);
    zoomLevelRef.current = 1;
    pendingScrollRef.current = null;
    setZoomLevel(1);
  }, [episode, initialPageIndex]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const applyZoom = useCallback((nextZoom: number, focalPoint?: { x: number; y: number }) => {
    const prev = zoomLevelRef.current;
    const next = clampZoom(nextZoom);
    if (Math.abs(next - prev) < 0.001) return;

    const viewport = viewportRef.current;
    if (viewport && focalPoint && prev > 0) {
      const ratio = next / prev;
      pendingScrollRef.current = {
        left: (viewport.scrollLeft + focalPoint.x) * ratio - focalPoint.x,
        top: (viewport.scrollTop + focalPoint.y) * ratio - focalPoint.y,
      };
    }

    zoomLevelRef.current = next;
    setZoomLevel(next);
  }, []);

  useLayoutEffect(() => {
    const pending = pendingScrollRef.current;
    const viewport = viewportRef.current;
    if (!pending || !viewport) return;
    viewport.scrollLeft = pending.left;
    viewport.scrollTop = pending.top;
    pendingScrollRef.current = null;
  }, [zoomLevel]);

  useLayoutEffect(() => {
    viewportRef.current?.scrollTo({ top: 0, left: 0 });
  }, [episode?.id, currentPageIndex]);

  useLayoutEffect(() => {
    const strip = thumbnailStripRef.current;
    const active = strip?.querySelector<HTMLElement>("[data-active-thumb='true']");
    if (!strip || !active) return;
    const stripRect = strip.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    const left =
      strip.scrollLeft +
      (activeRect.left - stripRect.left) -
      strip.clientWidth / 2 +
      activeRect.width / 2;
    strip.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [currentPageIndex, episode?.id]);

  useEffect(() => {
    if (!isOpen || !viewportEl) return;

    const focalFromClient = (clientX: number, clientY: number) => {
      const rect = viewportEl.getBoundingClientRect();
      return { x: clientX - rect.left, y: clientY - rect.top };
    };

    const handleWheel = (event: WheelEvent) => {
      if (!event.ctrlKey && !event.metaKey) return;
      event.preventDefault();
      const factor = Math.exp(-event.deltaY * 0.01);
      applyZoom(zoomLevelRef.current * factor, focalFromClient(event.clientX, event.clientY));
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 2) {
        panRef.current = null;
        pinchRef.current = {
          startDistance: touchDistance(event.touches[0], event.touches[1]),
          startZoom: zoomLevelRef.current,
        };
        return;
      }

      pinchRef.current = null;
      if (event.touches.length === 1) {
        panRef.current = {
          startX: event.touches[0].clientX,
          startY: event.touches[0].clientY,
          startScrollLeft: viewportEl.scrollLeft,
          startScrollTop: viewportEl.scrollTop,
        };
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length === 2 && pinchRef.current) {
        event.preventDefault();
        const { startDistance, startZoom } = pinchRef.current;
        if (startDistance <= 0) return;
        const currentDistance = touchDistance(event.touches[0], event.touches[1]);
        const midX = (event.touches[0].clientX + event.touches[1].clientX) / 2;
        const midY = (event.touches[0].clientY + event.touches[1].clientY) / 2;
        applyZoom(startZoom * (currentDistance / startDistance), focalFromClient(midX, midY));
        return;
      }

      if (event.touches.length === 1 && panRef.current) {
        event.preventDefault();
        const pan = panRef.current;
        viewportEl.scrollLeft = pan.startScrollLeft - (event.touches[0].clientX - pan.startX);
        viewportEl.scrollTop = pan.startScrollTop - (event.touches[0].clientY - pan.startY);
      }
    };

    const handleTouchEnd = (event: TouchEvent) => {
      if (event.touches.length < 2) {
        pinchRef.current = null;
      }
      if (event.touches.length === 0) {
        panRef.current = null;
      }
    };

    viewportEl.addEventListener("wheel", handleWheel, { passive: false });
    viewportEl.addEventListener("touchstart", handleTouchStart, { passive: true });
    viewportEl.addEventListener("touchmove", handleTouchMove, { passive: false });
    viewportEl.addEventListener("touchend", handleTouchEnd);
    viewportEl.addEventListener("touchcancel", handleTouchEnd);

    const handleMouseDown = (event: MouseEvent) => {
      if (event.button !== 0 || zoomLevelRef.current <= 1) return;
      event.preventDefault();
      panRef.current = {
        startX: event.clientX,
        startY: event.clientY,
        startScrollLeft: viewportEl.scrollLeft,
        startScrollTop: viewportEl.scrollTop,
      };

      const handleMouseMove = (moveEvent: MouseEvent) => {
        if (!panRef.current) return;
        viewportEl.scrollLeft =
          panRef.current.startScrollLeft - (moveEvent.clientX - panRef.current.startX);
        viewportEl.scrollTop =
          panRef.current.startScrollTop - (moveEvent.clientY - panRef.current.startY);
      };

      const handleMouseUp = () => {
        panRef.current = null;
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    };

    viewportEl.addEventListener("mousedown", handleMouseDown);

    return () => {
      viewportEl.removeEventListener("wheel", handleWheel);
      viewportEl.removeEventListener("touchstart", handleTouchStart);
      viewportEl.removeEventListener("touchmove", handleTouchMove);
      viewportEl.removeEventListener("touchend", handleTouchEnd);
      viewportEl.removeEventListener("touchcancel", handleTouchEnd);
      viewportEl.removeEventListener("mousedown", handleMouseDown);
    };
  }, [isOpen, viewportEl, applyZoom]);

  const zoomFromCenter = useCallback(
    (nextZoom: number) => {
      const viewport = viewportRef.current;
      const focal = viewport
        ? { x: viewport.clientWidth / 2, y: viewport.clientHeight / 2 }
        : undefined;
      applyZoom(nextZoom, focal);
    },
    [applyZoom]
  );

  const totalPages = episode?.pages.length || 0;
  const currentPage = episode?.pages[currentPageIndex];

  const handlePrevPage = useCallback(() => {
    if (!episode || currentPageIndex <= 0) return;
    const nextIndex = currentPageIndex - 1;
    zoomLevelRef.current = 1;
    pendingScrollRef.current = null;
    setZoomLevel(1);
    setCurrentPageIndex(nextIndex);
    if (episode.pages[nextIndex]) {
      onPageChange?.(nextIndex, episode.pages[nextIndex]);
    }
  }, [episode, currentPageIndex, onPageChange]);

  const handleNextPage = useCallback(() => {
    if (!episode || currentPageIndex >= totalPages - 1) return;
    const nextIndex = currentPageIndex + 1;
    zoomLevelRef.current = 1;
    pendingScrollRef.current = null;
    setZoomLevel(1);
    setCurrentPageIndex(nextIndex);
    if (episode.pages[nextIndex]) {
      onPageChange?.(nextIndex, episode.pages[nextIndex]);
    }
  }, [episode, currentPageIndex, totalPages, onPageChange]);

  const handleSelectPage = useCallback(
    (idx: number) => {
      if (!episode || idx === currentPageIndex) return;
      zoomLevelRef.current = 1;
      pendingScrollRef.current = null;
      setZoomLevel(1);
      setCurrentPageIndex(idx);
      if (episode.pages[idx]) {
        onPageChange?.(idx, episode.pages[idx]);
      }
    },
    [episode, currentPageIndex, onPageChange]
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrevPage();
      } else if (e.key === "ArrowRight") {
        handleNextPage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handlePrevPage, handleNextPage]);

  const currentEpisodeIndex = season?.episodes.findIndex(ep => ep.id === episode?.id) ?? -1;
  const prevEpisode = currentEpisodeIndex > 0 ? season?.episodes[currentEpisodeIndex - 1] : null;
  const nextEpisode =
    currentEpisodeIndex >= 0 && season && currentEpisodeIndex < season.episodes.length - 1
      ? season.episodes[currentEpisodeIndex + 1]
      : null;

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
                <h2 className="text-sm sm:text-base font-bold text-text line-clamp-1">
                  {episode.title}
                </h2>
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
                onClick={() => zoomFromCenter(1)}
                className="inline-flex h-8 min-w-8 items-center justify-center rounded-xl border border-border bg-surface/70 px-2 text-[11px] font-mono font-medium text-text-muted backdrop-blur-md hover:bg-hover hover:text-primary transition-colors md:hidden"
                title="Reset Zoom"
                aria-label={`Zoom ${Math.round(zoomLevel * 100)} percent. Tap to reset.`}
              >
                {Math.round(zoomLevel * 100)}%
              </button>

              <div className="hidden items-center rounded-xl border border-border bg-surface/70 p-0.5 backdrop-blur-md md:flex">
                <button
                  type="button"
                  onClick={() => zoomFromCenter(zoomLevelRef.current - ZOOM_STEP)}
                  className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-text-muted hover:bg-hover hover:text-primary transition-colors"
                  title="Zoom Out"
                >
                  <FiZoomOut size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => zoomFromCenter(1)}
                  className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-text-muted hover:bg-hover hover:text-primary transition-colors"
                  title="Reset Zoom"
                >
                  <FiRotateCcw size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => zoomFromCenter(zoomLevelRef.current + ZOOM_STEP)}
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
                onClick={handlePrevPage}
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
                onClick={handleNextPage}
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

            <div
              ref={thumbnailStripRef}
              className="no-scrollbar min-w-0 flex-1 overflow-x-auto py-1"
            >
              <div className="flex w-max min-w-full items-center justify-center gap-2 px-1">
                {episode.pages.map((page, idx) => (
                <button
                  key={page.pageNumber}
                  type="button"
                  data-active-thumb={currentPageIndex === idx ? "true" : undefined}
                  onClick={() => handleSelectPage(idx)}
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
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
