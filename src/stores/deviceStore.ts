import { defineStore } from 'pinia';
import { ref, onMounted, onUnmounted } from 'vue';

export const useDeviceStore = defineStore('device', () => {
  const isMobile = ref(window.innerWidth <= 640);
  const showSidebar = ref(true);

  const updateDevice = () => {
    isMobile.value = window.innerWidth <= 640;
    if (isMobile.value) {
      showSidebar.value = false;
    } else {
      showSidebar.value = true;
    }
  };

  onMounted(() => {
    window.addEventListener('resize', updateDevice);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateDevice);
  });

  return { isMobile, showSidebar };
});
