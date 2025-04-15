/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { ScapeApi } from "../../api/scapeApi";
import { toast } from "react-toastify";
import ModalBase from "./ModalBase";

interface AddObject {
  title: string;
  description: string;
}

const AddScapeLightObject = ({
  scapeId,
  fetchScape,
}: {
  scapeId: string;
  fetchScape: any;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newObject, setNewObject] = useState<AddObject>({
    title: "",
    description: "",
  });

  const [file, setFile] = useState<any>(null);

  const handleFileChange = (event: any) => {
    if (!event.target.files[0]) return;

    setFile(event.target.files[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", newObject.title);
    formData.append("description", newObject.description);

    if (file) {
      formData.append("file", file);
    }

    formData.append("upload_preset", "scape");

    ScapeApi.addScapeObject(scapeId, formData)
      .then((res) => {
        console.log(res);
        toast.success("Object added successfully");
        setLoading(false);
        fetchScape();
      })
      .catch((err) => {
        toast.error(err.response.data.message || "Something went wrong");
        setLoading(false);
      });
  };
  return (
    <div>
      <button onClick={() => setIsModalOpen(true)} className="my_button">
        <div className="button">
          <p className="text-main">Add Scape Object</p>
        </div>
      </button>

      <ModalBase
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Scape Object"
        hideCancel={true}
      >
        <form action="" onSubmit={handleSubmit} className="space-y-2">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              className="input"
              value={newObject.title}
              onChange={(e) =>
                setNewObject({ ...newObject, title: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              className="input"
              value={newObject.description}
              onChange={(e) =>
                setNewObject({ ...newObject, description: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="file">File</label>
            <input
              type="file"
              id="file"
              className="input"
              onChange={handleFileChange}
            />
          </div>
          <button type="submit" className="button" disabled={loading}>
            <p className="text-main">
              {loading ? "Adding Object..." : "Add Object"}
            </p>
          </button>
        </form>
      </ModalBase>
    </div>
  );
};

export default AddScapeLightObject;
