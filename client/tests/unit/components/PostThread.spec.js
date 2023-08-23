import { mount, flushPromises } from '@vue/test-utils';
import PostThread from '@/components/PostThread';
import PostCard from '@/components/PostCard';
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView';

describe('PostThread', () => {
  let router = null;
  const postMock = {
    id: 1,
    title: 'Mondays Am I Right?',
    author: 'theCatLady',
    created: '8h',
    avatar: { img: 'avatar.jpg', alt: 'avatar of theCatLady' },
    media: { img: 'mondays.jpg', alt: 'cat in hammock' },
    description:
      'Anyone ready for the weekend? I know Whiskey is! This is my adorable cat Whiskey, who loves to lounge in his hammock.',
    commentsEnabled: true,
  };
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
    router.push('/');
    await router.isReady();
  });
  afterEach(() => {
    router = null;
  });
  it('should render component on page load when content is defined', () => {
    const wrapper = mount(PostThread, {
      global: {
        plugins: [router],
      },
      props: {
        content: postMock,
      },
    });

    expect(wrapper.find('.post-thread').exists()).toBe(true);
  });
  it('should NOT render component on page load when content is undefined', () => {
    const wrapper = mount(PostThread, {
      global: {
        plugins: [router],
      },
      props: {
        content: undefined,
      },
    });

    expect(wrapper.find('.post-thread').exists()).toBe(false);
  });
  it('should display PostCard when content exists', () => {
    const wrapper = mount(PostThread, {
      global: {
        plugins: [router],
      },
      props: {
        content: postMock,
      },
    });

    expect(wrapper.findComponent(PostCard).exists()).toBe(true);
  });
  it('should route to new page on click of router-link', async () => {
    const wrapper = mount(PostThread, {
      global: {
        plugins: [router],
      },
      props: {
        content: postMock,
      },
    });

    const push = jest.spyOn(router, 'push');
    await wrapper.find('a').trigger('click');

    await flushPromises();
    expect(push).toHaveBeenCalled();
  });
});
