import { useState } from "react";
import { Image as ImageIcon, Loader2 } from "lucide-react";
import api from "../api";

export default function CreatePost({ onPostCreated }) {
  const [body, setBody] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!body.trim() && !file) return;

    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();
      if (body) formData.append("body", body);
      if (file) formData.append("image", file);

      const response = await api.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setBody("");
      clearFile();
      if (onPostCreated) onPostCreated(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4 mb-6">
      <form onSubmit={handleSubmit}>
        {error && <div className="text-red-400 text-xs mb-2">{error}</div>}
        <textarea
          className="w-full resize-none outline-none text-zinc-100 placeholder-zinc-500 bg-transparent text-sm"
          rows="3"
          placeholder="What's on your mind?"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          disabled={loading}
        />

        {preview && (
          <div className="relative mt-2 mb-3">
            <img
              src={preview}
              alt="Upload preview"
              className="max-h-60 rounded-xl object-cover"
            />
            <button
              type="button"
              onClick={clearFile}
              className="absolute top-2 left-2 bg-black/70 text-white rounded-full px-3 py-1 text-xs"
            >
              Remove
            </button>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-zinc-800/80 pt-3 mt-1">
          <div>
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              disabled={loading}
            />
            <label
              htmlFor="image-upload"
              className="flex items-center gap-2 text-zinc-400 hover:text-white font-medium cursor-pointer text-xs"
            >
              <ImageIcon className="w-4 h-4" />
              <span>Photo</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading || (!body.trim() && !file)}
            className="bg-red-500/90 hover:bg-red-500 text-white px-5 py-1.5 rounded-full font-bold text-xs disabled:opacity-40 transition"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
