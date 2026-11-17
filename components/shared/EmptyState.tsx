"use client";

import React from "react";
import { RotateCcw } from "lucide-react";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  searchQuery?: string;
  category?: string;
  onReset?: () => void;
  resetLabel?: string;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  onReset,
  resetLabel = "Reset filters",
  className = "",
}: EmptyStateProps) {
  return (
    <div className={`py-12 sm:py-16 text-center max-w-md mx-auto px-4 ${className}`}>
      {icon && (
        <div className="w-11 h-11 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center mx-auto mb-3.5">
          {icon}
        </div>
      )}

      <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-1">
        {title}
      </h3>

      <p className="text-xs sm:text-sm text-slate-500 mb-5 leading-relaxed">
        {description}
      </p>

      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs sm:text-sm font-medium transition-colors shadow-2xs"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{resetLabel}</span>
        </button>
      )}
    </div>
  );
}

export default EmptyState;
