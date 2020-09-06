import React from 'react';

export default function Button({text, disabled, onClick, ...otherProps }) {
  return (
    <button
        disabled={disabled}
        onClick={onClick}
        {...otherProps}
    >
      {text}
    </button>
  );
}
