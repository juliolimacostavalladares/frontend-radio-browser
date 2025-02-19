<template>
  <div class="bg-[#282828] text-white shadow-lg p-4 h-32">
    <div class="mb-4 flex justify-between items-center">
      <div class="flex flex-col gap-1 overflow-hidden max-w-60">
        <Radio class="text-red-800" />
        <span class="w-full text-md sm:text-lg font-semibold truncate">
          {{ station.name }}
        </span>
        <span class="text-sm font-normal truncate">
          {{ station.tags }}
        </span>
        <span class="text-sm font-normal truncate">
          {{ station.country }}
        </span>
      </div>
      <div class="flex items-center justify-center gap-6">
        <button @click="skip(-10)" class="hover:text-gray-400">
          <ChevronFirst />
        </button>
        <button @click="togglePlayPause" class="hover:text-gray-400">
          <Play v-if="!isPlaying" />
          <Pause v-else />
        </button>
        <button @click="skip(10)" class="hover:text-gray-400">
          <ChevronLast />
        </button>
      </div>
      <img
        class="w-16 sm:w-20"
        @error="handleImageError"
        :src="station.favicon"
        :alt="station.name"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Station } from '@/services/types';
import fallbackImage from '@/assets/no-image.png';
import { ChevronFirst, ChevronLast, Pause, Play, Radio } from 'lucide-vue-next';
import { useAudioPlayer } from '@/composables/useAudioPlayer';
import { useImageLoader } from '@/composables/useImageLoader';

defineProps<{
  station: Station;
}>();

const { isPlaying, togglePlayPause, skip } = useAudioPlayer();
const { handleImageError } = useImageLoader(fallbackImage);
</script>
