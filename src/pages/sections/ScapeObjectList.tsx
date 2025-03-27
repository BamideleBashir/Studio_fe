/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { NucleusApi } from "../../api/nucleusApi";

export interface ScapeObject {
  nucleus: string;
  objectFunctions: string[];
  pinAccess?: "public" | "private" | "admins";
  users?: string[];
}

const ScapeObjectList = ({ objects }: { objects: any[] }) => {
  // NucleusApi.getNucleus()
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (!objects || objects.length === 0) {
      return;
    }

    const nucleusIds = objects.map((object) => object.nucleus);

    const nucleusPromises = nucleusIds.map((nucleusId) =>
      NucleusApi.getNucleusById(nucleusId)
        .then((res) => res.data)
        .catch((err) => {
          console.error(err);
          return null;
        })
    );

    const fetchNucleusData = async () => {
      try {
        const nucleusData = await Promise.all(nucleusPromises);
        console.log(nucleusData);
        setData(nucleusData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchNucleusData();
  }, [objects]);

  const getObject = (nucleusId: string) => {
    const object = objects.find((object) => object.nucleus === nucleusId);
    console.log("object", object);
    return object;
  };

  return (
    <div>
      <div className="font-medium text-xl">Scape Object List</div>
      {loading && <p className="text-gray-600 text-center my-4">Loading...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => (
          <div
            key={item._id}
            className="mt-4 flex justify-between items-center bg-[#f4f5f7] p-4 rounded-lg cursor-pointer"
          >
            <div className="flex items-center">
              <img
                className="object-cover mr-2 w-20 h-20 rounded-lg"
                src={item.icon.url}
                alt=""
              />

              <div>
                <h4 className="font-bold">{item.title}</h4>
                <p className="text-sm text-gray-600">
                  {item.objectDescription}
                </p>
                <div>
                  <p className="text-sm text-gray-600">
                    Category: {item.category}
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
                    <span
                     className="font-bold ml-1"
                    >
                     {getObject(item._id)?.pinAccess.toUpperCase()}
                    </span>
                  </p>

                  {/* object function count */}
                  <p className="text-sm text-gray-600">
                    Functions Added:{" "}
                    {getObject(item._id)?.objectFunctions.length}
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
