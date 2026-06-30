import { useEffect, useState } from 'react';

export function useDebouncedSearch(searchText: string, delay: number = 500) {
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, delay);
    return () => clearTimeout(timer);
  }, [searchText, delay]);

  return debouncedSearch;
}
