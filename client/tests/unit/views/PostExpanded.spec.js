import { mount, flushPromises } from '@vue/test-utils';
import PostExpanded from '@/views/PostExpanded';
import { createStore } from 'vuex';
import GlobalStore from '@/store';
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView';

describe('PostExpanded', () => {
  let store = null;
  let router = null;
  const commentsMock = [
    {
      id: 1,
      name: 'user1',
      message: 'first comment',
      created: '2023-08-21 03:50:17',
    },
    {
      id: 2,
      name: 'user2',
      message: 'second comment',
      created: '2023-08-21 04:50:17',
    },
    {
      id: 3,
      name: 'user3',
      message: 'third comment',
      created: '2023-08-21 05:50:17',
    },
    {
      id: 4,
      name: 'user4',
      message: 'fourth comment',
      created: '2023-08-21 06:50:17',
    },
  ];
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
      actions: {
        fetchComments: () => {
          store.commit('setComments', commentsMock);
        },
      },
    });
    router.push('/post/1');
    await router.isReady();
  });
  afterEach(() => {
    store = null;
    router = null;
  });
  it('should render component on page load', async () => {
    const wrapper = mount(PostExpanded, {
      global: {
        plugins: [store, router],
      },
    });
    await flushPromises();
    expect(wrapper.find('.post').exists()).toBe(true);
  });
  it('should dispatch  fetchComments action on page load', async () => {
    const dispatch = jest.spyOn(store, 'dispatch');
    mount(PostExpanded, {
      global: {
        plugins: [store, router],
      },
    });

    await flushPromises();
    expect(dispatch).toHaveBeenCalledWith('fetchComments');
  });
  it('should set post from store', async () => {
    const expected = store.state.posts[0];
    const wrapper = mount(PostExpanded, {
      global: {
        plugins: [store, router],
      },
    });

    await flushPromises();
    expect(wrapper.vm.post).toBe(expected);
  });
  it('should display comments when comments length is greater than 0 and commentsEnabled is true', async () => {
    const wrapper = mount(PostExpanded, {
      global: {
        plugins: [store, router],
      },
    });

    await flushPromises();
    expect(wrapper.find('.comments').exists()).toBe(true);
  });
  it('should NOT display comments if commentsEnabled is false', async () => {
    // post with id equal to 2 has commentsEnabled equal to false
    router.push('/post/2');
    const wrapper = mount(PostExpanded, {
      global: {
        plugins: [store, router],
      },
    });

    await flushPromises();
    expect(wrapper.find('.comments').exists()).toBe(false);
  });
  it('should NOT display comments if comment length is 0', async () => {
    const localStore = createStore({
      state() {
        return {
          ...GlobalStore.state(),
        };
      },
      getters: GlobalStore.getters,
      mutations: GlobalStore.mutations,
      actions: {
        fetchComments: () => {
          store.commit('setComments', []);
        },
      },
    });
    const wrapper = mount(PostExpanded, {
      global: {
        plugins: [localStore, router],
      },
    });
    await flushPromises();
    expect(wrapper.find('.comments').exists()).toBe(false);
  });
  it('should toggle hideComments when toggleComments is called', async () => {
    const wrapper = mount(PostExpanded, {
      global: {
        plugins: [store, router],
      },
    });

    await flushPromises();
    expect(wrapper.vm.hideComments).toBe(true);
    await wrapper.find('.toggle-comments').trigger('click');
    expect(wrapper.vm.hideComments).toBe(false);
  });
  it('should display "more" within button text when hideComments is true', async () => {
    const wrapper = mount(PostExpanded, {
      global: {
        plugins: [store, router],
      },
    });

    await flushPromises();
    expect(wrapper.vm.hideComments).toBe(true);
    expect(wrapper.find('.toggle-comments').text()).toBe('View more comments');
    await wrapper.find('.toggle-comments').trigger('click');
    expect(wrapper.vm.hideComments).toBe(false);
    expect(wrapper.find('.toggle-comments').text()).toBe('View less comments');
  });
  it('should display "less" within button text when hideComments is false', async () => {
    const wrapper = mount(PostExpanded, {
      global: {
        plugins: [store, router],
      },
    });

    await flushPromises();
    await wrapper.find('.toggle-comments').trigger('click');
    expect(wrapper.vm.hideComments).toBe(false);
    expect(wrapper.find('.toggle-comments').text()).toBe('View less comments');
  });
  it('should NOT display toggle button when comments length is not greater than 3', async () => {
    const localMock = commentsMock.slice(0, 3);
    const localStore = createStore({
      state() {
        return {
          ...GlobalStore.state(),
        };
      },
      getters: GlobalStore.getters,
      mutations: GlobalStore.mutations,
      actions: {
        fetchComments: () => {
          store.commit('setComments', localMock);
        },
      },
    });
    const wrapper = mount(PostExpanded, {
      global: {
        plugins: [localStore, router],
      },
    });
    await flushPromises();
    expect(wrapper.find('.toggle-comments').exists()).toBe(false);
  });
  it('should display PostForm when commentsEnabled is true', async () => {
    const wrapper = mount(PostExpanded, {
      global: {
        plugins: [store, router],
      },
    });

    await flushPromises();
    expect(wrapper.find('.post-form').exists()).toBe(true);
  });
  it('should NOT display PostForm when commentsEnabled is false', async () => {
    router.push('/post/2');
    const wrapper = mount(PostExpanded, {
      global: {
        plugins: [store, router],
      },
    });

    await flushPromises();
    expect(wrapper.find('.post-form').exists()).toBe(false);
  });
});
