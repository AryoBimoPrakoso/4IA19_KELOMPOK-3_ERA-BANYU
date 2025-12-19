"use client";
import React, { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  options: string[]; // <--- TAMBAHAN: Menerima list bulan dari parent
};

// HAPUS variable const months = [...] yang manual itu.

const MonthFilter = ({ value, onChange, options }: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative z-[50]">
      {/* Trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition w-full sm:w-auto shadow-sm"
      >
        <span>Pilih Bulan: </span>
        <span className="truncate text-primary">{value || "Pilih Bulan"}</span>
        <span className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          <ChevronDown className="w-4 h-4" />
        </span>
      </button>

      {/* Dropdown */}
      <div
        className={`
          absolute mt-2 w-full max-h-60 overflow-y-auto rounded-md bg-white shadow-lg border border-gray-100
          transform transition-all duration-200 ease-out origin-top-right
          ${open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}
        `}
      >
        {options.length === 0 ? (
           <div className="px-4 py-3 text-sm text-gray-400">Tidak ada data bulan</div>
        ) : (
           options.map((m) => (
            <button
              key={m}
              onClick={() => {
                onChange(m);
                setOpen(false);
              }}
              className={`block w-full px-4 py-2 text-left text-sm  transition-colors ${
                m === value ? "bg-gray-100 " : "text-gray-400 hover:text-black"
              }`}
            >
              {m}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default MonthFilter;