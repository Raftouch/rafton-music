"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import DOMPurify from "dompurify";

interface SearchSongProps {
  placeholder: string;
}

export default function SearchSong({ placeholder }: SearchSongProps) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleChange = useDebouncedCallback((term: string) => {
    const sanitizedTerm = DOMPurify.sanitize(term);
    const params = new URLSearchParams(searchParams);
    sanitizedTerm ? params.set("query", sanitizedTerm) : params.delete("query");

    replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <input
      className="w-full p-2 rounded-full bg-transparent border-2 outline-none"
      placeholder={placeholder}
      onChange={(e) => handleChange(e.target.value)}
      defaultValue={searchParams.get("query")?.toString()}
    />
  );
}
