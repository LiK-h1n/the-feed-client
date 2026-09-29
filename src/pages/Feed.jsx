import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api";
import PostCard from "../components/PostCard";
import CreatePost from "../components/CreatePost";

export default function Feed({ showCreate, setShowCreate }) {
  const { user, setAuthModalOpen, setAuthView } = useContext(AuthContext);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("recent");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch posts", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
    if (setShowCreate) setShowCreate(false);
  };

  const handleFollowingTabClick = () => {
    if (!user) {
      setAuthView("login");
      setAuthModalOpen(true);
      return;
    }
    setActiveTab("following");
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-center gap-6 border-b border-zinc-800/80 mb-6 pb-2">
        <button
          onClick={() => setActiveTab("recent")}
          className={`text-sm font-bold pb-2 relative transition ${
            activeTab === "recent"
              ? "text-white"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          Recent
          {activeTab === "recent" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500 rounded-full" />
          )}
        </button>
        <button
          onClick={handleFollowingTabClick}
          className={`text-sm font-bold pb-2 relative transition ${
            activeTab === "following"
              ? "text-white"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          Following
          {activeTab === "following" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500 rounded-full" />
          )}
        </button>
      </div>

      {user && showCreate && <CreatePost onPostCreated={handleNewPost} />}

      {loading ? (
        <div className="text-center py-10 text-zinc-500 text-sm font-medium">
          Loading feed...
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center text-zinc-500 py-12 bg-zinc-900/30 rounded-2xl border border-zinc-800/60">
          <p className="text-sm">No posts yet.</p>
        </div>
      ) : (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </div>
  );
}
