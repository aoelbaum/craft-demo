import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import { nextTick } from 'vue';
import GlobalStore from '@/store';
import NotificationButton from '@/components/NoficationButton';

describe('NotificationButton', () => {
  let store = null;

  beforeEach(async () => {
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
  });
  afterEach(() => {
    store = null;
  });
  it('should render component on page load', () => {
    const wrapper = mount(NotificationButton, {
      global: {
        plugins: [store],
      },
    });
    expect(wrapper.find('.notification-wrapper').exists()).toBe(true);
  });
  it('should set showBadge from store', () => {
    const wrapper = mount(NotificationButton, {
      global: {
        plugins: [store],
      },
    });
    expect(wrapper.vm.showBadge).toBe(store.state.showBadge);
  });
  it('should hide badge class when showBadge is false', async () => {
    //showBadge is set to false in store by default
    const wrapper = mount(NotificationButton, {
      global: {
        plugins: [store],
      },
    });
    expect(wrapper.find('.badge').exists()).toBe(false);
  });
  it('should show badge class when showBadge is true', async () => {
    const wrapper = mount(NotificationButton, {
      global: {
        plugins: [store],
      },
    });
    store.commit('setNotificationStatus', true);
    await nextTick();
    expect(wrapper.find('.badge').exists()).toBe(true);
  });
  it('should emit toggle event on click of .notification-button', async () => {
    const wrapper = mount(NotificationButton, {
      global: {
        plugins: [store],
      },
    });

    await wrapper.find('.notification-button').trigger('click');

    expect(wrapper.emitted('toggle')).toBeTruthy();
  });
});
