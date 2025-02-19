import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import StationList from '@/components/station-list.vue';
import CardRadio from '@/components/card-radio.vue';
import { useStations } from '@/composables/useStations';
import type { Station } from '@/services/types';
import { createPinia, setActivePinia } from 'pinia';

vi.mock('@/composables/useStations');

describe('StationList.vue', () => {
  let stations: Station[];
  let handleSelect: (station: Station) => void;

  beforeEach(() => {
    stations = [
      {
        stationuuid: '1',
        name: 'Test Station 1',
        url: '',
        url_resolved: '',
        favicon: '',
        tags: 'rock, pop',
        country: 'USA',
        state: '',
        language: '',
      },
      {
        stationuuid: '2',
        name: 'Test Station 2',
        url: '',
        url_resolved: '',
        favicon: '',
        tags: 'jazz, blues',
        country: 'Canada',
        state: '',
        language: '',
      },
    ];

    handleSelect = vi.fn();
    setActivePinia(createPinia());

    (useStations as any).mockReturnValue({ handleSelect });
  });

  it('renders the correct number of stations', () => {
    const wrapper = mount(StationList, {
      props: { stations },
    });

    const items = wrapper.findAllComponents(CardRadio);
    expect(items.length).toBe(stations.length);
  });

  it('passes the correct station props to CardRadio', () => {
    const wrapper = mount(StationList, {
      props: { stations },
    });

    const items = wrapper.findAllComponents(CardRadio);
    items.forEach((item, index) => {
      expect(item.props().station).toEqual(stations[index]);
    });
  });

  it('calls handleSelect when a station is clicked', async () => {
    const wrapper = mount(StationList, {
      props: { stations },
    });

    const items = wrapper.findAllComponents(CardRadio);
    await items[0].trigger('click');
    expect(handleSelect).toHaveBeenCalledWith(stations[0]);
  });
});
