export type Permission = 'read' | 'write' | 'delete';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  roleId: string;
}

export interface Role {
  id: string;
  name: string;
  permissions: Permission[];
}

export interface UserFormData {
  name: string;
  email: string;
  password: string;
  roleId: string;
  isActive: boolean;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}