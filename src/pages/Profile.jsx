import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import PulseGraph from '../components/PulseGraph';

export default function Profile() {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [activity, setActivity] = useState([]);

  // In Profile.jsx
  useEffect(() => {
      const fetchData = async () => {
        try {
          // Encode the username to safely handle spaces and special characters
          const safeUsername = encodeURIComponent(username);
          
          const [profileRes, activityRes] = await Promise.all([
            api.get(`/user/profile/${safeUsername}`),
            api.get(`/user/activity/${safeUsername}`) 
          ]);
          
          setProfile(profileRes.data);
          setActivity(activityRes.data);
        } catch (err) { 
          console.error(err); 
        }
      };
      if (username) fetchData();
    }, [username]);

  if (!profile) return <div className="text-zinc-500 p-10 text-center">Loading Pulse...</div>;

  return (
    <div className="text-white max-w-2xl mx-auto py-8 px-4">
      <div className="flex items-center gap-6 mb-8 border-b border-zinc-800 pb-8">
        <div className="w-24 h-24 rounded-full bg-red-500/10 flex items-center justify-center text-3xl font-bold border border-red-500/20 text-red-500">
          {profile.displayName?.charAt(0)}
        </div>
        <div>
          <h1 className="text-2xl font-bold">{profile.displayName}</h1>
          <p className="text-zinc-400">@{profile.username}</p>
          <div className="flex gap-6 mt-3 text-sm">
            <span className="text-zinc-300"><strong className="text-white">{profile.followerCount}</strong> Followers</span>
            <span className="text-zinc-300"><strong className="text-white">{profile.followingCount}</strong> Following</span>
          </div>
        </div>
      </div>

      {/* The new "Pulse" Graph */}
      <PulseGraph data={activity} />

      <h2 className="font-bold mt-10 mb-6 text-xl">Recent Activity</h2>
      <div className="space-y-4">
        {profile.posts.length > 0 ? profile.posts.map(post => (
          <div key={post.id} className="bg-zinc-900/40 p-5 rounded-2xl border border-zinc-800/60 hover:border-zinc-700 transition">
            <p className="text-zinc-200">{post.body}</p>
            <span className="text-[10px] text-zinc-600 uppercase mt-3 block">{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
        )) : <p className="text-zinc-600 italic">No posts yet.</p>}
      </div>
    </div>
  );
}