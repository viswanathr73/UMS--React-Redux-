import React from 'react';

const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
      <svg
        className="w-5 h-5 mr-3 border-t-2 border-blue-500 border-solid rounded-full animate-spin"
        viewBox="0 0 24 24"
      >
       

        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C6.268 0 0 6.268 0 14h2a10 10 0 002 0V12zM0 12a12 12 0 012-11.155V1a1 1 0 011-1h2a1 1 0 011 1v1.845A12 12 0 010 12zm4 10a8 8 0 018-8v2a10 10 0 002 0v-2a12 12 0 00-2.58-7.48l-1.456 1.456A10 10 0 001 12h2a8 8 0 011 10z"
        ></path>
      </svg>
      Loading...
    </div>
  );
};

export default Spinner;
