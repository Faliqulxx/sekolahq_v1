'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Quote, Star } from 'lucide-react';
import { TESTIMONIALS } from '@/data/schoolData';

export default function AlumniAndTestimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  // Duplicate items for infinite seamless scroll
  const duplicatedTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];

  // Continuous auto-scroll loop
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationFrameId: number;
    const speed = 0.8; // pixels per frame

    const step = () => {
      if (el && !isPaused && !isDragging) {
        el.scrollLeft += speed;

        // When reaching the midpoint (start of duplicated items), loop back seamlessly
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft -= el.scrollWidth / 2;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, isDragging]);

  // Mouse Drag to scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Drag sensitivity
    scrollRef.current.scrollLeft = scrollLeftState - walk;

    // Handle seamless wrap during manual drag
    if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth / 2) {
      scrollRef.current.scrollLeft -= scrollRef.current.scrollWidth / 2;
      setScrollLeftState(scrollRef.current.scrollLeft);
      setStartX(x);
    } else if (scrollRef.current.scrollLeft <= 0) {
      scrollRef.current.scrollLeft += scrollRef.current.scrollWidth / 2;
      setScrollLeftState(scrollRef.current.scrollLeft);
      setStartX(x);
    }
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  return (
    <section className="py-16 sm:py-24 lg:py-28 bg-white border-t border-slate-100 overflow-hidden">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        
        {/* Section Header */}
        <div className="max-w-2xl space-y-3 mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-navy-950">
            Apa Kata Alumni & Orang Tua?
          </h2>

          <p className="text-sm sm:text-base text-slate-600">
            Cerita tulus dari para lulusan dan wali murid yang telah merasakan langsung atmosfer pertumbuhan di Sekolah-Q.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Subtle Side Fade Gradients for visual elegance */}
          <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-white via-white/70 to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-white via-white/70 to-transparent z-10 pointer-events-none" />

          {/* Scrollable / Draggable Track */}
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={() => {
              handleMouseUpOrLeave();
              setIsPaused(false);
            }}
            onMouseEnter={() => setIsPaused(true)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            className={`flex gap-4 sm:gap-6 lg:gap-8 overflow-x-auto no-scrollbar py-4 px-2 select-none touch-pan-x ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
          >
            {duplicatedTestimonials.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="w-[300px] sm:w-[380px] lg:w-[420px] shrink-0 bg-slate-50/80 hover:bg-slate-50 rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-8 border border-slate-200/80 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4 sm:mb-6">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center">
                      <Quote className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="flex items-center gap-1 text-accent-gold">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm lg:text-base text-slate-700 italic leading-relaxed mb-4 sm:mb-6 line-clamp-4">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-slate-200/60">
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-primary-500/30 shrink-0 bg-slate-200">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs sm:text-sm text-navy-950 group-hover:text-primary-600 transition-colors truncate">
                      {item.name}
                    </h4>
                    <p className="text-[10px] sm:text-xs text-slate-500 truncate">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Interaction Guide */}
        <div className="mt-4 text-center">
          <p className="text-xs text-slate-400">
            Geser atau sentuh kartu untuk navigasi manual • Otomatis berhenti saat disentuh/diarahkan kursor
          </p>
        </div>

      </div>
    </section>
  );
}
