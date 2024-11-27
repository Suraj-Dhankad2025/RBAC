import React, { useState } from 'react';
import { Users, ShieldCheck, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { UserList } from './UserList';
import { RoleList } from './RoleList';
import { UserForm } from './UserForm';
import { RoleForm } from './RoleForm';
import { ThemeToggle } from './ThemeToggle';
import { useStore } from '../store/useStore';
import { useTheme } from '../lib/theme';
import { cn } from '../lib/utils';

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<'users' | 'roles'>('users');
  const navigate = useNavigate();
  const { logout, user } = useStore();
  const { isDark } = useTheme();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={cn(
      'min-h-screen transition-colors duration-200',
      isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'
    )}>
      <nav className={cn(
        'shadow-sm transition-colors duration-200',
        isDark ? 'bg-gray-800' : 'bg-white'
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className={cn(
                  'text-xl font-bold transition-colors duration-200',
                  isDark ? 'text-white' : 'text-gray-900'
                )}>
                  Admin Dashboard
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className={cn(
                'transition-colors duration-200',
                isDark ? 'text-gray-300' : 'text-gray-700'
              )}>
                Welcome, {user?.name}
              </span>
              <ThemeToggle />
              <button
                onClick={handleLogout}
                className={cn(
                  'flex items-center transition-colors duration-200',
                  isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                )}
              >
                <LogOut className="h-5 w-5 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('users')}
            className={cn(
              'flex items-center px-4 py-2 rounded-md transition-all duration-200 transform hover:scale-105',
              activeTab === 'users'
                ? isDark ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'
                : isDark ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-white text-gray-700 hover:bg-gray-50'
            )}
          >
            <Users className="h-5 w-5 mr-2" />
            Users
          </button>
          <button
            onClick={() => setActiveTab('roles')}
            className={cn(
              'flex items-center px-4 py-2 rounded-md transition-all duration-200 transform hover:scale-105',
              activeTab === 'roles'
                ? isDark ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'
                : isDark ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-white text-gray-700 hover:bg-gray-50'
            )}
          >
            <ShieldCheck className="h-5 w-5 mr-2" />
            Roles
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className={cn(
              'shadow rounded-lg p-6 transition-colors duration-200',
              isDark ? 'bg-gray-800' : 'bg-white'
            )}>
              <h2 className={cn(
                'text-lg font-medium mb-4 transition-colors duration-200',
                isDark ? 'text-white' : 'text-gray-900'
              )}>
                {activeTab === 'users' ? 'User Management' : 'Role Management'}
              </h2>
              {activeTab === 'users' ? <UserList /> : <RoleList />}
            </div>
          </div>
          <div className={cn(
            'shadow rounded-lg p-6 transition-colors duration-200',
            isDark ? 'bg-gray-800' : 'bg-white'
          )}>
            <h2 className={cn(
              'text-lg font-medium mb-4 transition-colors duration-200',
              isDark ? 'text-white' : 'text-gray-900'
            )}>
              {activeTab === 'users' ? 'Add New User' : 'Add New Role'}
            </h2>
            {activeTab === 'users' ? <UserForm /> : <RoleForm />}
          </div>
        </div>
      </div>
    </div>
  );
}