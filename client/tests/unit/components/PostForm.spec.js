import { mount, flushPromises } from '@vue/test-utils';
import { createStore } from 'vuex';
import GlobalStore from '@/store';
import PostForm from '@/components/PostForm';

describe('PostForm', () => {
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
      actions: {
        postComment: jest.fn(),
      },
    });
  });
  afterEach(() => {
    store = null;
  });
  it('should render component on page load', () => {
    const wrapper = mount(PostForm, {
      global: {
        plugins: [store],
      },
    });
    expect(wrapper.find('.post-form').exists()).toBe(true);
  });

  it('should call onSubmit on form submission', async () => {
    const wrapper = mount(PostForm, {
      global: {
        plugins: [store],
      },
    });
    const onSubmit = jest.spyOn(wrapper.vm, 'onSubmit');
    await wrapper.find('[name]').setValue('bob123');
    await wrapper.find('textarea').setValue('first comment');
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();
    expect(onSubmit).toHaveBeenCalled();
  });
  it('should dispatch postComment action when onSubmit is called', async () => {
    const expected = {
      name: 'bob123',
      message: 'first comment',
    };
    const wrapper = mount(PostForm, {
      global: {
        plugins: [store],
      },
    });
    const dispatch = jest.spyOn(store, 'dispatch');
    await wrapper.find('[name]').setValue('bob123');
    await wrapper.find('textarea').setValue('first comment');
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();
    expect(dispatch).toHaveBeenCalledWith('postComment', expected);
  });
  it('should reset form values when onSubmit is called', async () => {
    const expected = {
      name: 'bob123',
      message: 'first comment',
    };
    const wrapper = mount(PostForm, {
      global: {
        plugins: [store],
      },
    });
    await wrapper.find('[name]').setValue('bob123');
    await wrapper.find('textarea').setValue('first comment');
    expect(wrapper.vm.name).toBe(expected.name);
    expect(wrapper.vm.message).toBe(expected.message);
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();
    expect(wrapper.vm.name).toBe('');
    expect(wrapper.vm.message).toBe('');
    expect(wrapper.find('[name]').element.value).toBe('');
    expect(wrapper.find('textarea').element.value).toBe('');
  });
});
