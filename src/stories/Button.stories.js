import Button from './Button';

export default {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
};

export const Primary = {
  args: {
    variant: 'primary',
    children: 'Send Message',
  },
};

export const Secondary = {
  args: {
    variant: 'secondary',
    children: 'Cancel',
  },
};

export const Loading = {
  args: {
    variant: 'primary',
    loading: true,
    children: 'Sending...',
  },
};