import { create } from 'zustand';
import { User, Role, Permission, AuthState } from '../types';
import { generateId } from '../lib/utils';
import { hashPassword, verifyPassword } from '../lib/auth';

interface Store extends AuthState {
  users: User[];
  roles: Role[];
  addUser: (user: Omit<User, 'id'>) => Promise<void>;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
  addRole: (name: string, permissions: Permission[]) => void;
  updateRole: (id: string, role: Partial<Role>) => void;
  deleteRole: (id: string) => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useStore = create<Store>((set, get) => ({
  users: [
    {
      id: 'admin',
      name: 'Admin User',
      email: 'admin@example.com',
      password: '', // Will be set after initialization
      isActive: true,
      roleId: 'admin',
    },
  ],
  roles: [
    {
      id: 'admin',
      name: 'Administrator',
      permissions: ['read', 'write', 'delete'],
    },
    {
      id: 'user',
      name: 'User',
      permissions: ['read'],
    },
  ],
  user: null,
  isAuthenticated: false,
  addUser: async (user) => {
    const hashedPassword = await hashPassword(user.password);
    set((state) => ({
      users: [...state.users, { ...user, id: generateId(), password: hashedPassword }],
    }));
  },
  updateUser: (id, user) =>
    set((state) => ({
      users: state.users.map((u) => (u.id === id ? { ...u, ...user } : u)),
    })),
  deleteUser: (id) =>
    set((state) => ({
      users: state.users.filter((u) => u.id !== id),
    })),
  addRole: (name, permissions) =>
    set((state) => ({
      roles: [...state.roles, { id: generateId(), name, permissions }],
    })),
  updateRole: (id, role) =>
    set((state) => ({
      roles: state.roles.map((r) => (r.id === id ? { ...r, ...role } : r)),
    })),
  deleteRole: (id) =>
    set((state) => ({
      roles: state.roles.filter((r) => r.id !== id),
    })),
  login: async (email, password) => {
    const user = get().users.find((u) => u.email === email);
    if (user && await verifyPassword(password, user.password)) {
      set({ user, isAuthenticated: true });
      return true;
    }
    return false;
  },
  logout: () => set({ user: null, isAuthenticated: false }),
}));

// Initialize admin password
(async () => {
  const adminPassword = await hashPassword('admin123');
  useStore.setState(state => ({
    users: state.users.map(user => 
      user.id === 'admin' ? { ...user, password: adminPassword } : user
    )
  }));
})();