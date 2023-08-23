import { mount } from '@vue/test-utils';
import App from '@/App';
import { createStore } from 'vuex';
import PrimeVue from 'primevue/config';
import GlobalStore from '@/store';
import { createRouter, createWebHistory } from 'vue-router';
import Header from '@/components/Header';

describe('App', () => {
  let store = null;
  let router = null;
  beforeEach(async () => {
    router = createRouter({
      history: createWebHistory('/'),
      routes: [
        {
          path: '/',
          name: 'home',
          component: App,
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
  it('should render component with Header and main on page load', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [store, router, PrimeVue],
      },
    });
    expect(wrapper.find('main').exists()).toBe(true);
    expect(wrapper.findComponent(Header).exists()).toBe(true);
  });
});
