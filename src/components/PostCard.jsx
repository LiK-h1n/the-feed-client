import { useState, useContext } from "react";
import { Heart } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import api from "../api";

export default function PostCard({ post }) {
  const { user } = useContext(AuthContext);

  const hasLiked = user
    ? post.likes.some((like) => like.userId === user.id)
    : false;

  const [liked, setLiked] = useState(hasLiked);
  const [likeCount, setLikeCount] = useState(post.likes.length);

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
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
          {post.author.displayName.charAt(0).toUpperCase()}
        </div>
        <div>
          <h4 className="font-bold text-gray-900 leading-tight">
            {post.author.displayName}
          </h4>
          <span className="text-gray-500 text-sm">@{post.author.username}</span>
        </div>
      </div>

      {post.body && (
        <p className="text-gray-800 mb-3 whitespace-pre-wrap">{post.body}</p>
      )}

      {post.attachment && (
        <img
          src={post.attachment}
          alt="Post attachment"
          className="rounded-lg w-full object-cover max-h-96 mb-3 border border-gray-100"
        />
      )}

      <div className="flex items-center gap-4 mt-2 text-gray-500">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1.5 transition duration-200 ${liked ? "text-red-500" : "hover:text-red-500"}`}
        >
          <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
          <span className="font-medium text-sm">{likeCount}</span>
        </button>
      </div>
    </div>
  );
}
