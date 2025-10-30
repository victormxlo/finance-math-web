import { useAuth } from "@/features/auth/hooks/useAuth";
import clsx from "clsx";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { menuItems } from "@/components/navigation/config/menuItems";
import { NavLink } from "react-router-dom";
import { LogOut } from "lucide-react";

export function Sidebar() {
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <aside className={clsx(
      "min-h-screen flex flex-col justify-between bg-white border-r border-gray-200 dark:bg-neutral-900 dark:border-neutral-800 flex flex-col transition-all duration-300",
      collapsed ? "w-15" : "w-64"
    )}
    >
      <div className="p-4 flex items-center justify-between">
        {!collapsed && <h1 className="text-xl font-bold">Menu</h1>}
        <Button variant="ghost" size="sm" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? "»" : "«"}
        </Button>
      </div>

      <nav className="flex-1 mt-4 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              clsx(
                "flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-800 transition",
                isActive ? "bg-gray-100 font-semibold dark:bg-neutral-800" : "text-gray-700 dark:text-gray-300"
              )
            }
          >
            {<item.icon size={20} />}
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-neutral-800">
        {!collapsed && (
          <div className="mb-2 text-sm text-gray-600 dark:text-gray-400 font-bold">
            {user?.username || "User"}
          </div>
        )}
        <Button
          variant="destructive"
          size="sm"
          className="w-full flex items-center justify-center cursor-pointer"
          onClick={logout}
        >
          <LogOut size={16} />
          {!collapsed && <span className="ml-2">Logout</span>}
        </Button>
      </div>
    </aside>
  );
};

