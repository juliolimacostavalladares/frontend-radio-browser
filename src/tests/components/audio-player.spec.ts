import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import AudioPlayer from '@/components/audio-player.vue';
import { ChevronFirst, ChevronLast, Play } from 'lucide-vue-next';
import { useAudioPlayer } from '@/composables/useAudioPlayer';
import { useImageLoader } from '@/composables/useImageLoader';

vi.mock('@/composables/useAudioPlayer');
vi.mock('@/composables/useImageLoader');

describe('AudioPlayer.vue', () => {
  const station = {
    stationuuid: '12345',
    name: 'Rock FM',
    tags: 'Rock, Indie',
    country: 'USA',
    favicon: 'http://rockfm.com/favicon.ico',
    url: 'http://rockfm.com',
    url_resolved: 'http://rockfm.com/resolved',
    state: 'active',
    language: 'English',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useAudioPlayer as any).mockReturnValue({
      isPlaying: false,
      togglePlayPause: vi.fn(),
      skip: vi.fn(),
    });
    (useImageLoader as any).mockReturnValue({ handleImageError: vi.fn() });
  });

  it('calls togglePlayPause when play button is clicked', async () => {
    const togglePlayPause = vi.fn();
    (useAudioPlayer as any).mockReturnValue({
      isPlaying: false,
      togglePlayPause,
      skip: vi.fn(),
    });

    const wrapper = mount(AudioPlayer, {
      props: { station },
    });

    await wrapper.findComponent(Play).trigger('click');
    expect(togglePlayPause).toHaveBeenCalled();
  });

  it('calls skip with -10 when previous button is clicked', async () => {
    const skip = vi.fn();
    (useAudioPlayer as any).mockReturnValue({
      isPlaying: false,
      togglePlayPause: vi.fn(),
      skip,
    });

    const wrapper = mount(AudioPlayer, {
      props: { station },
    });

    await wrapper.findComponent(ChevronFirst).trigger('click');
    expect(skip).toHaveBeenCalledWith(-10);
  });

  it('calls skip with 10 when next button is clicked', async () => {
    const skip = vi.fn();
    (useAudioPlayer as any).mockReturnValue({
      isPlaying: false,
      togglePlayPause: vi.fn(),
      skip,
    });

    const wrapper = mount(AudioPlayer, {
      props: { station },
    });

    await wrapper.findComponent(ChevronLast).trigger('click');
    expect(skip).toHaveBeenCalledWith(10);
  });

  it('calls handleImageError when image fails to load', async () => {
    const handleImageError = vi.fn();
    (useImageLoader as any).mockReturnValue({ handleImageError });

    const wrapper = mount(AudioPlayer, {
      props: { station },
    });

    await wrapper.find('img').trigger('error');
    expect(handleImageError).toHaveBeenCalled();
  });
});
