import type { Resource } from "@/data/resources";

type ResourceCardProps = {
  resource: Resource;
};

const typeStyles: Record<Resource["type"], string> = {
  Article: "bg-emerald-100 text-emerald-700",
  Video: "bg-sky-100 text-sky-700",
  Guide: "bg-slate-200 text-slate-800",
};

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <article className="flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus-within:-translate-y-1 focus-within:shadow-lg">
      <div className="space-y-4">
        <span
          className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${typeStyles[resource.type]}`}
        >
          {resource.type}
        </span>
        <div>
          <h3 className="text-xl font-semibold text-slate-900">
            {resource.title}
          </h3>
          <p className="mt-2 text-sm text-slate-600">{resource.description}</p>
        </div>
      </div>
      <div className="pt-6">
        <a
          href={resource.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
        >
          Access Resource<span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  );
}
