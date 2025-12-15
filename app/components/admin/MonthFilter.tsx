"use client";
import React, { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const months = [
  "Semua",
  "Oktober 2025",
  "November 2025",
  "Desember 2025",
  "Januari 2026",
  "Februari 2026"
];

const MonthFilter = ({ value, onChange }: Props) => {
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
    <div ref={ref} className="relative w-56 z-[999]">
      {/* Trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-md bg-white px-4 py-2 shadow-sm"
      >
        <span>{value}</span>
        <span
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          <ChevronDown />
        </span>
      </button>

      {/* Dropdown */}
      <div
        className={`
      absolute mt-2 w-full rounded-md bg-white shadow-lg
      transform transition-all duration-200 ease-out
      ${
        open
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-2 pointer-events-none"
      }
    `}
      >
        {months.map((m) => (
          <button
            key={m}
            onClick={() => {
              onChange(m);
              setOpen(false);
            }}
            className={`block w-full px-4 py-2 text-left hover:bg-gray-100 ${
              m === value ? "bg-gray-100 font-medium" : ""
            }`}
          >
            {m}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MonthFilter;
