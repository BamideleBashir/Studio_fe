import { toast } from "react-toastify";
import { ScapeApi } from "../../api/scapeApi";
import AddScapeRWO from "../modals/AddScapeRWO";
import { FaMinusCircle } from "react-icons/fa";

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
      <div className="flex justify-between items-center">
        <div className="font-medium text-xl">RWO Objects List</div>

        <AddScapeRWO scapeId={scapeId} fetchScape={fetchScape} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {objects.map((item) => (
          <div
            key={item._id}
            className="mt-4 flex justify-between items-center bg-[#e9eef1] py-2 p-4 rounded-lg cursor-pointer relative"
          >
            <div className="absolute top-3 right-2">
              <FaMinusCircle
                onClick={() => handleRemoveScape(item._id)}
                className="text-red-500 cursor-pointer"
              />
            </div>

            <div className="flex items-center">
              <img
                className="object-cover mr-2 w-20 h-20 rounded-lg"
                src={item.nucleus?.icon?.url}
                alt=""
              />

              <div>
                <h4 className="font-bold">{item.nucleus.title}</h4>
                <p className="text-sm text-gray-600">
                  {item.nucleus.objectDescription}
                </p>
                <div>
                  <p className="text-sm text-gray-600">
                    Category: {item.nucleus.category}
                  </p>
                </div>

                {/* object  */}
                <div>
                  <p className="text-sm text-gray-600">
                    {/* Objects: {getObject(item).} */}
                  </p>

                  {/* pin access */}
                  <p className="text-sm text-gray-600">
                    Pin Access:
                    <span className="font-bold ml-1">
                      {item.pinAccess.toUpperCase()}
                    </span>
                  </p>

                  {/* object function count */}
                  <p className="text-sm text-gray-600">
                    Functions Added: {item.objectFunctions.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScapeObjectList;
