import React, { useState, useEffect } from 'react';

/**
 * Reusable CAPTCHA component for login, signup, etc.
 * Usage: <Captcha onChange={(token, response) => {...}} error={error} />
 */
const Captcha = ({ onChange, error }) => {
  const [captcha, setCaptcha] = useState(null);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    refreshCaptcha();
    // eslint-disable-next-line
  }, []);

  const refreshCaptcha = async () => {
    setRefreshing(true);
    setInput('');
    try {
      const response = await fetch('/api/captcha/generate');
      const data = await response.json();
      setCaptcha(data);
      if (onChange) onChange(data.captcha_token, '');
    } catch (err) {
      setCaptcha(null);
    } finally {
      setRefreshing(false);
    }
  };

  const handleInput = (e) => {
    setInput(e.target.value);
    if (onChange && captcha) onChange(captcha.captcha_token, e.target.value);
  };

  return (
    <div className="flex flex-col items-start gap-2 w-full">
      {captcha ? (
        <>
          <div className="flex items-center gap-2">
            <img
              src={captcha.captcha_image}
              alt="CAPTCHA"
              className="border rounded h-12 w-auto bg-white"
              style={{ maxWidth: 160 }}
            />
            <button
              type="button"
              onClick={refreshCaptcha}
              className="px-2 py-1 text-xs border rounded hover:bg-gray-100"
              disabled={refreshing}
              aria-label="Refresh CAPTCHA"
            >
              🔄 Refresh
            </button>
          </div>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Enter CAPTCHA text"
            value={input}
            onChange={handleInput}
            required
            autoComplete="off"
            aria-label="Enter CAPTCHA text"
          />
          {error && <span className="text-red-500 text-xs">{error}</span>}
        </>
      ) : (
        <div className="text-gray-500 text-sm">Loading CAPTCHA...</div>
      )}
    </div>
  );
};

export default Captcha;
