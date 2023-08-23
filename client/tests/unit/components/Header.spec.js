import { mount } from '@vue/test-utils';
import Header from '@/components/Header';
import HomeView from '@/views/HomeView';
import { createStore } from 'vuex';
import GlobalStore from '@/store';
import PrimeVue from 'primevue/config';
import { createRouter, createWebHistory } from 'vue-router';

describe('Header', () => {
  let store = null;
  let router = null;
  const notificationsMock = [
    {
      message: 'user 1 commented on a post',
      created: '2023-08-21 03:50:17',
    },
    {
      message: 'user 2 commented on a post',
      created: '2023-08-22 03:50:17',
    },
  ];
  beforeEach(async () => {
    // create teleport target
    const el = document.createElement('div');
    el.id = 'modal';
    document.body.appendChild(el);
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
          notifications: notificationsMock,
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
    // clean up
    document.body.outerHTML = '';
    store = null;
    router = null;
  });
  it('should render component on page load', () => {
    const wrapper = mount(Header, {
      global: {
        plugins: [store, router, PrimeVue],
      },
    });
    expect(wrapper.find('header').exists()).toBe(true);
  });
  it('should get notifications sorted by most recently created from store', async () => {
    const expected = [...notificationsMock].reverse();
    const wrapper = mount(Header, {
      global: {
        plugins: [store, router, PrimeVue],
      },
    });

    expect(wrapper.vm.notifications).toStrictEqual(expected);
  });
  it('should set visible to true when onToggle is called', async () => {
    const wrapper = mount(Header, {
      global: {
        plugins: [store, router, PrimeVue],
      },
    });
    await wrapper.find('.notification-wrapper button').trigger('click');
    expect(wrapper.vm.visible).toBe(true);
  });
  it('should call setNotificationStatus mutation when onToggle is called', async () => {
    const commit = jest.spyOn(store, 'commit');
    const wrapper = mount(Header, {
      global: {
        plugins: [store, router, PrimeVue],
      },
    });
    await wrapper.find('.notification-wrapper button').trigger('click');
    expect(commit).toHaveBeenCalledWith('setNotificationStatus', false);
  });
});
