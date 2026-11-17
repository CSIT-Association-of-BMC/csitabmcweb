import React from "react";
import Markdown from "react-markdown";

interface BlogMarkdownProps {
  content: string;
}

export function BlogMarkdown({ content }: BlogMarkdownProps) {
  if (!content) {
    return (
      <p className="text-slate-500 italic">No content available for this article.</p>
    );
  }

  return (
    <div className="blog-markdown w-full max-w-none text-slate-800">
      <Markdown
        components={{
          h1: ({ children }) => (
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-10 mb-5 first:mt-0 tracking-tight border-b border-slate-100 pb-3">
              {children}
            </h2>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-9 mb-4 first:mt-0 tracking-tight">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mt-7 mb-3">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-base font-semibold text-slate-900 mt-5 mb-2">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="text-base sm:text-[17px] text-slate-700 leading-relaxed mb-6">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-6 space-y-2 mb-6 text-slate-700 leading-relaxed marker:text-primary/70">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-6 space-y-2 mb-6 text-slate-700 leading-relaxed marker:text-slate-500 font-medium">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="pl-1">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary pl-4 py-2 italic text-slate-600 bg-slate-50 rounded-r-lg my-6">
              {children}
            </blockquote>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 font-medium underline underline-offset-4 transition-colors"
            >
              {children}
            </a>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-slate-900">{children}</strong>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-6 rounded-xl border border-slate-200">
              <table className="w-full text-left border-collapse text-sm">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-900 font-semibold">
              {children}
            </thead>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3 text-left font-semibold">{children}</th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 border-t border-slate-100 text-slate-700">{children}</td>
          ),
          code: ({ children }) => (
            <code className="bg-slate-100 text-slate-800 text-xs sm:text-sm px-1.5 py-0.5 rounded font-mono">
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre className="bg-slate-900 text-slate-100 p-4 sm:p-5 rounded-xl overflow-x-auto my-6 text-xs sm:text-sm font-mono border border-slate-800 shadow-xs">
              {children}
            </pre>
          ),
          hr: () => <hr className="my-8 border-slate-200" />,
          img: ({ src, alt }) => (
            <figure className="my-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt || "Blog content image"}
                className="rounded-xl border border-slate-200 max-h-[500px] w-full object-cover mx-auto"
                loading="lazy"
              />
              {alt && (
                <figcaption className="text-center text-xs text-slate-500 mt-2 italic">
                  {alt}
                </figcaption>
              )}
            </figure>
          ),
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}
