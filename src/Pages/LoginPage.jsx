import React from 'react';
import LoginForm from '../components/Authentication/LoginForm';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 px-4">

      {/* Glass card wrapper */}
      <div className="w-full max-w-md rounded-2xl p-8 bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-white mb-6 drop-shadow">
          Welcome Back
        </h1>

        {/* Your existing form */}
        <LoginForm />

        {/* Extra footer / link area (optional) */}
        <p className="mt-6 text-center text-sm text-gray-300">
          Don’t have an account?{' '}
          <a
            href="/signup"
            className="text-indigo-400 hover:text-indigo-300 hover:underline transition"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
