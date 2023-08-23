import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import GlobalStore from '@/store';
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView';
import PostCollection from '@/components/PostCollection';

describe('HomeView', () => {
  let store = null;
  let router = null;
  beforeEach(async () => {
    router = createRouter({
      history: createWebHistory('/'),
      routes: [
        {
          path: '/',
          name: 'home',
          component: HomeView,
        },
        {
          path: '/post/:id',
          name: 'post',
          component: () =>
            import(
              /* webpackChunkName: "post-expanded" */ '@/views/PostExpanded.vue'
            ),
        },
      ],
    });

    store = createStore({
      state() {
        return {
          ...GlobalStore.state(),
        };
      },
      getters: GlobalStore.getters,
      mutations: GlobalStore.mutations,
      actions: GlobalStore.actions,
    });
    router.push('/');
    await router.isReady();
  });
  afterEach(() => {
    store = null;
    router = null;
  });
  it('should render component with PostCollection on page load', () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [store, router],
      },
    });
    expect(wrapper.find('.home').exists()).toBe(true);
    expect(wrapper.findComponent(PostCollection).exists()).toBe(true);
  });
});
