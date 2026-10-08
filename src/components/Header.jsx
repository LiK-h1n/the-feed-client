import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Header() {
  const { user, logout, setAuthModalOpen, setAuthView } = useContext(AuthContext);

  return (
    <header className="border-b border-zinc-800/80 bg-[#0d0d0f]/90 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-1 font-extrabold text-xl text-white tracking-tight"
        >
          <span className="text-red-500 text-2xl">//</span>TheFeed
        </Link>

        <div>
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-zinc-400">
                @{user.username}
              </span>
              <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-xs text-white">
                {user.displayName?.charAt(0)}
              </div>
              <button
                onClick={logout}
                className="text-xs text-zinc-400 hover:text-white bg-zinc-800 px-3 py-1.5 rounded-lg transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setAuthView("login");
                  setAuthModalOpen(true);
                }}
                className="text-zinc-300 hover:text-white text-xs font-semibold mt-1"
              >
                Log in
              </button>
              <button
                onClick={() => {
                  setAuthView("signup");
                  setAuthModalOpen(true);
                }}
                className="bg-red-500 text-white px-3.5 py-1 rounded-lg text-xs font-semibold"
              >
                Sign up
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}