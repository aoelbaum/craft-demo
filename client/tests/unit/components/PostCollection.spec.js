import { mount, flushPromises, RouterLinkStub } from '@vue/test-utils';
import PostCollection from '@/components/PostCollection';

import { createStore } from 'vuex';
import GlobalStore from '@/store';

describe('Post Collection', () => {
  let store;
  beforeEach(async () => {
    store = createStore({
      state() {
        return {
          ...GlobalStore.state(),
        };
      },
      getters: GlobalStore.getters,
      mutations: GlobalStore.mutations,
      actions: {
        fetchComments: jest.fn(),
      },
    });
  });
  it('should render component on page load', async () => {
    const wrapper = mount(PostCollection, {
      global: {
        plugins: [store],
        stubs: {
          'router-link': RouterLinkStub,
        },
      },
    });
    await flushPromises();
    expect(wrapper.find('.post-collection').exists()).toBe(true);
  });
  it('should dispatch fetchComments action on page load', async () => {
    const dispatch = jest.spyOn(store, 'dispatch');
    mount(PostCollection, {
      global: {
        plugins: [store],
        stubs: {
          'router-link': RouterLinkStub,
        },
      },
    });

    await flushPromises();
    expect(dispatch).toHaveBeenCalledWith('fetchComments');
  });
  it('should set posts from store', async () => {
    const expected = store.state.posts;
    const wrapper = mount(PostCollection, {
      global: {
        plugins: [store],
        stubs: {
          'router-link': RouterLinkStub,
        },
      },
    });

    await flushPromises();
    expect(wrapper.vm.posts).toBe(expected);
  });
});
