import { useEffect, useState } from "react";
import {
  IScapeFormState,
  ScapeActivityInput,
  IActivityTemplate,
} from "../CreateScape";
import ActivityApi from "../../api/activityApi";
import { toast } from "react-toastify";

type Props = {
  formData: IScapeFormState;
  setFormData: (formData: IScapeFormState) => void;
  setSelectedTab: (value: string) => void;
};

const ScapeActivities = ({ formData, setFormData, setSelectedTab }: Props) => {
  const [activities, setActivities] = useState<ScapeActivityInput[]>(
    formData.activities,
  );
  const [availableActivities, setAvailableActivities] = useState<
    IActivityTemplate[]
  >([]);
  const [loadingActivities, setLoadingActivities] = useState(false);

  const [selectedActivityId, setSelectedActivityId] = useState("");
  const [pinAccess, setPinAccess] = useState<"public" | "private" | "admins">(
    "public",
  );

  useEffect(() => {
    setLoadingActivities(true);
    ActivityApi.getAllActivity()
      .then((res) => {
        setAvailableActivities(res.data.docs || []);
        setLoadingActivities(false);
      })
      .catch(() => {
        toast.error("Error fetching activities");
        setLoadingActivities(false);
      });
  }, []);

  const addActivity = () => {
    if (!selectedActivityId) {
      toast.info("Please select an activity");
      return;
    }
    // make sure it has not been added before
    if (activities.some((a) => a.activity._id === selectedActivityId)) {
      toast.info("Activity already added");
      return;
    }

    const activityTemplate = availableActivities.find(
      (a) => a._id === selectedActivityId,
    );
    if (!activityTemplate) return;

    const newActivity: ScapeActivityInput = {
      activity: activityTemplate,
      pinAccess,
    };

    const updated = [...activities, newActivity];
    setActivities(updated);
    setFormData({ ...formData, activities: updated });

    setSelectedActivityId("");
    setPinAccess("public");
    toast.info("Activity added");
  };

  const removeActivity = (activityId: string) => {
    const updated = activities.filter((a) => a.activity._id !== activityId);
    setActivities(updated);
    setFormData({ ...formData, activities: updated });
  };

  const handleContinue = () => {
    setSelectedTab("scape_metadata");
  };

  return (
    <div>
      <div className="text-center mt-8 mb-6">
        <h1 className="text-2xl font-bold text-black">Add Scape Activities</h1>
        <p className="text-sm text-gray-500 mt-2">
          Optionally add activities that can be pinned within this scape.
        </p>
      </div>

      <div className="bg-white border rounded-xl p-5 mb-8 shadow-sm">
        <h3 className="font-semibold text-lg mb-4 border-b pb-2">
          Add New Activity
        </h3>

        {loadingActivities ? (
          <p className="text-sm text-gray-500 text-center py-6 bg-gray-50 rounded-lg border border-dashed">
            Loading activities...
          </p>
        ) : availableActivities.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-6 bg-gray-50 rounded-lg border border-dashed">
            No activity templates found.
          </p>
        ) : (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Activity
              </label>
              <select
                value={selectedActivityId}
                onChange={(e) => setSelectedActivityId(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-white focus:ring-2 focus:ring-black outline-none transition-shadow"
              >
                <option value="">Select an activity</option>
                {availableActivities.map((activity) => (
                  <option key={activity._id} value={activity._id}>
                    {activity.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pin Access
              </label>
              <select
                value={pinAccess}
                onChange={(e) =>
                  setPinAccess(
                    e.target.value as "public" | "private" | "admins",
                  )
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-white focus:ring-2 focus:ring-black outline-none transition-shadow"
              >
                <option value="public">Public (Anyone can pin)</option>
                <option value="private">Private (Only you can pin)</option>
                <option value="admins">Admins (Only admins can pin)</option>
              </select>
            </div>

            <button
              onClick={() => addActivity()}
              className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-sm"
            >
              Add Activity to Scape
            </button>
          </>
        )}
      </div>

      {activities.length > 0 && (
        <div className="mb-8">
          <h3 className="font-semibold text-lg mb-3">
            Added Activities ({activities.length})
          </h3>
          <div className="space-y-3">
            {activities.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-white border border-gray-200 p-4 rounded-xl shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <img
                    className="w-14 h-14 rounded-lg object-cover bg-gray-50 border"
                    src={item.activity.icon?.url}
                    alt=""
                  />
                  <div>
                    <p className="font-bold">{item.activity.title}</p>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-600 font-medium">
                      <span className="bg-gray-100 px-2 py-1 rounded-md capitalize">
                        Access: {item.pinAccess}
                      </span>
                      <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md capitalize">
                        {item.activity.category}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeActivity(item.activity._id)}
                  className="text-red-500 hover:bg-red-50 p-2.5 rounded-lg transition-colors border border-transparent hover:border-red-100"
                  title="Remove Activity"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-col gap-3">
        <button
          onClick={() => handleContinue()}
          className="black_button w-full"
        >
          Next
        </button>
        <button
          onClick={() => setSelectedTab("scape_objects")}
          className="bg-white border border-gray-300 text-gray-700 font-bold py-3 rounded-full hover:bg-gray-50 transition-colors block w-full"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ScapeActivities;
