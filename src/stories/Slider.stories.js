import Slider from './Slider';
import { useState } from 'react';

export default {
  title: 'UI/Slider',
  component: Slider,
};

export const Temperature = {
  args: {
    label: 'Temperature',
    value: 0.7,
    min: 0,
    max: 1,
    step: 0.1,
    showValue: true,
  },
};

export const MaxTokens = {
  args: {
    label: 'Max Tokens',
    value: 150,
    min: 50,
    max: 500,
    step: 50,
    showValue: true,
  },
};