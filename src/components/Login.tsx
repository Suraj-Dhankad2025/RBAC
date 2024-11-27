import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginFormData } from '../types';
import { useStore } from '../store/useStore';
import { FaUser, FaLock } from 'react-icons/fa';

export function Login() {
  const navigate = useNavigate();
  const login = useStore((state) => state.login);
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(formData.email, formData.password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-10">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Welcome Back</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center border-b border-gray-300 py-2">
            <FaUser className="text-gray-400 mr-2" />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-none focus:outline-none focus:ring-0"
              required
            />
          </div>
          <div className="flex items-center border-b border-gray-300 py-2">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-none focus:outline-none focus:ring-0"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}