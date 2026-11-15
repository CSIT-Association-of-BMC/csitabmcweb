import Link from "next/link";

export default function NoticeNotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 bg-white">
      <div className="max-w-md w-full text-center">
        <p className="text-6xl sm:text-7xl font-extrabold text-primary tracking-tight">
          404
        </p>

        <h1 className="mt-4 text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Notice Not Found
        </h1>

        <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
          The requested circular or notice document could not be found. It may have expired or been removed.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/notices"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold transition-colors shadow-2xs"
          >
            View All Notices
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-medium transition-colors"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
