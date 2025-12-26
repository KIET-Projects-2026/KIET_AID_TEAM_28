import React, { useState } from 'react';
import { Languages } from 'lucide-react';

const LoginPage = ({ onLogin, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    onLogin({ name: 'User', email: email || 'user@example.com' });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: 'linear-gradient(135deg, #008B8B 0%, #20B2AA 50%, #66CDAA 100%)'
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-white opacity-10 rounded-full animate-float"></div>
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-white opacity-5 rounded-full animate-float"
          style={{ animationDelay: '1s' }}
        ></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-white opacity-10 rounded-full animate-wave"></div>
      </div>

      <div className="glass-effect rounded-3xl p-8 md:p-12 max-w-md w-full shadow-2xl animate-fade-in-up relative z-10">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-white rounded-full mb-4 animate-float">
            <Languages className="w-12 h-12" style={{ color: '#008B8B' }} />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">TranslateTe</h1>
          <p className="text-white text-opacity-90">Telugu to English Translation</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 border border-white border-opacity-30 focus:outline-none focus:border-opacity-60 transition-all"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 border border-white border-opacity-30 focus:outline-none focus:border-opacity-60 transition-all"
          />

          <button
            type="submit"
            className="w-full py-3 bg-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            style={{ color: '#008B8B' }}
          >
            Login
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-white text-opacity-90 hover:text-opacity-100 transition-all"
            >
              Don't have an account? <span className="font-semibold">Register</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;