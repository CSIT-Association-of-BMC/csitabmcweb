import Link from "next/link";
import { Container } from "@/components/shared/Container";

export default function NotFound({
  heading = "Page Not Found",
  message = "The page you are looking for may have been removed, had its name changed, or is temporarily unavailable.",
}: {
  heading?: string;
  message?: string;
}) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 bg-white">
      <Container className="flex items-center justify-center">
        <div className="max-w-md w-full text-center">
          {/* Clean, prominent 404 numeral */}
          <p className="text-6xl sm:text-7xl font-extrabold text-primary tracking-tight">
            404
          </p>

          {/* Heading */}
          <h1 className="mt-4 text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {heading}
          </h1>

          {/* Short explanation */}
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            {message}
          </p>

          {/* Primary and secondary actions */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold transition-colors shadow-2xs"
            >
              Go to Homepage
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-medium transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
