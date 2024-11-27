# Role-Based Access Control (RBAC) Admin Dashboard

A modern, feature-rich admin dashboard for managing users and roles with role-based access control.

## Features

- **User Management**
  - Create, read, update, and delete users
  - Assign roles to users
  - Manage user status (active/inactive)
  - Sort users by name, email, or role
  - Filter users by status and role
  - Search users by name, email, or role

- **Role Management**
  - Create and manage roles
  - Define granular permissions (read, write, delete)
  - Assign roles to users

- **Authentication**
  - Secure login system
  - Protected routes based on user roles
  - Session management

- **Modern UI/UX**
  - Dark/Light mode support
  - Responsive design
  - Smooth animations and transitions
  - Interactive tables with sorting and filtering
  - Modal dialogs for editing

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Default Credentials

- Email: admin@example.com
- Password: admin123

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Zustand (State Management)
- React Router
- Lucide React (Icons)

## Project Structure

```
src/
├── components/        # React components
├── lib/              # Utilities and helpers
├── store/            # State management
└── types/            # TypeScript types
```

## Security Considerations

- Passwords are hashed using SHA-256
- Protected routes prevent unauthorized access
- Role-based access control for features
- Session management for authentication
