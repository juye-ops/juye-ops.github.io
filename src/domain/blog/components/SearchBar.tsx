'use client';

import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="relative w-full">
        <div className="absolute inset-y-0 flex items-center ps-4 pointer-events-none z-10 text-gray-400">
          <FaSearch />
        </div>
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Kubernetes, DevOps, Next.js 등 검색..."
          className="block w-full p-4 ps-12 text-lg text-gray-900 border-0 rounded-3xl bg-white/80 backdrop-blur-xl shadow-xl ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-4 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white/80 transition-all duration-300"
        />
      </div>
    </div>
  );
}