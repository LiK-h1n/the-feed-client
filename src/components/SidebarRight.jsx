import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api';

export default function SidebarRight() {
  const { user, setAuthModalOpen, setAuthView } = useContext(AuthContext);
  const [latestUsers, setLatestUsers] = useState([]);
  const [mostFollowed, setMostFollowed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [latestRes, popularRes] = await Promise.all([
          api.get('/user/latest'),
          api.get('/user/most-followed')
        ]);
        setLatestUsers(latestRes.data);
        setMostFollowed(popularRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const handleFollow = async (u, section) => {
    if (!user) {
      setAuthView("login");
      setAuthModalOpen(true);
      return;
    }
    try {
      const { data } = await api.post(`/user/follow`, { followingId: u.id });
      const updateState = (prev) => prev.map(item => 
        item.id === u.id ? { ...item, isFollowing: data.followed } : item
      );
      
      if (section === 'latest') setLatestUsers(updateState);
      else setMostFollowed(updateState);
    } catch (error) {
      console.error("Error toggling follow:", error);
    }
  };

  return (
    <aside className="w-72 flex-shrink-0 hidden lg:block">
      <div className="sticky top-20 flex flex-col gap-5">
        
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4">
          <h3 className="text-white font-bold text-sm mb-4">Latest users</h3>
          <div className="flex flex-col gap-3">
            {loading ? <div className="text-zinc-500 text-xs">Loading...</div> : 
              latestUsers.map((u) => (
                <div key={u.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center text-sm">{u.avatar}</div>
                    <div>
                      <div className="text-sm font-semibold text-white">{u.name}</div>
                      <div className="text-xs text-zinc-500">@{u.username}</div>
                    </div>
                  </div>
                  <button onClick={() => handleFollow(u, 'latest')} className={`${u.isFollowing ? 'bg-zinc-700 text-white' : 'bg-zinc-200 text-zinc-900'} text-xs font-semibold px-3 py-1.5 rounded-full`}>
                    {u.isFollowing ? 'Following' : 'Follow'}
                  </button>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4">
          <h3 className="text-white font-bold text-sm mb-4">Most followed</h3>
          <div className="flex flex-col gap-3">
            {mostFollowed.map((u) => (
              <div key={u.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center text-sm">{u.avatar}</div>
                  <div>
                    <div className="text-sm font-semibold text-white">{u.name}</div>
                    <div className="text-xs text-zinc-500">@{u.username}</div>
                  </div>
                </div>
                <button onClick={() => handleFollow(u, 'popular')} className={`${u.isFollowing ? 'bg-zinc-700 text-white' : 'bg-zinc-200 text-zinc-900'} text-xs font-semibold px-3 py-1.5 rounded-full`}>
                  {u.isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4 text-xs text-zinc-400">
          <h3 className="text-white font-bold text-sm mb-3">Announcements</h3>
          <ul className="list-disc list-inside space-y-1.5">
            <li>System is now tracking your follows!</li>
            <li>Database and UI are finally synced.</li>
          </ul>
        </div>
      </div>
    </aside>
  );
}