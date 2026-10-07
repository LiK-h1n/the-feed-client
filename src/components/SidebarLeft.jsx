import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Home, PlusCircle, Users, MessageSquare, Heart, User, Settings } from "lucide-react";

export default function SidebarLeft() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setAuthModalOpen, setAuthView } = useContext(AuthContext);

  const navItems = [
    { label: "Home", icon: Home, path: "/", protected: false },
    { label: "Create", icon: PlusCircle, path: "/create", protected: true },
    { label: "Users", icon: Users, path: "/users", protected: false },
    { label: "Message", icon: MessageSquare, path: "/messages", protected: true },
    { label: "Likes", icon: Heart, path: "/likes", protected: true },
    { label: "Profile", icon: User, path: "/profile", protected: true },
    { label: "Settings", icon: Settings, path: "/settings", protected: false },
  ];

  const handleNavClick = (e, item) => {
    if (item.protected && !user) {
      e.preventDefault();
      setAuthView("login");
      setAuthModalOpen(true);
    }
  };

  return (
    <aside className="w-60 flex-shrink-0 hidden md:block">
      <div className="sticky top-20 flex flex-col gap-2">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link 
              key={idx} 
              to={item.path} 
              onClick={(e) => handleNavClick(e, item)}
              className="block w-full"
            >
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