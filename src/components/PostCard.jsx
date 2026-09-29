// src/components/PostCard.jsx
import { useState, useContext } from "react";
import { Heart, MessageSquare } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import api from "../api";

export default function PostCard({ post }) {
  const { user } = useContext(AuthContext);

  const hasLiked = user
    ? post.likes?.some((like) => like.userId === user.id)
    : false;
  const [liked, setLiked] = useState(hasLiked);
  const [likeCount, setLikeCount] = useState(post.likes?.length || 0);

  const handleLike = async () => {
    if (!user) return;
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);

    try {
      await api.post(`/posts/${post.id}/like`);
    } catch (error) {
      setLiked(liked);
      setLikeCount(liked ? likeCount + 1 : likeCount - 1);
      console.error("Failed to toggle like", error);
    }
  };

  return (
    <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-5 mb-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-200 font-bold text-sm">
          {post.author?.displayName?.charAt(0).toUpperCase() || "U"}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-white text-sm">
              {post.author?.displayName || "User"}
            </span>
            <span className="text-zinc-500 text-xs">• 1 day ago</span>
          </div>
        </div>
      </div>

      {post.body && (
        <p className="text-zinc-200 text-sm mb-4 leading-relaxed whitespace-pre-wrap">
          {post.body}
        </p>
      )}

      {post.attachment && (
        <img
          src={post.attachment}
          alt="Post attachment"
          className="rounded-xl w-full object-cover max-h-96 mb-4 border border-zinc-800"
        />
      )}

      <div className="flex items-center gap-6 text-zinc-400 text-xs font-semibold pt-1">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1.5 transition ${liked ? "text-red-500" : "hover:text-white"}`}
        >
          <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
          <span>{likeCount}</span>
        </button>

        <button className="flex items-center gap-1.5 hover:text-white transition">
          <MessageSquare className="w-4 h-4" />
          <span>0</span>
        </button>
      </div>
    </div>
  );
}
