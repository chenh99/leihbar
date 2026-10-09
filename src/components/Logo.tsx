/** Das Logo: ein Aushang mit Nadel und drei Abreißstreifen, daneben der Name. */
export default function Logo() {
  return (
    <span className="flex items-center gap-2">
      <svg aria-hidden viewBox="0 0 28 36" className="h-9 w-7 shrink-0 -rotate-6">
        {/* Zettel mit harter Schattenkante */}
        <rect x="5" y="7" width="21" height="27" fill="var(--wand-schatten)" />
        <rect x="3" y="5" width="21" height="27" fill="var(--zettel)" stroke="var(--tinte)" strokeWidth="1.5" />
        {/* zwei Textzeilen */}
        <path d="M7 12h13M7 16h9" stroke="var(--tinte)" strokeWidth="1.5" strokeLinecap="round" />
        {/* Perforation und drei Abreißstreifen */}
        <path d="M3 22h21" stroke="var(--tinte)" strokeWidth="1.2" strokeDasharray="2 1.5" />
        <path d="M10 22v10M17 22v10" stroke="var(--tinte)" strokeWidth="1.2" />
        {/* Stecknadel */}
        <circle cx="13.5" cy="5" r="3.5" fill="var(--pin)" stroke="var(--tinte)" strokeWidth="1" />
      </svg>
      <span className="font-serif text-2xl leading-none text-wand-text">Leihbar</span>
    </span>
  );
}
