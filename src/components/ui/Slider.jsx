import React from 'react';
import { classNames } from '../../utils/helpers';

const Slider = ({ 
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  showValue = true,
  className = '',
  ...props 
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={classNames('space-y-2', className)}>
      {label && (
        <div className="flex justify-between items-center">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
          {showValue && (
            <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">
              {value}
            </span>
          )}
        </div>
      )}
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange && onChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          style={{
            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`
          }}
          {...props}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-400">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};

export default Slider;