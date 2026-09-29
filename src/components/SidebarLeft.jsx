import { Link, useLocation } from "react-router-dom";
import {
  Home,
  PlusCircle,
  Users,
  MessageSquare,
  Heart,
  User,
  Settings,
} from "lucide-react";

export default function SidebarLeft() {
  const location = useLocation();

  const navItems = [
    { label: "Home", icon: Home, path: "/", active: location.pathname === "/" },
    {
      label: "Create",
      icon: PlusCircle,
      path: "/create",
      active: location.pathname === "/create",
    },
    {
      label: "Users",
      icon: Users,
      path: "/users",
      active: location.pathname === "/users",
    },
    {
      label: "Message",
      icon: MessageSquare,
      path: "/messages",
      active: location.pathname === "/messages",
    },
    {
      label: "Likes",
      icon: Heart,
      path: "/likes",
      active: location.pathname === "/likes",
    },
    {
      label: "Profile",
      icon: User,
      path: "/profile",
      active: location.pathname === "/profile",
    },
    {
      label: "Settings",
      icon: Settings,
      path: "/settings",
      active: location.pathname === "/settings",
    },
  ];

  return (
    <aside className="w-60 flex-shrink-0 hidden md:block">
      <div className="sticky top-20 flex flex-col gap-2">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = item.active;

          return (
            <Link key={idx} to={item.path || "#"} className="block w-full">
              <div
                className={`flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-zinc-800 text-white shadow-sm"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
