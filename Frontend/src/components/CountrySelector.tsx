import { useState, useRef, useEffect } from "preact/hooks";
import type { Country } from "../context/AuthContext";
import { COUNTRIES } from "../hooks/useCountries";

interface Props {
  selected: Country;
  onChange: (c: Country) => void;
}

export function CountrySelector({ selected, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const filtered = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.dial_code.includes(search)
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div class="country-selector" ref={ref}>
      <button class="country-trigger" onClick={() => setOpen(!open)} type="button">
        <span class="flag">{selected.flag}</span>
        <span class="dial">{selected.dial_code}</span>
        <svg class={`chevron ${open ? "open" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div class="country-dropdown">
          <div class="search-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              class="country-search"
              placeholder="Search country..."
              value={search}
              onInput={(e) => setSearch((e.target as HTMLInputElement).value)}
              autoFocus
            />
          </div>
          <ul class="country-list">
            {filtered.map((c) => (
              <li
                key={c.code}
                class={`country-item ${c.code === selected.code ? "active" : ""}`}
                onClick={() => { onChange(c); setOpen(false); setSearch(""); }}
              >
                <span class="flag">{c.flag}</span>
                <span class="country-name">{c.name}</span>
                <span class="country-dial">{c.dial_code}</span>
              </li>
            ))}
            {filtered.length === 0 && <li class="no-result">No results</li>}
          </ul>
        </div>
      )}
    </div>
  );
}