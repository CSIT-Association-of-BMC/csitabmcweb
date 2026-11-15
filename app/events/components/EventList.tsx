"use client";

import { useState, useMemo } from "react";
import { EventTypes } from "@/types/events";
import { EventCard } from "./EventCard";
import { SharedPagination } from "@/components/shared/SharedPagination";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, X, SearchX, ChevronDown } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";

interface EventListProps {
  events: EventTypes[];
  itemsPerPage?: number;
  initialQuery?: string;
  initialCategory?: string;
}

export function EventList({
  events,
  itemsPerPage = 16,
  initialQuery = "",
  initialCategory = "all",
}: EventListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  // Extract unique categories dynamically from event records
  const availableCategories = useMemo(() => {
    const set = new Set<string>();
    events.forEach((e) => {
      if (e.category) {
        set.add(e.category.trim());
      }
    });
    return Array.from(set);
  }, [events]);

  // Filter events based on active category and search query (title-based only)
  const filteredEvents = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return events.filter((event) => {
      // Category check
      const matchesCategory =
        selectedCategory === "all" ||
        event.category?.toLowerCase() === selectedCategory.toLowerCase();

      if (!matchesCategory) return false;

      // Search query check (title-based only)
      if (!q) return true;

      return Boolean(event.title?.toLowerCase().includes(q));
    });
  }, [events, selectedCategory, searchQuery]);

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

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEvents = filteredEvents.slice(startIndex, endIndex);

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
            aria-label="Filter events by category"
          >
            <option value="all">All Events</option>
            {availableCategories.map((cat) => (
              <option key={cat} value={cat.toLowerCase()} className="capitalize">
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
            placeholder="Search events..."
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
              All Events
            </TabsTrigger>
            {availableCategories.map((cat) => (
              <TabsTrigger
                key={cat}
                value={cat.toLowerCase()}
                className="rounded-md text-xs sm:text-sm font-medium capitalize"
              >
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Search Input Bar */}
          <div className="relative w-72 lg:w-80">
            <Input
              type="search"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search events by title..."
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

      {/* Events Grid or Minimal Empty State */}
      {currentEvents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentEvents.map((event, index) => (
            <EventCard
              key={event.documentId || event.id || index}
              event={event}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<SearchX className="w-5 h-5 text-slate-400" />}
          title="No events found"
          description={
            searchQuery
              ? `No events matched your search "${searchQuery}". Check your spelling or clear your search to see all events.`
              : "There are currently no events published under this category."
          }
          onReset={handleResetFilters}
          resetLabel={searchQuery ? "Clear search" : "View all events"}
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

export default EventList;
