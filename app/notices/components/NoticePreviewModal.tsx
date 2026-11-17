"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { X, ZoomIn, ZoomOut, RotateCcw, Download, FileText, Maximize, Minimize } from "lucide-react";

interface NoticePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
}

export function NoticePreviewModal({
  isOpen,
  onClose,
  imageUrl,
  title,
  triggerRef,
}: NoticePreviewModalProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const modalRef = useRef<HTMLDivElement>(null);

  const isPdf = Boolean(
    imageUrl?.toLowerCase().endsWith(".pdf") || imageUrl?.toLowerCase().includes("/pdf/")
  );

  // Lock body scroll and handle keyboard events
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (!isPdf) {
        if (e.key === "+" || e.key === "=") {
          setScale((prev) => Math.min(prev + 0.25, 3.5));
        } else if (e.key === "-") {
          setScale((prev) => Math.max(prev - 0.25, 0.75));
        } else if (e.key === "0") {
          setScale(1);
          setPosition({ x: 0, y: 0 });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      triggerRef?.current?.focus();
    };
  }, [isOpen, onClose, triggerRef, isPdf]);

  // Reset zoom & pan when opening new document
  useEffect(() => {
    if (isOpen) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [isOpen, imageUrl]);

  const handleZoomIn = useCallback(() => {
    setScale((prev) => Math.min(prev + 0.25, 3.5));
  }, []);

  const handleZoomOut = useCallback(() => {
    setScale((prev) => {
      const next = Math.max(prev - 0.25, 0.75);
      if (next <= 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  }, []);

  const handleResetZoom = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const handleToggleZoom = useCallback(() => {
    if (scale === 1) {
      setScale(1.5);
    } else {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [scale]);

  const handleDownload = useCallback(() => {
    const ext = isPdf ? "pdf" : "jpg";
    const filename = `${title.replace(/[^a-zA-Z0-9_-]/g, "_") || "notice"}.${ext}`;
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = filename;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, [imageUrl, title, isPdf]);

  // Mouse pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1 || isPdf) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || scale <= 1 || isPdf) return;
    setPosition({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex flex-col bg-slate-950/95 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label={`Document preview: ${title}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Sleek Header Bar with Compact Controls */}
      <header className="flex items-center justify-between px-3 sm:px-6 py-2.5 bg-slate-900/90 border-b border-slate-800 text-white z-20 shrink-0 select-none">
        <div className="flex items-center gap-2.5 min-w-0 pr-3">
          <span className="hidden sm:inline-flex px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-primary/20 text-primary border border-primary/30">
            {isPdf ? "PDF" : "SCAN"}
          </span>
          <h2 className="text-xs sm:text-sm font-semibold truncate text-slate-100" title={title}>
            {title}
          </h2>
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {!isPdf && (
            <div className="flex items-center gap-1 sm:gap-1.5 bg-slate-800/80 p-0.5 rounded-xl border border-slate-700/60">
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={scale <= 0.75}
                className="p-1.5 rounded-lg hover:bg-slate-700 disabled:opacity-30 transition-colors text-slate-300 hover:text-white"
                title="Zoom out (-)"
                aria-label="Zoom out"
              >
                <ZoomOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
              <button
                type="button"
                onClick={handleToggleZoom}
                className="text-[11px] sm:text-xs font-mono font-medium text-slate-200 px-2 py-1 hover:bg-slate-700 rounded-md transition-colors min-w-[3rem] text-center"
                title="Toggle fit/zoom"
              >
                {Math.round(scale * 100)}%
              </button>
              <button
                type="button"
                onClick={handleZoomIn}
                disabled={scale >= 3.5}
                className="p-1.5 rounded-lg hover:bg-slate-700 disabled:opacity-30 transition-colors text-slate-300 hover:text-white"
                title="Zoom in (+)"
                aria-label="Zoom in"
              >
                <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
              <button
                type="button"
                onClick={handleResetZoom}
                disabled={scale === 1 && position.x === 0 && position.y === 0}
                className="p-1.5 rounded-lg hover:bg-slate-700 disabled:opacity-30 transition-colors text-slate-300 hover:text-white hidden sm:inline-flex"
                title="Reset zoom (0)"
                aria-label="Reset zoom"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Download Action */}
          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            title="Download document"
            aria-label="Download original document"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Download</span>
          </button>

          {/* Close Action */}
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white transition-colors border border-slate-700/60"
            title="Close (Esc)"
            aria-label="Close preview"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Document Viewport - Maximizes screen usage with zero dead margins */}
      <main
        className="flex-1 w-full h-[calc(100vh-3.5rem)] overflow-hidden flex items-center justify-center p-1 sm:p-2 md:p-3 relative select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: isPdf ? "default" : scale > 1 ? (isDragging ? "grabbing" : "grab") : "default" }}
      >
        {isPdf ? (
          /* Full PDF Embed Viewer */
          <div className="w-full h-full max-w-6xl mx-auto rounded-xl overflow-hidden shadow-2xl bg-white border border-slate-800">
            <iframe
              src={imageUrl}
              title={title}
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>
        ) : (
          /* High-Resolution Document Image with Optimized Viewport Fitting */
          <div
            className="relative max-h-full max-w-full flex items-center justify-center"
            onDoubleClick={handleToggleZoom}
            title={scale === 1 ? "Double click to zoom" : "Double click to reset"}
          >
            <img
              src={imageUrl}
              alt={title}
              draggable={false}
              className="w-auto h-auto max-h-[calc(100vh-4rem)] max-w-[97vw] object-contain rounded-lg shadow-2xl transition-transform duration-75 ease-out select-none pointer-events-auto bg-white"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              }}
            />
          </div>
        )}
      </main>
    </div>
  );
}
