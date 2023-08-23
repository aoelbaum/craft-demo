import { mount } from '@vue/test-utils';
import AvatarImage from '@/components/AvatarImage';

describe('AvatarImage', () => {
  const avatarMock = { img: 'avatar.jpg', alt: 'avatar of theCatLady' };

  it('should render component on page load when avatar is defined', () => {
    const wrapper = mount(AvatarImage, {
      props: {
        avatar: avatarMock,
      },
    });

    expect(wrapper.find('.avatar').exists()).toBe(true);
  });
  it('should default size prop', () => {
    const expected = { width: '70px', height: '70px' };
    const wrapper = mount(AvatarImage, {
      props: {
        avatar: avatarMock,
      },
    });

    expect(wrapper.vm.size).toStrictEqual(expected);
  });
  it('should override default when size prop is passed', () => {
    const expected = { width: '100px', height: '100px' };
    const wrapper = mount(AvatarImage, {
      props: {
        avatar: avatarMock,
        size: { width: '100px', height: '100px' },
      },
    });

    expect(wrapper.vm.size).toStrictEqual(expected);
  });
  it('should default avatar prop', () => {
    const wrapper = mount(AvatarImage);

    expect(wrapper.vm.avatar).toStrictEqual({ img: '', alt: '' });
  });
  it('should override default when avatar prop is passed', () => {
    const wrapper = mount(AvatarImage, {
      props: {
        avatar: avatarMock,
        size: { width: '100px', height: '100px' },
      },
    });

    expect(wrapper.vm.avatar).toStrictEqual(avatarMock);
  });
  it('should set width and height of .avatar in setup', () => {
    const wrapper = mount(AvatarImage, {
      props: {
        avatar: avatarMock,
        size: { width: '100px', height: '100px' },
      },
    });

    expect(wrapper.vm.height).toBe('100px');
    expect(wrapper.vm.width).toBe('100px');
  });
});
