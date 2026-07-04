/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react";
import { ScapeApi } from "../../api/scapeApi";
import AddScapeLightObject from "../modals/AddScapeLightObject";
import { SquaresPlusIcon, TrashIcon } from "@heroicons/react/24/outline";

type Props = {
  scapeId: string;
  fetchScape: any;
};

type SimpleObject = {
  _id: string;
  title: string;
  description: string;
  icon: {
    public_id: string;
    url: string;
  };
  createdAt: string;
};

const ScapeLightObjectList = ({ scapeId }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [objects, setObjects] = useState<SimpleObject[]>([]);

  const fetchObjects = async () => {
    setLoading(true);
    try {
      const res = await ScapeApi.getScapeObjects(scapeId);
      console.log(res);
      setObjects(res.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchObjects();
  }, []);

  const handleRemoveObject = async (objectId: string) => {
    if (!window.confirm("Are you sure you want to remove this object?")) {
      return;
    }

    try {
      await ScapeApi.deleteScapeObject(scapeId, objectId);
      fetchObjects();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="flex items-center gap-2 text-base font-semibold text-gray-900">
          <SquaresPlusIcon className="w-5 h-5 text-blue" />
          Scape Objects
          <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-0.5 rounded-full">
            {objects.length}
          </span>
        </h3>

        <AddScapeLightObject scapeId={scapeId} fetchScape={fetchObjects} />
      </div>

      {loading ? (
        <p className="text-sm text-gray-500 text-center py-8">Loading…</p>
      ) : objects.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-8 border border-dashed border-gray-200 rounded-xl">
          No objects added yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {objects.map((object) => (
            <div
              key={object._id}
              className="relative bg-white border border-gray-100 shadow-sm rounded-2xl p-4 hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => handleRemoveObject(object._id)}
                title="Remove object"
                className="absolute top-3 right-3 text-red-500 hover:bg-red-50 p-1.5 rounded-full transition-colors"
              >
                <TrashIcon className="w-4 h-4" />
              </button>

              <div className="flex items-start gap-3 pr-8">
                <img
                  src={
                    object.icon?.url ||
                    "https://cdn-icons-png.flaticon.com/512/8654/8654975.png"
                  }
                  alt={object.title}
                  className="w-14 h-14 rounded-xl object-cover border border-gray-100 shrink-0"
                />

                <div className="min-w-0">
                  <h4 className="font-bold text-gray-900 truncate">
                    {object.title}
                  </h4>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {object.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScapeLightObjectList;
