/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { IScapeFormState } from "../CreateScape";
import ScapeGeometry from "./ScapeGeometry";
import SearchEngine from "./SearchEngine";
import { toast } from "react-toastify";
import { ScapeApi } from "../../api/scapeApi";
import { ProfileApi } from "../../api/profileApi";
import { useNavigate } from "react-router-dom";

type Props = {
  formData: IScapeFormState;
  setFormData: (formData: any) => void;
  setSelectedTab: (value: string) => void;
};

interface AdminUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  photo?: { url: string };
}

const ScapeMetadata = ({ formData, setFormData, setSelectedTab }: Props) => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminLookupLoading, setAdminLookupLoading] = useState(false);
  const [resolvedAdmins, setResolvedAdmins] = useState<AdminUser[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleAdminEmailAdd = async () => {
    if (!adminEmail.trim()) return;
    if (resolvedAdmins.some((a) => a.email === adminEmail.trim().toLowerCase())) {
      toast.info("User already added");
      return;
    }
    setAdminLookupLoading(true);
    try {
      const res = await ProfileApi.lookupByEmail(adminEmail.trim());
      const user: AdminUser = res.data;
      setResolvedAdmins((prev) => [...prev, user]);
      setFormData({ ...formData, admins: [...formData.admins, user._id] });
      setAdminEmail("");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "User not found");
    } finally {
      setAdminLookupLoading(false);
    }
  };

  const handleRemoveAdmin = (userId: string) => {
    setResolvedAdmins((prev) => prev.filter((a) => a._id !== userId));
    setFormData({ ...formData, admins: formData.admins.filter((id) => id !== userId) });
  };

  const [isLoading, setIsLoading] = useState(false);
  const handleComplete = () => {
    const objects = formData.objects.map((obj) => {
      return {
        ...obj,
        nucleus: obj.nucleus._id,
      };
    });

    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append("description", formData.description);
    payload.append("category", formData.category);
    if (formData.canPinHumans)
      payload.append("canPinHumans", formData.canPinHumans.toString());
    if (formData.canPinHumans && formData.humanFunctions.length > 0)
      payload.append("humanFunctions", JSON.stringify(formData.humanFunctions));

    payload.append("viewingAccess", formData.viewingAccess);
    payload.append("commentAccess", formData.commentAccess);
    payload.append("keywords", formData.keywords.join(","));
    if (formData.admins.length > 0)
      payload.append("admins", JSON.stringify(formData.admins));
    payload.append("objects", JSON.stringify(objects));
    if (formData.activities.length > 0) {
      const activities = formData.activities.map((item) => ({
        activity: item.activity._id,
        pinAccess: item.pinAccess,
      }));
      payload.append("activities", JSON.stringify(activities));
    }
    if (formData.geometry.coordinates.length) {
      payload.append("geometry", JSON.stringify(formData.geometry));
    }
    if (formData.position?.coordinates?.length === 2) {
      payload.append("position", JSON.stringify(formData.position));
    }
    if (formData.location?.displayName) {
      payload.append("location", JSON.stringify(formData.location));
    }
    payload.append("owner", JSON.stringify(formData.owner));
    payload.append("enableSearchEngine", formData.enableSearchEngine.toString());
    if (formData.primaryObject) {
      payload.append("primaryObject", formData.primaryObject);
    }

    if (file) {
      payload.append("file", file);
    } else {
      toast.info("No file selected");
      return;
    }

    setIsLoading(true);
    ScapeApi.create(payload)
      .then((res) => {
        console.log(res);
        toast.info("Scape Created");
        setIsLoading(false);
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        toast.error(err.response.data.message || "Something went wrong");
      });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-black mb-4">Add Scape Metadata</h1>

      <div>
        {/* viewing access */}
        <div>
          <h3 className="font-medium">View Access</h3>
          <select
            className="w-full border border-gray-300 rounded-md p-2"
            value={formData.viewingAccess}
            onChange={(e) => {
              setFormData({
                ...formData,
                viewingAccess: e.target.value,
                admins: [],
              });
              setResolvedAdmins([]);
            }}
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="admins">Admins</option>
          </select>
        </div>

        {/* admins email input — visible only when viewingAccess === "admins" */}
        {formData.viewingAccess === "admins" && (
          <div className="mt-3 border border-gray-200 rounded-md p-3 bg-gray-50">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Add Admins by Email</h4>
            <div className="flex gap-2">
              <input
                type="email"
                className="flex-1 border border-gray-300 rounded-md p-2 text-sm"
                placeholder="user@example.com"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAdminEmailAdd();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAdminEmailAdd}
                disabled={adminLookupLoading || !adminEmail.trim()}
                className="px-3 py-2 bg-black text-white text-sm rounded-md disabled:opacity-50"
              >
                {adminLookupLoading ? "..." : "Add"}
              </button>
            </div>

            {resolvedAdmins.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {resolvedAdmins.map((admin) => (
                  <div
                    key={admin._id}
                    className="flex items-center gap-1 bg-white border border-gray-300 rounded-full px-3 py-1 text-sm"
                  >
                    <span>
                      {admin.firstName} {admin.lastName}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveAdmin(admin._id)}
                      className="text-gray-400 hover:text-red-500 ml-1"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* comment access */}
        <div className="mt-4">
          <h3 className="font-medium">Comment Access</h3>
          <select
            className="w-full border border-gray-300 rounded-md p-2"
            onChange={(e) => {
              setFormData({
                ...formData,
                commentAccess: e.target.value,
              });
            }}
          >
            <option value="disabled">Disabled</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="admins">Admins</option>
          </select>
        </div>

        <SearchEngine scapeState={formData} setScapeState={setFormData} />

        <ScapeGeometry scapeState={formData} setScapeState={setFormData} />

        {/* primary object */}
        {formData.objects.length > 0 && (
          <div className="mt-4">
            <h3 className="font-medium">Primary Object</h3>
            <p className="text-sm text-gray-500 mb-1">
              Optionally select one object as the primary representative of this scape.
            </p>
            <select
              className="w-full border border-gray-300 rounded-md p-2"
              value={formData.primaryObject}
              onChange={(e) =>
                setFormData({ ...formData, primaryObject: e.target.value })
              }
            >
              <option value="">None</option>
              {formData.objects.map((obj) => (
                <option key={obj.nucleus._id} value={obj.nucleus._id}>
                  {obj.nucleus.title}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* IMAGE */}
        <div className="mt-4">
          <h3 className="font-medium">Image</h3>
          <p className="text-sm text-gray-500">
            Select an Icon that represents your Scape.
          </p>
          <input
            type="file"
            className="w-full border border-gray-300 rounded-md p-2"
            onChange={handleFileChange}
          />
          {file && (
            <div className="mt-4">
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="w-48 h-48 object-cover rounded-lg"
              />
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <button
          onClick={() => handleComplete()}
          className="black_button w-full"
        >
          {isLoading ? "Creating..." : "Create Scape"}
        </button>
        <button
          onClick={() => setSelectedTab("scape_activities")}
          className="bg-white border border-gray-300 text-gray-700 font-bold py-3 rounded-full hover:bg-gray-50 transition-colors block w-full"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ScapeMetadata;
