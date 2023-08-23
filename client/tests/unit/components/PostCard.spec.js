import { mount } from '@vue/test-utils';
import PostCard from '@/components/PostCard';

describe('PostCard', () => {
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
  it('should render component on page load when content is defined', () => {
    const wrapper = mount(PostCard, {
      props: {
        post: postMock,
      },
    });

    expect(wrapper.find('.post-card').exists()).toBe(true);
  });
  it('should NOT render component on page load when content is undefined', () => {
    const wrapper = mount(PostCard, {
      props: {
        post: undefined,
      },
    });

    expect(wrapper.find('.post-card').exists()).toBe(false);
  });
  it('should default avatarSize prop', () => {
    const expected = { width: '70px', height: '70px' };
    const wrapper = mount(PostCard, {
      props: {
        post: postMock,
      },
    });

    expect(wrapper.vm.avatarSize).toStrictEqual(expected);
  });
  it('should override default when avatarSize prop is passed', () => {
    const expected = { width: '100px', height: '100px' };
    const wrapper = mount(PostCard, {
      props: {
        post: postMock,
        avatarSize: { width: '100px', height: '100px' },
      },
    });

    expect(wrapper.vm.avatarSize).toStrictEqual(expected);
  });
  it('should set slots when passed', () => {
    const wrapper = mount(PostCard, {
      props: {
        post: postMock,
      },
      slots: {
        media: '<div class="image-container"><img src="test.jpg"/></div>',
        description: '<div class="description"><p>Description text</p></div>',
      },
    });

    expect(wrapper.find('.image-container').exists()).toBe(true);
    expect(wrapper.find('.description').exists()).toBe(true);
  });
});
