"use client";

import { useState, useMemo } from "react";
import { NoticeTypes } from "@/types/Notice";
import { NoticeCardComponent } from "./NoticeCard";
import { SharedPagination } from "@/components/shared/SharedPagination";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, X, SearchX, ChevronDown } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";

interface NoticeListProps {
  notices: NoticeTypes[];
  itemsPerPage?: number;
  initialQuery?: string;
  initialCategory?: string;
}

export function NoticeList({
  notices,
  itemsPerPage = 16,
  initialQuery = "",
  initialCategory = "all",
}: NoticeListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  // Extract categories dynamically while preserving standard primary categories
  const availableCategories = useMemo(() => {
    const standard = ["administrative", "academic", "events"];
    const set = new Set<string>();

    standard.forEach((cat) => set.add(cat));

    notices.forEach((n) => {
      if (n.category) {
        set.add(n.category.trim().toLowerCase());
      }
    });

    return Array.from(set);
  }, [notices]);

  // Filter notices based on active category and title-based search query
  const filteredNotices = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return notices.filter((notice) => {
      // Category check
      const matchesCategory =
        selectedCategory === "all" ||
        notice.category?.toLowerCase() === selectedCategory.toLowerCase();

      if (!matchesCategory) return false;

      // Title-based search check
      if (!q) return true;
      return Boolean(notice.title?.toLowerCase().includes(q));
    });
  }, [notices, selectedCategory, searchQuery]);

  // Handle category tab change
  const handleCategoryChange = (val: string) => {
    setSelectedCategory(val);
    setCurrentPage(1);
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredNotices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNotices = filteredNotices.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col gap-8">
      {/* Mobile Toolbar (< md): Left Dropdown Filter, Right Search Bar */}
      <div className="flex md:hidden items-center gap-2 w-full mb-6">
        {/* Left: Category Dropdown */}
        <div className="relative w-[45%] max-w-[170px] shrink-0">
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="h-10 w-full appearance-none bg-white border border-slate-300 hover:border-slate-400 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg text-xs font-medium text-slate-800 pl-2.5 pr-7 transition-colors cursor-pointer truncate shadow-2xs"
            aria-label="Filter notices by category"
          >
            <option value="all">All Notices</option>
            {availableCategories.map((cat) => (
              <option key={cat} value={cat} className="capitalize">
                {cat}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Right: Search Input */}
        <div className="relative flex-1 min-w-0">
          <Input
            type="search"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search notices..."
            className="h-10 pl-8 pr-7 text-xs rounded-lg border-slate-300 bg-white shadow-2xs focus-visible:ring-primary/20"
          />
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setCurrentPage(1);
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 hover:text-slate-600 focus:outline-none"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Desktop Toolbar (>= md): TabsList on Left, Search Bar on Right */}
      <Tabs
        value={selectedCategory}
        onValueChange={handleCategoryChange}
        className="hidden md:block w-full"
      >
        <div className="flex md:items-center justify-between gap-4 mb-8">
          <TabsList className="bg-slate-100 p-1 rounded-lg border border-slate-200/80 h-auto flex flex-wrap gap-1 max-w-full">
            <TabsTrigger
              value="all"
              className="rounded-md text-xs sm:text-sm font-medium capitalize"
            >
              All Notices
            </TabsTrigger>
            {availableCategories.map((cat) => (
              <TabsTrigger
                key={cat}
                value={cat}
                className="rounded-md text-xs sm:text-sm font-medium capitalize"
              >
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Title-based Search Bar */}
          <div className="relative w-72 lg:w-80">
            <Input
              type="search"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search notices by title..."
              className="h-10 pl-9 pr-9 text-xs sm:text-sm rounded-lg border-slate-300 bg-white shadow-2xs focus-visible:ring-primary/20"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setCurrentPage(1);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 hover:text-slate-600 focus:outline-none"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </Tabs>

      {/* Notices Grid or Minimal Empty State */}
      {currentNotices.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {currentNotices.map((notice) => (
            <NoticeCardComponent key={notice.id} notice={notice} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<SearchX className="w-5 h-5 text-slate-400" />}
          title="No notices found"
          description={
            searchQuery
              ? `No notices matched your search "${searchQuery}". Check your spelling or clear your search to view all notices.`
              : "There are currently no official notices published under this category."
          }
          onReset={handleResetFilters}
          resetLabel={searchQuery ? "Clear search" : "View all notices"}
        />
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <SharedPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}

export default NoticeList;
