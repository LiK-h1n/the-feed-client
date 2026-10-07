import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api';

export default function SidebarRight() {
  const { user, setAuthModalOpen, setAuthView } = useContext(AuthContext);
  const [latestUsers, setLatestUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const mostFollowed = [
    { id: '1', name: "Admin", username: "LegalUnicorn", avatar: "A" },
    { id: '2', name: "tt", username: "tabs", avatar: "T" },
    { id: '3', name: "LegalUnicorn", username: "tester", avatar: "L" },
  ];

  useEffect(() => {
    const fetchLatestUsers = async () => {
      try {
        const { data } = await api.get('/user/latest');
        setLatestUsers(data);
      } catch (error) {
        console.error("Error fetching latest users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLatestUsers();
  }, []);

  const handleFollow = async (userId) => {
    if (!user) {
      setAuthView("login");
      setAuthModalOpen(true);
      return;
    }
    try {
      await api.post(`/users/follow/${userId}`);
      
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  return (
    <aside className="w-72 flex-shrink-0 hidden lg:block">
      <div className="sticky top-20 flex flex-col gap-5">
        
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4">
          <h3 className="text-white font-bold text-sm mb-4">Latest users</h3>
          <div className="flex flex-col gap-3">
            {loading ? (
              <div className="text-zinc-500 text-xs">Loading...</div>
            ) : (
              latestUsers.map((u) => (
                <div key={u.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-zinc-300 text-sm">
                      {u.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white leading-tight">{u.name}</div>
                      <div className="text-xs text-zinc-500">@{u.username}</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleFollow(u.id)}
                    className="bg-zinc-200 text-zinc-900 hover:bg-white text-xs font-semibold px-3 py-1.5 rounded-full transition"
                  >
                    Follow
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

       <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4">
          <h3 className="text-white font-bold text-sm mb-4">Most followed</h3>
          <div className="flex flex-col gap-3">
            {mostFollowed.map((u) => (
              <div key={u.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-zinc-300 text-sm">
                    {u.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white leading-tight">{u.name}</div>
                    <div className="text-xs text-zinc-500">@{u.username}</div>
                  </div>
                </div>
                <button 
                  onClick={() => handleFollow(u.id)}
                  className="bg-zinc-200 text-zinc-900 hover:bg-white text-xs font-semibold px-3 py-1.5 rounded-full transition"
                >
                  Follow
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4 text-xs text-zinc-400">
          <h3 className="text-white font-bold text-sm mb-3">Announcements</h3>
          <ul className="list-disc list-inside space-y-1.5 leading-relaxed">
            <li>Trying my best to get this thing to work 🫠</li>
            <li>Duct tape and console.logs are holding the server together.</li>
          </ul>
          <div className="mt-4 text-zinc-500 text-[11px]">
            Last updated: 29 Sept 2026
          </div>
        </div>
      </div>
    </aside>
  );
}