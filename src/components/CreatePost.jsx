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
    if (!body.trim() && !file) {
      setError("Please add text or an image to post.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();
      if (body) formData.append("body", body);
      if (file) formData.append("image", file);

      const response = await api.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setBody("");
      clearFile();

      if (onPostCreated) {
        onPostCreated(response.data);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create post");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
      <form onSubmit={handleSubmit}>
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

        <textarea
          className="w-full resize-none outline-none text-gray-800 placeholder-gray-400 bg-transparent"
          rows="3"
          placeholder="What's on your mind?"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          disabled={loading}
        />

        {preview && (
          <div className="relative mt-2 mb-4">
            <img
              src={preview}
              alt="Upload preview"
              className="max-h-64 rounded-lg object-cover"
            />
            <button
              type="button"
              onClick={clearFile}
              className="absolute top-2 left-2 bg-gray-800 bg-opacity-70 text-white rounded-full px-3 py-1 text-sm hover:bg-opacity-90"
            >
              Remove
            </button>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-gray-100 pt-3 mt-2">
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
              className="flex items-center gap-2 text-blue-600 font-medium cursor-pointer hover:bg-blue-50 px-3 py-1.5 rounded transition duration-200"
            >
              <ImageIcon className="w-5 h-5" />
              <span className="text-sm">Photo</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading || (!body.trim() && !file)}
            className="bg-blue-600 text-white px-5 py-1.5 rounded-full font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition duration-200"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? "Posting..." : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
