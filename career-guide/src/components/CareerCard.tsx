import Image from "next/image";
import type { Career } from "@/data/careers";

type CareerCardProps = {
  career: Career;
  highlight?: boolean;
};

export function CareerCard({ career, highlight = false }: CareerCardProps) {
  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-within:-translate-y-1 focus-within:shadow-xl ${
        highlight ? "ring-2 ring-emerald-400" : ""
      }`}
      tabIndex={-1}
      aria-label={`${career.title} career profile`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={career.imageUrl}
          alt={`Professional working as ${career.title}`}
          fill
          priority={highlight}
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 40vw, 90vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 inline-flex rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700 shadow">
          {career.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <header className="space-y-2">
          <h3 className="text-xl font-semibold text-slate-900">
            {career.title}
          </h3>
          <p className="text-sm text-slate-600">{career.description}</p>
        </header>
        <dl className="grid gap-3 text-sm text-slate-700">
          <div className="flex items-start gap-2">
            <dt className="shrink-0 font-semibold text-slate-900">Salary:</dt>
            <dd>{career.salaryRange}</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="font-semibold text-slate-900">Key Skills:</dt>
            <dd>
              <ul className="flex flex-wrap gap-2" aria-label="Key skills list">
                {career.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
          <div className="flex items-start gap-2">
            <dt className="shrink-0 font-semibold text-slate-900">
              Education:
            </dt>
            <dd>{career.education}</dd>
          </div>
        </dl>
        <div className="mt-auto pt-4">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            Explore Role
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </article>
  );
}
