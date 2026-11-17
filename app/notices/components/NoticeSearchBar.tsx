"use client";

import React, { Suspense } from "react";
import Form from "next/form";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";

function SearchFormInner() {
  const searchParams = useSearchParams();
  const search = searchParams?.get("query") || "";

  return (
    <Form
      action="/notices/search"
      className="relative w-full sm:w-64 md:w-80 shrink-0"
    >
      <Input
        type="search"
        name="query"
        defaultValue={search}
        placeholder="Search notices..."
        className="h-10 pl-9 pr-4 text-xs sm:text-sm rounded-xl border-slate-200 bg-white shadow-xs focus-visible:ring-primary/20"
        required
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
    </Form>
  );
}

export function NoticeSearchBar() {
  return (
    <Suspense fallback={<div className="h-10 w-full sm:w-64 md:w-80 bg-slate-100 rounded-xl animate-pulse" />}>
      <SearchFormInner />
    </Suspense>
  );
}

export default NoticeSearchBar;
