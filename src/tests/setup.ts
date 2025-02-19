import { setActivePinia, createPinia } from 'pinia';
import { beforeEach, vi } from 'vitest';

beforeEach(() => {
  setActivePinia(createPinia());
});

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));
