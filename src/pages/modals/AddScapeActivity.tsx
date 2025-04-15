/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import ActivityApi from "../../api/activityApi";
import { ScapeApi } from "../../api/scapeApi";
import { toast } from "react-toastify";
import ModalBase from "./ModalBase";

type Icon = {
  public_id: string;
  url: string;
};

interface IActivityResponse {
  icon: Icon;
  _id: string;
  user: string;
  title: string;
  category: string;
  description: string;
  access: string;
  createdAt: string; // Assuming ISO 8601 format
}

type AddActivity = {
  activityId: string;
  permission: string;
};
const AddScapeActivity = ({ scapeId, fetchScape }: { scapeId: string, fetchScape: any }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newActivity, setNewActivity] = useState<AddActivity>({
    activityId: "",
    permission: "",
  });

  const [activities, setActivities] = useState<IActivityResponse[]>([]);

  const fetchActivities = async () => {
    ActivityApi.getAllActivity().then((res) => {
      console.log('all acts', res.data)
      setActivities(res.data.docs);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleAddActivity = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const payload = {
      activityId: newActivity.activityId,
      permission: newActivity.permission,
    };

    ScapeApi.addActivityToScape(scapeId, payload)
      .then((res) => {
        console.log(res);
        fetchScape();
        toast.success("Add activity successfully");
        setLoading(false);
        setIsModalOpen(false);
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
          <p className="text-main">Add Activity</p>
        </div>
      </button>

      <ModalBase
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Scape Activity"
        hideCancel={true}
      >
        <form action="" onSubmit={handleAddActivity}>
          <div className="form-group mb-3">
            <label htmlFor="activityId">Activity</label>
            <select
              name="activityId"
              id="activityId"
              className="input"
              required
              value={newActivity.activityId}
              onChange={(e) =>
                setNewActivity({
                  ...newActivity,
                  activityId: e.target.value,
                })
              }
            >
              <option value="">Select Activity</option>
              {activities.map((activity) => (
                <option key={activity._id} value={activity._id}>
                  {activity.title}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group mb-3">
            <label htmlFor="permission">Permission</label>
            <select
              name="permission"
              id="permission"
              className="input"
              required
              value={newActivity.permission}
              onChange={(e) =>
                setNewActivity({
                  ...newActivity,
                  permission: e.target.value,
                })
              }
            >
              <option value="">Select Permission</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" className="button" disabled={loading}>
            <p className="text-main">
              {loading ? "Loading..." : "Add Activity"}
            </p>
          </button>
        </form>
      </ModalBase>
    </div>
  );
};

export default AddScapeActivity;
