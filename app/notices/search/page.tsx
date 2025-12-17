import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Form from "next/form";
import { fetchWithToken } from "@/lib/fetch";
import { NoticeTypes } from "@/types/Notice";
import { NoticeCardComponent } from "../components/NoticeCard";
import NoticeHeader from "../components/NoticeHeader";
import QueryString from "qs";

const NoticeSearch = async ({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) => {
  const { query } = await searchParams;

  if (!query) {
    return (
      <>
        <NoticeHeader />
        <QueryNotFound />
      </>
    );
  }

  // Search in Strapi
  const strapiQuery = QueryString.stringify({
    filters: {
      $or: [
        {
          title: {
            $containsi: query,
          },
        },
        {
          description: {
            $containsi: query,
          },
        },
      ],
    },
    populate: {
      image: {
        fields: ["url"],
      },
    },
  });

  const res = await fetchWithToken(
    `${process.env.STRAPI_API_URL}/notices?${strapiQuery}`
  );

  if (!res || res.status !== 200) {
    return (
      <>
        <NoticeHeader />
        <QueryNotFound />
      </>
    );
  }

  const resJson = await res.json();
  const notices: NoticeTypes[] = resJson.data;

  if (!notices || notices.length === 0) {
    return (
      <>
        <NoticeHeader />
        <NoticeNotFoundForQuery query={query} />
      </>
    );
  }

  return (
    <>
      <NoticeHeader />
      <div className="min-h-screen bg-gray-50/50">
        <main className="container py-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Search Results for "{query}"</h2>
            <p className="text-muted-foreground mt-1">
              Found {notices.length}{" "}
              {notices.length === 1 ? "notice" : "notices"}
            </p>
          </div>
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {notices.map((notice) => (
              <NoticeCardComponent key={notice.id} notice={notice} />
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default NoticeSearch;

const QueryNotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container flex flex-col items-center justify-center py-20">
        <div className="max-w-2xl w-full text-center space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Search for Notices
            </h1>
            <p className="text-muted-foreground mt-2">
              Enter a keyword or phrase to find relevant notices.
            </p>
          </div>
          <Form
            action="/notices/search"
            className="flex items-center gap-2 max-w-xl mx-auto"
          >
            <div className="relative flex-1">
              <Input
                type="search"
                name="query"
                placeholder="Search notices..."
                className="h-11 pl-10 shadow-sm"
                required
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
            <Button type="submit" className="h-11 px-6">
              Search
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

const NoticeNotFoundForQuery = ({ query }: { query: string }) => {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container flex flex-col items-center justify-center py-20">
        <div className="max-w-2xl w-full text-center space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              No Results Found
            </h1>
            <p className="text-muted-foreground mt-2">
              No notices found for "
              <span className="font-medium text-foreground">{query}</span>". Try
              a different search term.
            </p>
          </div>
          <Form
            action="/notices/search"
            className="flex items-center gap-2 max-w-xl mx-auto"
          >
            <div className="relative flex-1">
              <Input
                type="search"
                name="query"
                defaultValue={query}
                placeholder="Search notices..."
                className="h-11 pl-10 shadow-sm"
                required
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
            <Button type="submit" className="h-11 px-6">
              Search
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
