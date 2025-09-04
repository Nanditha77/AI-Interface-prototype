import Input from './Input';

export default {
  title: 'UI/Input',
  component: Input,
};

export const Default = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel = {
  args: {
    label: 'Message',
    placeholder: 'Type your message',
  },
};

export const WithError = {
  args: {
    label: 'Required Field',
    error: 'This field is required',
  },
};