<template>
  <div class="flex items-center gap-10 w-full h-10">
    <button
      v-if="deviceStore.isMobile"
      @click="deviceStore.showSidebar = !deviceStore.showSidebar"
      class="text-white"
    >
      <component
        :is="deviceStore.showSidebar ? SquareMenu : Menu"
        color="#fff"
      />
    </button>
    <input
      type="text"
      class="w-full h-full px-4 py-2.5 bg-white rounded-[500px] text-[#757575] text-sm placeholder-[#757575]"
      v-model="searchQuery"
      placeholder="Buscar rádios"
      @input="handleInput"
    />
  </div>
</template>

<script setup lang="ts">
import { Menu, SquareMenu } from 'lucide-vue-next';
import { useDeviceStore } from '@/stores/deviceStore';
import { useSearch } from '@/composables/useSearch';

const deviceStore = useDeviceStore();
const { searchQuery, emitSearch } = useSearch();

const emit = defineEmits<{
  (event: 'search-side-bar', query: string): void;
  (event: 'search-favorites', query: string): void;
}>();

const handleInput = () => {
  emitSearch((event, query) => {
    switch (event) {
      case 'search-favorites':
        emit(event, query);
        break;
      case 'search-side-bar':
        emit(event, query);
        break;
    }
  });
};
</script>
