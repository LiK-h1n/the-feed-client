import { useState } from "react";
import { Paperclip, Tag, Link, Loader2, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function CreatePost() {
  const navigate = useNavigate();
  const [body, setBody] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [activeTab, setActiveTab] = useState("file");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [githubUrl, setGithubUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((t) => t !== tagToRemove));
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
      if (githubUrl) formData.append("githubUrl", githubUrl);
      if (tags.length > 0) formData.append("tags", JSON.stringify(tags));

      await api.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col">
        {error && <div className="text-red-400 text-sm mb-4">{error}</div>}

        <textarea
          className="w-full h-40 resize-none outline-none text-zinc-100 placeholder-zinc-500 bg-transparent text-lg mb-4"
          placeholder="Share whats happening.."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          maxLength={2000}
          disabled={loading}
        />

        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3 mb-6">
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setActiveTab("file")}
              className={`pb-1 border-b-2 transition-all ${activeTab === "file" ? "border-white text-white" : "border-transparent text-zinc-400 hover:text-zinc-200"}`}
            >
              <Paperclip className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("tags")}
              className={`pb-1 border-b-2 transition-all ${activeTab === "tags" ? "border-white text-white" : "border-transparent text-zinc-400 hover:text-zinc-200"}`}
            >
              <Tag className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("github")}
              className={`pb-1 border-b-2 transition-all ${activeTab === "github" ? "border-white text-white" : "border-transparent text-zinc-400 hover:text-zinc-200"}`}
            >
              <Link className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-zinc-500 text-xs font-medium">
              {body.length}/2000
            </span>
            <button
              type="submit"
              disabled={loading || (!body.trim() && !file)}
              className="bg-white text-black px-5 py-1.5 rounded-full font-bold text-sm disabled:opacity-50 transition"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Post"}
            </button>
          </div>
        </div>

        <div className="min-h-[100px]">
          {activeTab === "file" && (
            <div className="animate-in fade-in duration-200">
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                disabled={loading}
              />
              {!preview ? (
                <label
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-zinc-800 rounded-xl cursor-pointer hover:bg-zinc-900/50 hover:border-zinc-700 transition"
                >
                  <Paperclip className="w-6 h-6 text-zinc-500 mb-2" />
                  <span className="text-zinc-500 text-sm">
                    Click to upload an image
                  </span>
                </label>
              ) : (
                <div className="relative inline-block">
                  <img
                    src={preview}
                    alt="Upload preview"
                    className="max-h-64 rounded-xl object-cover border border-zinc-800"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setFile(null);
                      setPreview(null);
                    }}
                    className="absolute top-2 left-2 bg-black/70 text-white rounded-full p-1.5 hover:bg-black transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === "tags" && (
            <div className="animate-in fade-in duration-200">
              <label className="text-zinc-400 text-sm mb-2 block">Tags:</label>
              <div className="flex flex-wrap gap-2 mb-3">
                {tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="bg-zinc-800 text-zinc-200 text-xs px-3 py-1 rounded-full flex items-center gap-1"
                  >
                    {t}
                    <button
                      type="button"
                      onClick={() => removeTag(t)}
                      className="hover:text-red-400"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Please Enter to push a new tag."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                className="w-full bg-transparent border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white focus:border-zinc-500 outline-none transition"
              />
            </div>
          )}

          {activeTab === "github" && (
            <div className="animate-in fade-in duration-200">
              <label className="text-zinc-400 text-sm mb-2 block">
                GitHub Repository:
              </label>
              <div className="flex items-center bg-transparent border border-zinc-800 rounded-lg overflow-hidden focus-within:border-zinc-500 transition">
                <div className="pl-4 text-zinc-500">
                  <Link className="w-4 h-4" />
                </div>
                <input
                  type="url"
                  placeholder="https://github.com/username/repo"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  className="w-full bg-transparent px-3 py-2.5 text-sm text-white outline-none"
                />
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
