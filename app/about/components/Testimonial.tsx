"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { TestimonialData } from "@/data/about/data";
import { SectionHeading } from "@/components/shared/SectionHeading";

interface TestimonialProps {
  showHeader?: boolean;
  className?: string;
}

export default function Testimonial({
  showHeader = true,
  className = "",
}: TestimonialProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % TestimonialData.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={cn("w-full max-w-4xl mx-auto", className)}>
      {showHeader && (
        <SectionHeading
          highlight="Community"
          title="Testimonials"
          subtitle="Experiences and reflections from our community members and leaders."
          className="mb-6 sm:mb-8"
        />
      )}

      <div className="relative overflow-hidden py-1">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {TestimonialData.map((testimonial) => (
            <div key={testimonial.id} className="w-full flex-shrink-0 px-2 sm:px-4">
              <div className="rounded-xl bg-white border border-slate-200 p-6 sm:p-8 flex flex-col items-center text-center shadow-xs">
                {/* Author Info (Top) */}
                <div className="flex flex-col items-center mb-4 sm:mb-5">
                  <Avatar className="w-14 h-14 mb-2.5 border-2 border-primary/20 shadow-xs">
                    <AvatarImage src={testimonial.image} alt={testimonial.Name} className="object-cover" />
                    <AvatarFallback className="bg-slate-100 text-slate-700 font-semibold text-xs">
                      {testimonial.Name?.[0] || "T"}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-base sm:text-lg text-slate-900">
                    {testimonial.Name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    {testimonial.Post}
                  </p>
                </div>

                {/* Testimony Message in Center/Below (Height-stabilized) */}
                <div className="min-h-[110px] sm:min-h-[130px] flex flex-col items-center justify-center max-w-2xl mx-auto w-full">
                  <Quote className="w-6 h-6 text-primary/30 mb-2 shrink-0" />
                  <p className="text-sm sm:text-base text-slate-700 italic leading-relaxed">
                    &ldquo;{testimonial.testimony}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Slide Indicators */}
        <div className="flex justify-center items-center mt-6 gap-2">
          {TestimonialData.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                activeIndex === index
                  ? "bg-primary w-6"
                  : "bg-slate-200 hover:bg-slate-300 w-1.5"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
