import React, { useState } from "react";
import { User } from "../types";
import { useStore } from "../store/useStore";
import { X } from "lucide-react";
import { useTheme } from "../lib/theme";

interface EditUserModalProps {
  user: User;
  onClose: () => void;
}

export function EditUserModal({ user, onClose }: EditUserModalProps) {
  const { roles, updateUser } = useStore();
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    roleId: user.roleId,
    isActive: user.isActive,
  });
  const { isDark } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(user.id, formData);
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-colors duration-300 ${
        isDark ? "bg-black bg-opacity-70" : "bg-black bg-opacity-50"
      }`}
    >
      <div
        className={`rounded-lg p-6 w-full max-w-md relative shadow-xl transition-transform duration-300 ${
          isDark ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition duration-200"
        >
          <X className="h-5 w-5" />
        </button>
        <h2 className="text-xl font-semibold mb-4">Edit User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label
              className={`block text-sm font-medium ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={`mt-1 block w-full rounded-md border p-2 ${
                isDark ? "bg-gray-900 border-gray-700 text-white" : "border-gray-300"
              } shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200`}
              required
            />
          </div>
          {/* Email Field */}
          <div>
            <label
              className={`block text-sm font-medium ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={`mt-1 block w-full rounded-md p-2 border ${
                isDark ? "bg-gray-900 border-gray-700 text-white" : "border-gray-300"
              } shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200`}
              required
            />
          </div>
          {/* Role Dropdown */}
          <div>
            <label
              className={`block text-sm font-medium ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Role
            </label>
            <select
              value={formData.roleId}
              onChange={(e) =>
                setFormData({ ...formData, roleId: e.target.value })
              }
              className={`mt-1 block w-full rounded-md p-2 border ${
                isDark ? "bg-gray-900 border-gray-700 text-white" : "border-gray-300"
              } shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200`}
            >
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
          {/* Active Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) =>
                setFormData({ ...formData, isActive: e.target.checked })
              }
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition duration-200"
            />
            <label
              className={`ml-2 block text-sm ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Active
            </label>
          </div>
          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 border border-gray-300 rounded-md text-sm font-medium ${
                isDark ? "text-gray-300 hover:text-gray-800 hover:bg-slate-300" : "text-red-600 hover:text-red-700 hover:bg-slate-200"
              } transition duration-200`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}