/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react";
import { ScapeApi } from "../../api/scapeApi";
import AddScapeLightObject from "../modals/AddScapeLightObject";

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
    try {
      await ScapeApi.deleteScapeObject(scapeId, objectId);
      fetchObjects();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mt-8 mb-4">
        <div className="font-medium text-xl">Scape Objects</div>

        <AddScapeLightObject scapeId={scapeId} fetchScape={fetchObjects} />
      </div>

      {loading && <div className="text-center">Loading...</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {objects.length > 0 &&
          objects.map((object) => (
            <div
              key={object._id}
              className="flex items-center justify-between mb-4 py-2 p-4 rounded-3xl bg-[#f3f4f3]"
            >
              <div className="flex items-center">
                <img
                  src={
                    object.icon?.url ||
                    "https://cdn-icons-png.flaticon.com/512/8654/8654975.png"
                  }
                  alt={object.title}
                  className="w-12 h-12 rounded-full"
                />

                <div className="ml-4 justify-between w-full">
                  <div>
                    <p className="font-medium text-lg">{object.title}</p>
                    <p className="text-gray-600 text-sm">
                      {object.description}
                    </p>
                  </div>

                  <button
                    onClick={() => handleRemoveObject(object._id)}
                    className="text-red-500 hover:underline text-sm font-medium"
                  >
                    remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          {
            objects.length === 0 && (
              <div className="text-center col-span-3">No objects added yet.</div> 
            )
          }
      </div>
    </div>
  );
};

export default ScapeLightObjectList;
