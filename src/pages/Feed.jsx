import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../api";
import PostCard from "../components/PostCard";
import CreatePost from "../components/CreatePost";

export default function Feed() {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(!!user);

  useEffect(() => {
    if (!user) {
      return;
    }

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
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-500 font-medium">
        Loading feed...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to //TheFeed
        </h2>
        <p className="text-gray-600 mb-8 text-lg">
          Log in or sign up to see what developers are sharing.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/login"
            className="bg-blue-600 text-white px-6 py-2 rounded font-bold hover:bg-blue-700 transition duration-200"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="bg-white text-blue-600 border border-blue-600 px-6 py-2 rounded font-bold hover:bg-gray-50 transition duration-200"
          >
            Sign up
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto pb-10">
      <CreatePost onPostCreated={handleNewPost} />

      {posts.length === 0 ? (
        <div className="text-center text-gray-500 mt-10 bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <p className="text-lg">No posts yet.</p>
          <p className="text-sm mt-2">Be the first to share something!</p>
        </div>
      ) : (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </div>
  );
}
