"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { careers } from "@/data/careers";
import { resources } from "@/data/resources";
import { CareerCard } from "@/components/CareerCard";
import { SearchBar } from "@/components/SearchBar";
import { CareerQuiz } from "@/components/CareerQuiz";
import { ResourceCard } from "@/components/ResourceCard";
import { ContactForm } from "@/components/ContactForm";
import { SectionHeading } from "@/components/SectionHeading";

const faqItems = [
  {
    question: "How accurate are the career recommendations?",
    answer:
      "Our quiz uses your responses to highlight career paths aligned with your interests, strengths, and preferred work styles. Use the results as a starting point and explore roles in-depth using our curated resources.",
  },
  {
    question: "Can I save or share my quiz results?",
    answer:
      "Yes. After completing the quiz, you can bookmark the suggested careers or share them with a mentor. We recommend recording notes about what resonates to revisit during career planning conversations.",
  },
  {
    question: "Do you support career changers or students?",
    answer:
      "Absolutely. Our content is designed for both emerging talent and experienced professionals navigating transitions. You’ll find resources tailored to internships, bootcamps, upskilling, and role pivots.",
  },
  {
    question: "How accessible is the platform?",
    answer:
      "Pathfinder follows WCAG guidelines, uses semantic structure, and offers keyboard-friendly interactions. We continually improve based on user feedback to ensure everyone can explore with confidence.",
  },
];

export default function HomePage() {
  const [query, setQuery] = useState("");

  const filteredCareers = useMemo(() => {
    if (!query.trim()) return careers;
    const normalizedQuery = query.trim().toLowerCase();
    return careers.filter((career) => {
      const matchesTitle = career.title.toLowerCase().includes(normalizedQuery);
      const matchesCategory = career.category
        .toLowerCase()
        .includes(normalizedQuery);
      const matchesSkills = career.skills.some((skill) =>
        skill.toLowerCase().includes(normalizedQuery)
      );
      return matchesTitle || matchesCategory || matchesSkills;
    });
  }, [query]);

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    const normalized = query.trim().toLowerCase();
    const matches = careers
      .flatMap((career) => [career.title, ...career.skills])
      .filter((item) => item.toLowerCase().includes(normalized));
    return Array.from(new Set(matches)).slice(0, 6);
  }, [query]);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-24 px-4 pb-24 sm:px-6 lg:px-8">
      <header className="relative mt-12 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-sky-900 to-emerald-800 px-6 py-16 text-white shadow-2xl sm:mt-16 sm:px-12 lg:px-16">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="https://images.unsplash.com/photo-1531498860502-7c67cf02f77b?auto=format&fit=crop&w=1400&q=60"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-emerald-100">
              Pathfinder
              <span
                aria-hidden="true"
                className="inline-flex h-2 w-2 rounded-full bg-emerald-300"
              />
              Career Guidance Hub
            </span>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Navigate your career with clarity, confidence, and purpose.
            </h1>
            <p className="text-lg text-slate-100 sm:text-xl">
              Explore in-demand roles, uncover your strengths with an engaging
              quiz, and access curated resources to fuel your next career move.
            </p>
            <div className="flex flex-wrap items-center gap-4" role="group">
              <Link
                href="#careers"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-emerald-800/30 transition hover:-translate-y-0.5 hover:bg-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Explore Careers
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="#quiz"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Take Career Quiz
                <span aria-hidden="true">★</span>
              </Link>
            </div>
          </div>
          <div className="relative mt-8 w-full max-w-md rounded-3xl border border-white/20 bg-white/10 p-6 shadow-lg backdrop-blur-sm lg:mt-0">
            <p className="text-sm font-medium uppercase tracking-wide text-emerald-100">
              Featured Insight
            </p>
            <p className="mt-3 text-lg font-semibold text-white">
              87% of professionals who align their work with their strengths
              report higher workplace satisfaction.
            </p>
            <p className="mt-4 text-sm text-slate-200">
              Join thousands of learners building future-proof careers through
              Pathfinder&apos;s tailored guidance.
            </p>
          </div>
        </div>
        <div className="relative z-10 mt-10 max-w-3xl">
          <SearchBar
            query={query}
            suggestions={suggestions}
            onQueryChange={setQuery}
            onSelectSuggestion={setQuery}
          />
        </div>
      </header>

      <section id="careers" className="space-y-12">
        <SectionHeading
          title="Careers tailored to your ambition"
          subtitle="Browse detailed profiles to understand the day-to-day work, growth outlook, and pathways for success."
        />
        <div
          className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3"
          role="list"
          aria-label="Career profiles"
        >
          {filteredCareers.map((career, index) => (
            <CareerCard
              key={career.id}
              career={career}
              highlight={index === 0 && !query}
            />
          ))}
          {filteredCareers.length === 0 ? (
            <p className="rounded-3xl bg-white p-8 text-center text-base text-slate-600 shadow">
              No careers match your search yet. Try a different keyword or take
              the quiz for personalized suggestions.
            </p>
          ) : null}
        </div>
      </section>

      <section id="quiz" className="space-y-12">
        <CareerQuiz careers={careers} />
      </section>

      <section id="resources" className="space-y-12">
        <SectionHeading
          title="Resources to level up your career journey"
          subtitle="Articles, videos, and guides curated by career strategists to help you prepare, pivot, and grow."
        />
        <div
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          role="list"
          aria-label="Career development resources"
        >
          {resources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </section>

      <section className="space-y-12 lg:grid lg:grid-cols-5 lg:items-start lg:gap-10">
        <div className="lg:col-span-2">
          <SectionHeading
            title="Your questions, answered with care"
            subtitle="Reach out to our team or browse common questions to get the support you need."
          />
        </div>
        <div className="lg:col-span-3 space-y-10">
          <ContactForm />
          <div
            className="space-y-4 rounded-3xl border border-slate-200 bg-white p-8 shadow-lg"
            role="region"
            aria-labelledby="faq-heading"
          >
            <h2 id="faq-heading" className="text-3xl font-semibold text-slate-900">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqItems.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 transition hover:border-emerald-200"
                >
                  <summary className="cursor-pointer list-none text-lg font-semibold text-slate-900 outline-none transition focus-visible:outline focus-visible:outline-emerald-500">
                    <div className="flex items-center justify-between gap-4">
                      <span>{item.question}</span>
                      <span
                        aria-hidden="true"
                        className="text-emerald-500 transition group-open:rotate-45"
                      >
                        +
                      </span>
                    </div>
                  </summary>
                  <p className="mt-3 text-base text-slate-600">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="rounded-3xl bg-slate-900 px-6 py-10 text-slate-100 shadow-xl sm:px-12 lg:px-16">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
              Pathfinder
            </p>
            <p className="mt-2 text-lg font-medium text-white">
              Champion your career with clarity and compassion.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <Link
              href="#careers"
              className="rounded-full border border-white/20 px-4 py-2 transition hover:border-emerald-300 hover:text-emerald-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
            >
              Careers
            </Link>
            <Link
              href="#quiz"
              className="rounded-full border border-white/20 px-4 py-2 transition hover:border-emerald-300 hover:text-emerald-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
            >
              Quiz
            </Link>
            <Link
              href="#resources"
              className="rounded-full border border-white/20 px-4 py-2 transition hover:border-emerald-300 hover:text-emerald-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
            >
              Resources
            </Link>
          </div>
        </div>
        <p className="mt-6 text-xs text-slate-400">
          © {new Date().getFullYear()} Pathfinder Collective. All rights
          reserved.
        </p>
      </footer>
    </main>
  );
}
