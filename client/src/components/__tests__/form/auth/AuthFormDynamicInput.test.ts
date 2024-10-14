import AuthFormDynamicInput from '@/components/form/auth/AuthFormDynamicInput.vue';
import { mount } from '@vue/test-utils';

describe('AuthFormDynamicInput', () => {
  it('should render input field for text-related names', () => {
    const wrapper = mount(AuthFormDynamicInput, {
      props: {
        name: 'email',
        modelValue: '',
        placeholder: 'Enter your email'
      }
    });

    const input = wrapper.find('input');
    expect(input.exists()).toBe(true);
    expect(input.attributes('placeholder')).toBe('Enter your email');
  });

  it('handles undefined or null name prop gracefully', () => {
    const wrapper = mount(AuthFormDynamicInput, {
      props: {
        name: undefined,
        modelValue: ''
      }
    });

    expect(wrapper.find('input').exists()).toBe(false);
    expect(wrapper.find('input[type="password"]').exists()).toBe(
      false
    );
    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(
      false
    );
  });

  it('handleUpdate function with valid input', async () => {
    const wrapper = mount(AuthFormDynamicInput, {
      props: {
        name: 'email',
        modelValue: '',
        placeholder: 'Enter your email'
      }
    });

    const input = wrapper.find('input');
    await input.setValue('test');

    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([
      'test'
    ]);
  });

  it('handleCheckboxChange function with checkbox input', async () => {
    const wrapper = mount(AuthFormDynamicInput, {
      props: {
        name: 'termsAndConditions',
        modelValue: false
      }
    });
    console.log(wrapper.html());
    const checkbox = wrapper.find('input[type="checkbox"]');

    (checkbox.element as HTMLInputElement).checked = true;

    // Memicu event 'change'
    await checkbox.trigger('change');

    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([true]);
  });
});
