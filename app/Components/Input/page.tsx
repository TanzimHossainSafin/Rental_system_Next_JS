import React, { forwardRef } from 'react';

interface InputType {
  type?: string;
  placeholder?: string;
}

const InputPage = forwardRef<HTMLInputElement, InputType>(
  function InputPage({ type, placeholder }, ref) {
    return (
      <div className="m-4 p-4">
        <input 
          ref={ref}
          type={type || "text"} 
          placeholder={placeholder || "input"} 
        />
      </div>
    );
  }
);

export default InputPage;