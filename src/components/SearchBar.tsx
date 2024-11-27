import { Search } from 'lucide-react';
import { useTheme } from '../lib/theme';
import { cn } from '../lib/utils';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  const { isDark } = useTheme();

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className={cn(
          "h-5 w-5",
          isDark ? "text-gray-400" : "text-gray-500"
        )} />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "block w-full pl-10 pr-3 py-2 border rounded-md leading-5 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200",
          isDark 
            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
        )}
      />
    </div>
  );
}