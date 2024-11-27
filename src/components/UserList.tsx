import { useState, useMemo } from 'react';
import { User } from '../types';
import { Trash2, Edit, ArrowUp, ArrowDown } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useTheme } from '../lib/theme';
import { EditUserModal } from './EditUserModal';
import { SearchBar } from './SearchBar';
import { cn } from '../lib/utils';

type SortField = 'name' | 'email' | 'role';
type SortDirection = 'asc' | 'desc';

export function UserList() {
  const { users, roles, deleteUser } = useStore();
  const { isDark } = useTheme();
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [roleFilter, setRoleFilter] = useState<string>('all');

  const getRoleName = (roleId: string) => {
    return roles.find((role) => role.id === roleId)?.name || 'Unknown';
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedUsers = useMemo(() => {
    return users
      .filter((user) => {
        const matchesSearch = 
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          getRoleName(user.roleId).toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = 
          statusFilter === 'all' ? true :
          statusFilter === 'active' ? user.isActive :
          !user.isActive;

        const matchesRole =
          roleFilter === 'all' ? true :
          user.roleId === roleFilter;

        return matchesSearch && matchesStatus && matchesRole;
      })
      .sort((a, b) => {
        let comparison = 0;
        if (sortField === 'name') {
          comparison = a.name.localeCompare(b.name);
        } else if (sortField === 'email') {
          comparison = a.email.localeCompare(b.email);
        } else if (sortField === 'role') {
          comparison = getRoleName(a.roleId).localeCompare(getRoleName(b.roleId));
        }
        return sortDirection === 'asc' ? comparison : -comparison;
      });
  }, [users, searchTerm, sortField, sortDirection, statusFilter, roleFilter]);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? 
      <ArrowUp className="h-4 w-4 inline-block ml-1" /> :
      <ArrowDown className="h-4 w-4 inline-block ml-1" />;
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search users..."
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
          className={cn(
            "block w-full px-3 py-2 border rounded-md leading-5 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200",
            isDark 
              ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
              : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
          )}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className={cn(
            "block w-full px-3 py-2 border rounded-md leading-5 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200",
            isDark 
              ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
              : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
          )}
        >
          <option value="all">All Roles</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>{role.name}</option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className={cn(
          'min-w-full rounded-lg transition-colors duration-200',
          isDark ? 'bg-gray-900' : 'bg-white'
        )}>
          <thead className={cn(
            'transition-colors duration-200',
            isDark ? 'bg-gray-800' : 'bg-gray-50'
          )}>
            <tr>
              <th 
                onClick={() => handleSort('name')}
                className={cn(
                  'px-6 py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-200 cursor-pointer',
                  isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                )}
              >
                Name <SortIcon field="name" />
              </th>
              <th 
                onClick={() => handleSort('email')}
                className={cn(
                  'px-6 py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-200 cursor-pointer',
                  isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                )}
              >
                Email <SortIcon field="email" />
              </th>
              <th 
                onClick={() => handleSort('role')}
                className={cn(
                  'px-6 py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-200 cursor-pointer',
                  isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                )}
              >
                Role <SortIcon field="role" />
              </th>
              <th className={cn(
                'px-6 py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-200',
                isDark ? 'text-gray-400' : 'text-gray-500'
              )}>
                Status
              </th>
              <th className={cn(
                'px-6 py-3 text-left text-xs font-medium uppercase tracking-wider transition-colors duration-200',
                isDark ? 'text-gray-400' : 'text-gray-500'
              )}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className={cn(
            'divide-y transition-colors duration-200',
            isDark ? 'divide-gray-700' : 'divide-gray-200'
          )}>
            {filteredAndSortedUsers.map((user) => (
              <tr key={user.id} className="transition-all duration-200 hover:bg-opacity-50">
                <td className={`px-6 py-4 whitespace-nowrap ${isDark? 'text-gray-100' : 'text-gray-700'}`}>{user.name}</td>
                <td className={`px-6 py-4 whitespace-nowrap ${isDark? 'text-gray-100' : 'text-gray-700'}`}>{user.email}</td>
                <td className={`px-6 py-4 whitespace-nowrap ${isDark? 'text-gray-100' : 'text-gray-700'}`}>
                  {getRoleName(user.roleId)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={cn(
                    'px-2 inline-flex text-xs leading-5 font-semibold rounded-full transition-colors duration-200',
                    user.isActive
                      ? isDark ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'
                      : isDark ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800'
                  )}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingUser(user)}
                      className={cn(
                        'transition-all duration-200 transform hover:scale-110',
                        isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-900'
                      )}
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className={cn(
                        'transition-all duration-200 transform hover:scale-110',
                        isDark ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-900'
                      )}
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
        />
      )}
    </div>
  );
}