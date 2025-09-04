import React from 'react';
import { classNames } from '../../utils/helpers';

const Input = ({ 
  label,
  error,
  className = '',
  ...props 
}) => {
  const baseStyles = 'w-full px-3 py-2 border rounded-lg shadow-sm transition-colors focus:ring-2 focus:ring-blue-500 focus:border-transparent';
  const normalStyles = 'border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-700 dark:text-white';
  const errorStyles = 'border-red-500 bg-red-50 dark:bg-red-900/20';

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <input
        className={classNames(
          baseStyles,
          error ? errorStyles : normalStyles,
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

export default Input;