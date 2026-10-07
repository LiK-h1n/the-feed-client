import { useState, useContext } from "react";
import { X, Loader2 } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import api from "../api";

export default function AuthModal() {
  const { isAuthModalOpen, setAuthModalOpen, authView, setAuthView, login } =
    useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (authView === "login") {
        const res = await api.post("/auth/login", { email, password });
        await login(res.data.token, res.data.user);
        setAuthModalOpen(false);
      } else {
        const res = await api.post("/auth/signup", {
          email,
          password,
          username,
          displayName,
        });
        await login(res.data.token, res.data.user);
        setAuthModalOpen(false);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const toggleView = () => {
    setAuthView(authView === "login" ? "signup" : "login");
    setError("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#0d0d0f] border border-zinc-800 w-full max-w-md rounded-2xl p-6 relative shadow-2xl">
        <button
          onClick={() => setAuthModalOpen(false)}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {authView === "login" ? "Welcome back" : "Join //TheFeed"}
          </h2>
          <p className="text-zinc-400 text-sm mt-1">
            {authView === "login"
              ? "Log in to interact with the feed."
              : "Create an account to start posting."}
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-xl mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {authView === "signup" && (
            <>
              <input
                type="text"
                placeholder="Username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl px-4 py-3 outline-none focus:border-zinc-500 transition text-sm"
              />
              <input
                type="text"
                placeholder="Display Name"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl px-4 py-3 outline-none focus:border-zinc-500 transition text-sm"
              />
            </>
          )}

          <input
            type="email"
            placeholder="Email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl px-4 py-3 outline-none focus:border-zinc-500 transition text-sm"
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl px-4 py-3 outline-none focus:border-zinc-500 transition text-sm"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl transition flex justify-center items-center gap-2 mt-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {authView === "login" ? "Log In" : "Sign Up"}
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-zinc-500">
          {authView === "login"
            ? "Don't have an account? "
            : "Already have an account? "}
          <button
            onClick={toggleView}
            className="text-white hover:underline font-semibold"
          >
            {authView === "login" ? "Sign up" : "Log in"}
          </button>
        </div>
      </div>
    </div>
  );
}
