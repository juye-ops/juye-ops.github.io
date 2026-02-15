import type { SearchBarProps } from "../../model/SearchBar/types";
import { FaSearch } from "react-icons/fa";

export const BlogSearchBar = ({ query, onChange, onSubmit }: SearchBarProps) => (
  <form onSubmit={onSubmit} className="relative flex w-full">
    <div className="relative w-full">
      <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none z-10">
        <FaSearch/>
      </div>
      <input
        type="search"
        value={query}
        onChange={onChange}
        placeholder="Kubernetes, Istio, DevOps 등 검색..."
        className="block w-full p-4 ps-12 text-lg text-gray-900 border-0 rounded-3xl bg-white/80 backdrop-blur-xl shadow-xl ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-4 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white/80 transition-all duration-300"
      />
    </div>
  </form>
);
