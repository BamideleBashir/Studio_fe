/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { IScapeFormState } from "../CreateScape";
import ScapeGeometry from "./ScapeGeometry";
import SearchEngine from "./SearchEngine";
import { toast } from "react-toastify";
import { ScapeApi } from "../../api/scapeApi";
import { useNavigate } from "react-router-dom";

type Props = {
  formData: IScapeFormState;
  setFormData: (formData: any) => void;
  setSelectedTab: (value: string) => void;
};

const ScapeMetadata = ({ formData, setFormData, setSelectedTab }: Props) => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const handleComplete = () => {
    console.log("Scape Metadata Complete");
    console.log(formData);

    // if (!formData.geometry.coordinates.length) {
    //   toast.error("Please add spatial domain");
    //   return;
    // }

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

    payload.append("viewingAccess", formData.viewingAccess);
    payload.append("commentAccess", formData.commentAccess);
    payload.append("keywords", formData.keywords.join(","));
    // payload.append("admins", formData.admins.join(","));
    payload.append("objects", JSON.stringify(objects));
    // if there is geometry, append it
    if (formData.geometry.coordinates.length) {
      payload.append("geometry", JSON.stringify(formData.geometry));
    }
    payload.append("owner", JSON.stringify(formData.owner));
    payload.append(
      "enableSearchEngine",
      formData.enableSearchEngine.toString()
    );

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
          <h3 className="font-medium"> View Access</h3>

          {/* select dropdown */}
          <select
            className="w-full border border-gray-300 rounded-md p-2"
            onChange={(e) => {
              setFormData({
                ...formData,
                viewingAccess: e.target.value,
              });
            }}
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="admins">Admins</option>
          </select>
        </div>

        {/* comment access */}
        <div className="mt-4">
          <h3 className="font-medium">Comment Access</h3>

          {/* select dropdown */}
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

        {/* IMAGE */}
        <div className="mt-4">
          <h3 className="font-medium">Image</h3>

          <p className="text-sm text-gray-500">
            Select an Icon that represents your Scape.
          </p>

          {/* select dropdown */}
          <input
            type="file"
            className="w-full border border-gray-300 rounded-md p-2"
            onChange={handleFileChange}
          />

          {/* PREVIEW */}
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

      <div className="mt-6">
        <button
          onClick={() => handleComplete()}
          className="bg-primary text-white p-3 rounded-lg block w-full"
        >
          {isLoading ? "Creating..." : "Create Scape"}
        </button>
      </div>

      <div className="mt-6">
        <button
          onClick={() => setSelectedTab("scape_objects")}
          className="bg-white font-bold text-black p-2 px-4 rounded-lg block w-full"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ScapeMetadata;
