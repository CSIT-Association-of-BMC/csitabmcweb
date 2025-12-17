"use client";
import React from "react";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";
import Form from "next/form";
import { useSearchParams } from "next/navigation";

const NoticeHeader = () => {
  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/notices" className="group flex items-center gap-2">
          <div className="h-8 w-1 bg-primary rounded-full group-hover:h-10 transition-all" />
          <h1 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
            Notice Board
          </h1>
        </Link>

        <Suspense fallback={null}>
          <SearchForm />
        </Suspense>
      </div>
    </header>
  );
};

export default NoticeHeader;

function SearchForm() {
  const searchParams = useSearchParams();
  const search = searchParams.get("query");

  return (
    <Form
      action="/notices/search"
      className="flex items-center gap-2 max-w-md w-full"
    >
      <div className="relative flex-1">
        <Input
          type="search"
          name="query"
          defaultValue={search as string}
          placeholder="Search notices..."
          className="h-10 pl-10 pr-4 text-sm border-slate-200 focus-visible:ring-primary/20"
          required
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
      </div>
      <Button type="submit" size="sm" className="h-10 px-4">
        Search
      </Button>
    </Form>
  );
}
