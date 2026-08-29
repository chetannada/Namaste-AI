import { useState, useEffect, useLayoutEffect, useCallback, useRef, useSyncExternalStore } from "react";
import { Episode, Season, NotePage } from "@/data/notesData";
import { ZOOM_STEP, clampZoom, emptySubscribe, touchDistance } from "./notesViewerUtils";

interface UseNotesViewerParams {
  episode: Episode | null;
  season: Season | null;
  initialPageIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPageChange?: (pageIndex: number, page: NotePage) => void;
}

export function useNotesViewer({
  episode,
  season,
  initialPageIndex,
  isOpen,
  onClose,
  onPageChange,
}: UseNotesViewerParams) {
  const [currentPageIndex, setCurrentPageIndex] = useState(initialPageIndex);
  const [zoomLevel, setZoomLevel] = useState(1);
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const navigationKey = `${episode?.id ?? ""}:${initialPageIndex}`;
  const [syncedNavigationKey, setSyncedNavigationKey] = useState(navigationKey);
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

  if (syncedNavigationKey !== navigationKey) {
    setSyncedNavigationKey(navigationKey);
    setCurrentPageIndex(initialPageIndex);
    setZoomLevel(1);
  }

  useLayoutEffect(() => {
    zoomLevelRef.current = zoomLevel;
  }, [zoomLevel]);

  useLayoutEffect(() => {
    pendingScrollRef.current = null;
  }, [navigationKey]);

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

  const handleZoomOut = useCallback(() => {
    zoomFromCenter(zoomLevelRef.current - ZOOM_STEP);
  }, [zoomFromCenter]);

  const handleZoomIn = useCallback(() => {
    zoomFromCenter(zoomLevelRef.current + ZOOM_STEP);
  }, [zoomFromCenter]);

  const handleResetZoom = useCallback(() => {
    zoomFromCenter(1);
  }, [zoomFromCenter]);

  return {
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
  };
}
