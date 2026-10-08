// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Feed from "./pages/Feed";
import SidebarLeft from "./components/SidebarLeft";
import SidebarRight from "./components/SidebarRight";
import AuthModal from "./components/AuthModal";
import CreatePost from "./components/CreatePost";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <AuthModal />
      <div className="min-h-screen bg-[#0d0d0f] text-zinc-100 flex flex-col">
        <Header />

        <div className="max-w-7xl mx-auto px-6 py-6 flex gap-8 w-full flex-1">
          <SidebarLeft />

          <main className="flex-1 max-w-xl mx-auto w-full">
            <Routes>
              <Route path="/" element={<Feed />} />
              <Route path="/create" element={<CreatePost />} />
            </Routes>
          </main>

          <SidebarRight />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;