'use client';

import { useEffect, useState } from 'react';

import { DEFAULT_VALUES } from '@/lib/constants';

import { Search, X } from './icons';

interface SearchBarProps {
  readonly onSearch: (term: string) => void;
  readonly placeholder?: string;
  readonly className?: string;
  readonly value?: string;
}

export function SearchBar({ onSearch, placeholder = DEFAULT_VALUES.SEARCH_PLACEHOLDER, className = '', value: externalValue }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState(externalValue || '');

  // Sync with external value when it changes
  useEffect(() => {
    if (externalValue !== undefined) {
      setSearchTerm(externalValue);
    }
  }, [externalValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className={`modern-search ${className}`}>
      <Search className="modern-search-icon" />
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder={placeholder}
        className=""
      />
      {searchTerm && (
        <button
          onClick={clearSearch}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content transition-colors p-1 rounded hover:bg-base-200"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
