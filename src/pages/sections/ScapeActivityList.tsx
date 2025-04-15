/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "react-toastify";
import { ScapeApi } from "../../api/scapeApi";
import AddScapeActivity from "../modals/AddScapeActivity";

// type Icon = {
//   public_id: string;
//   url: string;
// };

// interface IActivityResponse {
//   icon: Icon;
//   _id: string;
//   user: string;
//   title: string;
//   category: string;
//   description: string;
//   access: string;
//   createdAt: string; // Assuming ISO 8601 format
// }

type Props = {
  scapeId: string;
  // activities: {
  //   activity: IActivityResponse;
  //   permission: string;
  // }[];
  activities: any;
  fetchScape: () => void;
};

const ScapeActivityList = ({ scapeId, activities, fetchScape }: Props) => {
  const removeActivity = async (activityId: string) => {
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
      <div className="flex justify-between items-center mt-8 mb-4">
        <div className="font-medium text-xl">Scape Activities</div>

        <AddScapeActivity scapeId={scapeId} fetchScape={fetchScape} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activities.map((activity: any) => (
          <div
            key={activity.activity._id}
            className="flex items-center justify-between mb-4 py-2 p-4 rounded-3xl bg-[#f3f4f3]"
          >
            <div className="flex items-center space-x-4">
              <img
                src={
                  activity.activity.icon.url ||
                  "https://cdn-icons-png.flaticon.com/512/8654/8654975.png"
                }
                alt="Activity"
                className="w-20 h-20 rounded-full"
              />
              <div>
                <h3 className="text-lg font-semibold">
                  {activity.activity.title}
                </h3>
                <p className="text-gray-700 test-sm">
                  {activity.activity.category}
                </p>
              </div>
            </div>
            <div className="text-gray-700">{activity.permission}</div>
            <button
              onClick={() => removeActivity(activity.activity._id)}
              className="text-red-500 hover:text-red-700 text-sm font-medium"
            >
              remove
            </button>
          </div>
        ))}

        {activities.length === 0 && (
          <div className="text-center text-gray-600 col-span-3">
            No activities added yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default ScapeActivityList;
