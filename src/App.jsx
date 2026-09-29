import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const { user, logout } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-sm p-4 flex justify-between items-center max-w-4xl mx-auto mb-6">
          <Link
            to="/"
            className="font-bold text-2xl text-blue-600 hover:text-blue-700"
          >
            //TheFeed
          </Link>

          <div>
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-gray-700">
                  Hi, {user.displayName}
                </span>
                <button
                  onClick={logout}
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300 text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-4">
                <Link
                  to="/login"
                  className="text-blue-600 font-medium hover:underline mt-1"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-600 text-white px-4 py-1 rounded font-medium hover:bg-blue-700"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </nav>

        <main className="max-w-4xl mx-auto px-4">
          <Routes>
            <Route
              path="/"
              element={
                <h1 className="text-center mt-10">Feed Page Coming Soon</h1>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
