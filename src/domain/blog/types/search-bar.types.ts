// src/pages/blog/ui/SearchBar/model/types.ts
export interface SearchBarProps {
  query: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;  // ✅ HTMLFormElement로 정확히
}
