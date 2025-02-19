import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import CardRadio from '@/components/card-radio.vue';
import { Pencil, Trash } from 'lucide-vue-next';
import { useImageLoader } from '@/composables/useImageLoader';
import { useStations } from '@/composables/useStations';
import { useFavorites } from '@/composables/useFavorites';
import type { Station } from '@/services/types';
import { createPinia, setActivePinia } from 'pinia';

vi.mock('@/composables/useImageLoader');
vi.mock('@/composables/useStations');
vi.mock('@/composables/useFavorites');

describe('CardRadio.vue', () => {
  let station: Station;
  let handleImageError: () => void;
  let handleInput: (event: Event) => void;
  let handleEdit: (station: Station) => void;
  let stationNameInputValue: string;
  let removeFavorite: (event: Event, stationuuid: string) => void;
  let isEditing: { value: boolean };

  beforeEach(() => {
    station = {
      stationuuid: '1',
      name: 'Test Station',
      url: '',
      url_resolved: '',
      favicon: '',
      tags: 'rock, pop',
      country: 'USA',
      state: '',
      language: '',
    };

    handleImageError = vi.fn();
    handleInput = vi.fn();
    handleEdit = vi.fn();
    stationNameInputValue = '';
    removeFavorite = vi.fn();
    isEditing = { value: false };

    setActivePinia(createPinia());

    (useImageLoader as any).mockReturnValue({ handleImageError });
    (useStations as any).mockReturnValue({
      isEditing,
      handleInput,
      handleEdit,
      stationNameInputValue,
    });
    (useFavorites as any).mockReturnValue({ removeFavorite });
  });

  it('handles image error correctly', async () => {
    const wrapper = mount(CardRadio, {
      props: { station },
    });

    const img = wrapper.find('img');
    await img.trigger('error');
    expect(handleImageError).toHaveBeenCalled();
  });

  it('enters edit mode when Pencil icon is clicked', async () => {
    const wrapper = mount(CardRadio, {
      props: { station },
    });

    const pencilIcon = wrapper.findComponent(Pencil);
    await pencilIcon.trigger('click');
    await wrapper.vm.$nextTick();

    const input = wrapper.find('input');
    expect(input.exists()).toBe(true);
  });

  it('calls removeFavorite when Trash icon is clicked', async () => {
    const wrapper = mount(CardRadio, {
      props: { station },
    });

    const trashIcon = wrapper.findComponent(Trash);
    await trashIcon.trigger('click');
    expect(removeFavorite).toHaveBeenCalledWith(
      expect.any(MouseEvent),
      station.stationuuid
    );
  });
});
