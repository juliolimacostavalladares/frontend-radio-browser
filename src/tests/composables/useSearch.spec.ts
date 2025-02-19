import { describe, it, expect, vi } from 'vitest';
import { useSearch } from '@/composables/useSearch';

describe('useSearch', () => {
  it('initializes searchQuery with an empty string', () => {
    const { searchQuery } = useSearch();
    expect(searchQuery.value).toBe('');
  });

  it('emits search events with the current searchQuery', () => {
    const { searchQuery, emitSearch } = useSearch();
    const emitMock = vi.fn();

    searchQuery.value = 'test query';
    emitSearch(emitMock);

    expect(emitMock).toHaveBeenCalledWith('search-favorites', 'test query');
    expect(emitMock).toHaveBeenCalledWith('search-side-bar', 'test query');
  });

  it('emits search events with an empty searchQuery', () => {
    const { searchQuery, emitSearch } = useSearch();
    const emitMock = vi.fn();

    searchQuery.value = '';
    emitSearch(emitMock);

    expect(emitMock).toHaveBeenCalledWith('search-favorites', '');
    expect(emitMock).toHaveBeenCalledWith('search-side-bar', '');
  });
});
