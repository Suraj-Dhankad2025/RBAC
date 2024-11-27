import { Shield, Trash2, Edit } from 'lucide-react';
import { useStore } from '../store/useStore';

export function RoleList() {
  const { roles, deleteRole } = useStore();
  return (
    <div className="space-y-4">
      {roles.map((role) => (
        <div
          key={role.id}
          className={` {isDark ? "bg-gray-800 text-white" : "bg-white text-black"}
             p-4 rounded-lg shadow-sm flex items-center justify-between`}
        >
          <div className="flex items-center space-x-4">
            <Shield className="h-5 w-5 text-blue-500" />
            <div>
              <h3 className="font-medium">{role.name}</h3>
              <div className="flex gap-2 mt-1">
                {role.permissions.map((permission) => (
                  <span
                    key={permission}
                    className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700"
                  >
                    {permission}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => deleteRole(role.id)}
              className="p-1 hover:text-red-600"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}