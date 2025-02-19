import { ref } from 'vue';

export function useSearch() {
  const searchQuery = ref<string>('');

  const emitSearch = (
    emit: (event: 'search-favorites' | 'search-side-bar', query: string) => void
  ) => {
    emit('search-favorites', searchQuery.value);
    emit('search-side-bar', searchQuery.value);
  };

  return {
    searchQuery,
    emitSearch,
  };
}
