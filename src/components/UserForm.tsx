import React, { useState } from 'react';
import { UserFormData } from '../types';
import { useStore } from '../store/useStore';
import { useTheme } from '../lib/theme';

export function UserForm() {
  const { roles, addUser } = useStore();
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    password: '',
    roleId: roles[0]?.id || '',
    isActive: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addUser(formData);
    setFormData({
      name: '',
      email: '',
      password: '',
      roleId: roles[0]?.id || '',
      isActive: true,
    });
  };
  const isDark = useTheme().isDark;
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className={`block text-sm font-medium ${isDark? 'text-gray-100' : 'text-gray-700'}`}>Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 text-black p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className={`block text-sm font-medium ${isDark? 'text-gray-100' : 'text-gray-700'}`}>Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="mt-1 block w-full text-black p-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className={`block text-sm font-medium ${isDark? 'text-gray-100' : 'text-gray-700'}`}>Password</label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="mt-1 block w-full text-black p-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className={`block text-sm font-medium ${isDark? 'text-gray-100' : 'text-gray-700'}`}>Role</label>
        <select
          value={formData.roleId}
          onChange={(e) => setFormData({ ...formData, roleId: e.target.value })}
          className="mt-1 block w-full text-black p-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={formData.isActive}
          onChange={(e) =>
            setFormData({ ...formData, isActive: e.target.checked })
          }
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label className={`ml-2 block text-sm ${isDark? 'text-gray-100' : 'text-gray-700'}`}>Active</label>
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Add User
      </button>
    </form>
  );
}