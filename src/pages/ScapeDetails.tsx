import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IScape } from "../types";
import { ScapeApi } from "../api/scapeApi";
import ScapeObjectList from "./sections/ScapeObjectList";
import ScapeActivityList from "./sections/ScapeActivityList";
import ScapeLightObjectList from "./sections/ScapeLightObjectList";
import EditScapeModal from "./modals/EditScapeModal";

const ScapeDetails = () => {
  const { id } = useParams<string>();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IScape | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchScape = async () => {
    if (!id) return;

    ScapeApi.getScapeById(id)
      .then((res) => {
        console.log(res);
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchScape();
  }, [id]);

  if (loading) {
    return (
      <p className="text-black font-medium text-center my-8">Loading Scape</p>
    );
  }

  if (!data) {
    return (
      <p className="text-black font-medium text-center my-8">No Data Found</p>
    );
  }

  return (
    <div>
      <div className="bg-white shadow-md rounded-lg p-6">
        {/* Title and Category */}
        <div className="mb-4 flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-1">
              {data.title}
            </h2>
            <p className="text-gray-600 capitalize">{data.category}</p>
          </div>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="black_button px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap"
          >
            Edit Scape
          </button>
        </div>

        <div className="text-sm mb-4">
          Created by:
          <span className="font-semibold text-blue-700 ml-1">
            {data.user.firstName} {data.user.lastName}
          </span>
        </div>

        {/* icon */}
        {data.icon && (
          <div className="mb-4">
            <img
              src={data.icon.url}
              alt={`${data.title} Icon`}
              className="w-44 rounded-2xl object-contain"
            />
          </div>
        )}

        {/* Description */}
        {data.description && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-blue mb-2">
              Description
            </h3>
            <p className="text-gray-700">{data.description}</p>
          </div>
        )}

        {/* General Information Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <span className="block font-semibold text-gray-700 mb-1">
              Viewing Access
            </span>
            <p className="text-gray-700 capitalize">{data.viewingAccess}</p>
          </div>
          <div>
            <span className="block font-semibold text-gray-700 mb-1">
              Comment Access
            </span>
            <p className="text-gray-700 capitalize">{data.commentAccess}</p>
          </div>
          <div>
            <span className="block font-semibold text-gray-700 mb-1">
              Search Engine
            </span>
            <p className="text-gray-700">
              {data.enableSearchEngine ? "Enabled" : "Disabled"}
            </p>
          </div>
        </div>

        {/* Keywords */}
        {data.keywords && data.keywords.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-blue mb-2">Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {data.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Admins */}
        {data.admins && data.admins.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-blue mb-2">Admins</h3>
            <div className="flex flex-col gap-2">
              {data.admins.map((admin) => (
                <div key={admin._id} className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold text-gray-600">
                    {admin.firstName[0]}{admin.lastName[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{admin.firstName} {admin.lastName}</p>
                    <p className="text-xs text-gray-500">{admin.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Geometry */}
        {data.geometry && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-blue mb-2">Geometry</h3>
            <p className="text-gray-700">Type: {data.geometry.type}</p>
            <p className="text-gray-700">
              Coordinates: {data.geometry.coordinates.length} points
            </p>
          </div>
        )}

        {id && data.objects && data.objects.length > 0 && (
          <ScapeObjectList
            scapeId={id}
            objects={data.objects}
            fetchScape={fetchScape}
          />
        )}

        {id && data.objects && data.objects.length > 0 && (
          <ScapeActivityList
            scapeId={id}
            activities={data.activities}
            fetchScape={fetchScape}
          />
        )}

        {id && data.objects && data.objects.length > 0 && (
          <ScapeLightObjectList scapeId={id} fetchScape={fetchScape} />
        )}
      </div>

      <EditScapeModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        scape={data}
        onSuccess={fetchScape}
      />
    </div>
  );
};

export default ScapeDetails;
