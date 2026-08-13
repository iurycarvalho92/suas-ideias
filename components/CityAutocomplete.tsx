'use client';

import React, { useState, useRef, useEffect } from 'react';
import { getMatchingCities } from '@/lib/data/sp-cities';
import { MapPin, Check, ChevronDown, X } from 'lucide-react';

interface CityAutocompleteProps {
  value: string;
  onChange: (city: string) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
}

export default function CityAutocomplete({
  value,
  onChange,
  placeholder = "Selecione sua cidade em SP",
  className = "",
  required = false,
}: CityAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  useEffect(() => {
    setSuggestions(getMatchingCities(searchTerm, 12));
  }, [searchTerm]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (city: string) => {
    onChange(city);
    setSearchTerm(city);
    setIsOpen(false);
  };

  const handleClear = () => {
    onChange('');
    setSearchTerm('');
    setIsOpen(true);
  };

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#506324]">
          <MapPin className="h-4 w-4 text-[#F28919]" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            onChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          required={required}
          className="w-full pl-10 pr-10 py-3 bg-[#FEF6D5] border-2 border-[#506324]/30 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-[#506324] transition-all placeholder:text-slate-400"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-1">
          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="text-slate-400 hover:text-[#506324] p-1 rounded-full hover:bg-white/50"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="text-slate-400 hover:text-[#506324] p-1"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-50 mt-1.5 w-full bg-[#FEF6D5] rounded-xl shadow-xl border-2 border-[#506324]/30 max-h-60 overflow-y-auto py-1 text-sm">
          {suggestions.map((city) => (
            <button
              key={city}
              type="button"
              onClick={() => handleSelect(city)}
              className={`w-full text-left px-4 py-2.5 flex items-center justify-between hover:bg-[#506324] hover:text-white transition-colors ${
                city.toLowerCase() === value.toLowerCase()
                  ? 'bg-[#506324] text-white font-semibold'
                  : 'text-slate-700'
              }`}
            >
              <span>{city}</span>
              {city.toLowerCase() === value.toLowerCase() && (
                <Check className="w-4 h-4 text-[#F28919]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
