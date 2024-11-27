import React, { useState } from 'react';
import { Permission } from '../types';
import { useStore } from '../store/useStore';
import { useTheme } from '../lib/theme';

export function RoleForm() {
  const { addRole } = useStore();
  const [name, setName] = useState('');
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const { isDark } = useTheme();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addRole(name, permissions);
    setName('');
    setPermissions([]);
  };

  const togglePermission = (permission: Permission) => {
    setPermissions((current) =>
      current.includes(permission)
        ? current.filter((p) => p !== permission)
        : [...current, permission]
    );
  };

  const allPermissions: Permission[] = ['read', 'write', 'delete'];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className={`block text-sm font-medium ${isDark? 'text-gray-100' : 'text-gray-700'}`}>
          Role Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 p-2 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className={`block text-sm font-medium mb-2 ${isDark? 'text-gray-100' : 'text-gray-700'}`}>
          Permissions
        </label>
        <div className="space-y-2">
          {allPermissions.map((permission) => (
            <label key={permission} className="flex items-center">
              <input
                type="checkbox"
                checked={permissions.includes(permission)}
                onChange={() => togglePermission(permission)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className={`ml-2 select-none text-sm ${isDark? 'text-gray-100' : 'text-gray-700'} capitalize`}>
                {permission}
              </span>
            </label>
          ))}
        </div>
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Add Role
      </button>
    </form>
  );
}