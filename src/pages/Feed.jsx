import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../api";
import PostCard from "../components/PostCard";
import CreatePost from "../components/CreatePost";

export default function Feed({ showCreate, setShowCreate }) {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(!!user);
  const [activeTab, setActiveTab] = useState("recent");

  useEffect(() => {
    if (!user) return;

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
  }, [user]);

  const handleNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
    if (setShowCreate) setShowCreate(false);
  };

  if (!user) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold text-white mb-3">
          Welcome to //TheFeed
        </h2>
        <p className="text-zinc-400 mb-6">
          Log in or sign up to join the feed.
        </p>
        <div className="flex justify-center gap-3">
          <Link
            to="/login"
            className="bg-red-500 text-white px-5 py-2 rounded-xl font-bold text-sm"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="bg-zinc-800 text-white px-5 py-2 rounded-xl font-bold text-sm"
          >
            Sign up
          </Link>
        </div>
      </div>
    );
  }

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
          onClick={() => setActiveTab("following")}
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

      {(showCreate || activeTab === "recent") && (
        <CreatePost onPostCreated={handleNewPost} />
      )}

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
