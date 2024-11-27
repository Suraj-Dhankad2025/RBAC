import React from 'react';
import { Navigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user?.roleId !== requiredRole) {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
}