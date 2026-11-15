"use client";

import React, { useState } from "react";
import { BlogCard } from "./BlogCard";
import { useBlogs } from "@/hooks/useBlogs";
import type { BlogPost } from "@/types/blogs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function BlogListView({
  initialBlogs,
}: {
  initialBlogs: BlogPost[];
}) {
  const [search, setSearch] = useState("");
  const { data: queryBlogs, isLoading } = useBlogs({
    search: search || undefined,
    initialData: initialBlogs,
  });

  const blogs = queryBlogs.length > 0 ? queryBlogs : initialBlogs;

  return (
    <div className="space-y-8">
      {/* Search Input */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          type="search"
          placeholder="Search articles by title or keyword..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 pr-4 py-2 bg-white border-slate-200 focus-visible:ring-[#2b3870]"
        />
      </div>

      {isLoading && blogs.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 animate-pulse">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-[16/10] bg-slate-200 rounded-xl" />
          ))}
        </div>
      ) : blogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {blogs.map((post) => (
            <BlogCard key={post.id || post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center text-slate-500">
          <p className="text-base font-semibold text-slate-800">
            No Articles Found
          </p>
          <p className="text-sm text-slate-500 mt-1">
            Try adjusting your search query or check back later.
          </p>
        </div>
      )}
    </div>
  );
}
