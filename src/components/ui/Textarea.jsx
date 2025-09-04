import React from 'react';
import { classNames } from '../../utils/helpers';

const Textarea = ({ 
  label,
  error,
  className = '',
  showCount = false,
  maxLength,
  value = '',
  ...props 
}) => {
  const baseStyles = 'w-full px-3 py-2 border rounded-lg shadow-sm transition-colors focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none';
  const normalStyles = 'border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500';
  const errorStyles = 'border-red-500 bg-red-50 dark:bg-red-900/20';

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <textarea
        className={classNames(
          baseStyles,
          error ? errorStyles : normalStyles,
          className
        )}
        maxLength={maxLength}
        value={value}
        {...props}
      />
      <div className="flex justify-between items-center">
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
        {showCount && maxLength && (
          <span className="text-sm text-gray-500 dark:text-gray-400 ml-auto">
            {value.length}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
};

export default Textarea;