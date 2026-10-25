'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, MessageSquare, ArrowRight } from 'lucide-react';
import { FAQ_LIST, SCHOOL_INFO } from '@/data/schoolData';

export default function FAQAccordionSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 sm:py-24 lg:py-28 bg-slate-50 border-t border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (BMSC Ref 2 Style) */}
        <div className="text-center space-y-3 mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-navy-950">
            Frequently Asked Questions
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            Pertanyaan yang sering diajukan orang tua dan calon siswa seputar pendaftaran, kurikulum, dan fasilitas sekolah.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQ_LIST.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 shadow-soft overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full text-left p-4 sm:p-6 min-h-[52px] flex items-center justify-between gap-3 sm:gap-4 font-bold text-xs sm:text-base text-navy-950 hover:text-primary-600 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-2.5 sm:gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary-50 text-primary-700 text-xs flex items-center justify-center font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <span className="leading-snug">{faq.question}</span>
                  </span>
                  
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${
                    isOpen ? 'bg-primary-600 text-white rotate-180' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-6 pb-5 sm:pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100/80 bg-slate-50/50">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-10 sm:mt-12 p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-navy-950 text-white flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6 shadow-card">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-accent-gold shrink-0 border border-white/10 hidden sm:flex">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-white">Punya Pertanyaan Lain?</h4>
              <p className="text-xs text-slate-300">Tim panitia kami siap membantu via WhatsApp atau konsultasi tatap muka.</p>
            </div>
          </div>

          <div className="w-full sm:w-auto flex items-center justify-center gap-3 shrink-0">
            <Link
              href="/kontak"
              className="w-full sm:w-auto text-center px-6 py-3 rounded-full bg-accent-gold hover:bg-amber-400 text-slate-950 text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 min-h-[44px] flex items-center justify-center"
            >
              Hubungi Sekretariat
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
