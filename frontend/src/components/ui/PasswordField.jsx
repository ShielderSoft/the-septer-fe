import React, { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import InputField from './InputField';

const PasswordField = React.forwardRef(({ ...props }, ref) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <InputField
        ref={ref}
        icon={<Lock size={18} />}
        type={show ? 'text' : 'password'}
        {...props}
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-cyan-400 transition"
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
});

export default PasswordField;