import { toast } from "react-toastify";
import { ScapeApi } from "../../api/scapeApi";
import AddScapeRWO from "../modals/AddScapeRWO";
import { CubeIcon, TrashIcon } from "@heroicons/react/24/outline";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ScapeObject {
  nucleus: string;
  objectFunctions: string[];
  pinAccess?: "public" | "private" | "admins";
  users?: string[];
}

// removeObjectFromScape

const ScapeObjectList = ({
  objects,
  scapeId,
  fetchScape,
}: {
  objects: any[];
  scapeId: string;
  fetchScape: any;
}) => {
  const handleRemoveScape = (id: string) => {
    const confirm = window.confirm(
      "Are you sure you want to remove this object?"
    );
    if (!confirm) {
      return;
    }

    ScapeApi.removeObjectFromScape(scapeId, id)
      .then((res) => {
        console.log("res: remove object", res);
        fetchScape();
      })
      .catch((err) => {
        console.log("err: remove object", err);
        toast.error("Error removing object");
        toast.error(err.response.data.message || "Something went wrong");
      });
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="flex items-center gap-2 text-base font-semibold text-gray-900">
          <CubeIcon className="w-5 h-5 text-blue" />
          RWO Objects List
          <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-0.5 rounded-full">
            {objects.length}
          </span>
        </h3>

        <AddScapeRWO scapeId={scapeId} fetchScape={fetchScape} />
      </div>

      {objects.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-8 border border-dashed border-gray-200 rounded-xl">
          No objects added yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {objects.map((item) => (
            <div
              key={item._id}
              className="relative bg-white border border-gray-100 shadow-sm rounded-2xl p-4 hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => handleRemoveScape(item._id)}
                title="Remove object"
                className="absolute top-3 right-3 text-red-500 hover:bg-red-50 p-1.5 rounded-full transition-colors"
              >
                <TrashIcon className="w-4 h-4" />
              </button>

              <div className="flex items-start gap-3 pr-8">
                <img
                  className="object-cover w-14 h-14 rounded-xl border border-gray-100 shrink-0"
                  src={item.nucleus?.icon?.url}
                  alt=""
                />

                <div className="min-w-0">
                  <h4 className="font-bold text-gray-900 truncate">
                    {item.nucleus.title}
                  </h4>
                  <p className="text-xs text-gray-500 capitalize truncate">
                    {item.nucleus.category}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5 mt-2">
                    <span className="bg-blue/10 text-blue px-2 py-0.5 rounded-md text-xs font-medium capitalize">
                      {item.pinAccess}
                    </span>
                    <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md text-xs font-medium">
                      {item.objectFunctions.length} Functions
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

export default ScapeObjectList;
