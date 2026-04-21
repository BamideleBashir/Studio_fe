import { useState, useEffect } from "react";
import ModalBase from "./ModalBase";
import { IScape } from "../../types";
import { ScapeApi } from "../../api/scapeApi";
import { toast } from "react-toastify";

type Props = {
  open: boolean;
  onClose: () => void;
  scape: IScape;
  onSuccess: () => void;
};

const categoryList = [
  "Entertainment",
  "Education",
  "social",
  "Government",
  "transportation",
  "commerce",
  "health",
  "real estate",
  "environment",
];

const EditScapeModal = ({ open, onClose, scape, onSuccess }: Props) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    viewingAccess: "public",
    commentAccess: "disabled",
    enableSearchEngine: false,
    keywords: "",
  });

  useEffect(() => {
    if (scape && open) {
      setFormData({
        title: scape.title || "",
        description: scape.description || "",
        category: scape.category || "",
        viewingAccess: scape.viewingAccess || "public",
        commentAccess: scape.commentAccess || "disabled",
        enableSearchEngine: scape.enableSearchEngine || false,
        keywords: scape.keywords ? scape.keywords.join(", ") : "",
      });
    }
  }, [scape, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.category) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        keywords: formData.keywords.split(",").map((k) => k.trim()).filter((k) => k),
      };

      await ScapeApi.update(scape._id, payload);
      toast.success("Scape updated successfully");
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to update scape");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalBase open={open} onClose={onClose} title="Edit Scape Details">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left mt-2">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-black">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-black"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-black">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm h-20 outline-none focus:border-black"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-black">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-black capitalize"
              required
            >
              <option value="">Select a category</option>
              {categoryList.map((cat) => (
                <option key={cat} value={cat} className="capitalize">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-black">Viewing Access</label>
            <select
              value={formData.viewingAccess}
              onChange={(e) => setFormData({ ...formData, viewingAccess: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-black"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="admins">Admins</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-black">Comment Access</label>
            <select
              value={formData.commentAccess}
              onChange={(e) => setFormData({ ...formData, commentAccess: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-black"
            >
              <option value="disabled">Disabled</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="admins">Admins</option>
            </select>
          </div>

          <div className="flex flex-col gap-1 justify-center">
            <label className="flex items-center gap-2 text-sm font-semibold text-black cursor-pointer mt-5">
              <input
                type="checkbox"
                checked={formData.enableSearchEngine}
                onChange={(e) => setFormData({ ...formData, enableSearchEngine: e.target.checked })}
                className="w-4 h-4 accent-black"
              />
              Enable Search Engine
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-black">Keywords (comma separated)</label>
          <input
            type="text"
            value={formData.keywords}
            onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-black"
            placeholder="e.g. mapping, environment, transport"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="black_button w-full mt-4"
        >
          {loading ? "Updating..." : "Save Changes"}
        </button>
      </form>
    </ModalBase>
  );
};

export default EditScapeModal;
