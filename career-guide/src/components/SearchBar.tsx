import { useId } from "react";

type SearchBarProps = {
  query: string;
  suggestions: string[];
  onQueryChange: (value: string) => void;
  onSelectSuggestion: (value: string) => void;
};

export function SearchBar({
  query,
  suggestions,
  onQueryChange,
  onSelectSuggestion,
}: SearchBarProps) {
  const inputId = useId();
  const listboxId = `${inputId}-listbox`;

  return (
    <div className="relative" role="search">
      <label htmlFor={inputId} className="sr-only">
        Search careers
      </label>
      <input
        id={inputId}
        type="search"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Search careers by title, skills, or sector..."
        className="w-full rounded-full border border-slate-200 bg-white px-5 py-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
        role="combobox"
        aria-expanded={suggestions.length > 0}
        aria-controls={listboxId}
        aria-autocomplete="list"
        aria-activedescendant={undefined}
      />
      <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400">
        <span className="text-lg" aria-hidden="true">
          ⌕
        </span>
      </div>
      <div className="absolute left-0 right-0 top-full z-20 mt-2">
        {suggestions.length > 0 ? (
          <ul
            id={listboxId}
            role="listbox"
            className="max-h-64 overflow-y-auto rounded-2xl border border-slate-200 bg-white py-2 shadow-lg"
          >
            {suggestions.map((item) => (
              <li key={item}>
                <button
                  type="button"
                  role="option"
                  aria-selected={false}
                  onClick={() => onSelectSuggestion(item)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-2 text-left text-sm text-slate-700 transition hover:bg-emerald-50 focus-visible:bg-emerald-50 focus-visible:outline-none"
                >
                  <span>{item}</span>
                  <span
                    aria-hidden="true"
                    className="text-xs font-medium uppercase tracking-wide text-emerald-600"
                  >
                    View
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
