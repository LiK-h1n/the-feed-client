import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-sm p-4 text-center font-bold text-xl text-blue-600">
          //TheFeed
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <h1 className="text-center mt-10">Feed Page Coming Soon</h1>
            }
          />
          <Route
            path="/login"
            element={
              <h1 className="text-center mt-10">Login Page Coming Soon</h1>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
