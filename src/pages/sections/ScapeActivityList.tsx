/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "react-toastify";
import { ScapeApi } from "../../api/scapeApi";
import AddScapeActivity from "../modals/AddScapeActivity";
import { CalendarDaysIcon, TrashIcon } from "@heroicons/react/24/outline";

type Props = {
  scapeId: string;
  activities: any;
  fetchScape: () => void;
};

const ScapeActivityList = ({ scapeId, activities, fetchScape }: Props) => {
  const removeActivity = async (activityId: string) => {
    if (!window.confirm("Are you sure you want to remove this activity?")) {
      return;
    }

    ScapeApi.removeActivityFromScape(scapeId, activityId)
      .then((res) => {
        console.log(res);
        toast.success("Activity removed successfully");
        fetchScape();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message || "an error occurred");
      });
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="flex items-center gap-2 text-base font-semibold text-gray-900">
          <CalendarDaysIcon className="w-5 h-5 text-blue" />
          Scape Activities
          <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-0.5 rounded-full">
            {activities.length}
          </span>
        </h3>

        <AddScapeActivity scapeId={scapeId} fetchScape={fetchScape} />
      </div>

      {activities.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-8 border border-dashed border-gray-200 rounded-xl">
          No activities added yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {activities.map((activity: any) => (
            <div
              key={activity.activity._id}
              className="relative bg-white border border-gray-100 shadow-sm rounded-2xl p-4 hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => removeActivity(activity.activity._id)}
                title="Remove activity"
                className="absolute top-3 right-3 text-red-500 hover:bg-red-50 p-1.5 rounded-full transition-colors"
              >
                <TrashIcon className="w-4 h-4" />
              </button>

              <div className="flex items-start gap-3 pr-8">
                <img
                  src={
                    activity.activity.icon?.url ||
                    "https://cdn-icons-png.flaticon.com/512/8654/8654975.png"
                  }
                  alt="Activity"
                  className="w-14 h-14 rounded-xl object-cover border border-gray-100 shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="font-bold text-gray-900 truncate">
                    {activity.activity.title}
                  </h4>
                  <p className="text-xs text-gray-500 capitalize truncate">
                    {activity.activity.category}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5 mt-2">
                    <span className="bg-blue/10 text-blue px-2 py-0.5 rounded-md text-xs font-medium capitalize">
                      {activity.permission}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScapeActivityList;
