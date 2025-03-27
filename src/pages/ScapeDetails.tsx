import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IScape } from "../types";
import ScapeObjectFunctionList from "./sections/ScapeObjectFunctionList";
import { ScapeApi } from "../api/scapeApi";
import ScapeObjectList from "./sections/ScapeObjectList";

const ScapeDetails = () => {
  const { id } = useParams<string>();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IScape | null>(null);

  useEffect(() => {
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
        <div className="mb-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-1">
            {data.title}
          </h2>
          <p className="text-gray-600">
            {data.category}
          </p>
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
            <p className="text-gray-700">{data.enableSearchEngine ? "Enabled" : "Disabled"}</p>
          </div>
        </div>

        {/* Keywords */}
        {data.keywords && data.keywords.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-blue mb-2">Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {data.keywords.map((keyword, index) => (
                <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-sm">
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
            <ul className="list-disc pl-5">
              {data.admins.map((admin, index) => (
                <li key={index} className="text-gray-700">{admin}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Geometry */}
        {data.geometry && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-blue mb-2">Geometry</h3>
            <p className="text-gray-700">Type: {data.geometry.type}</p>
            <p className="text-gray-700">Coordinates: {data.geometry.coordinates.length} points</p>
          </div>
        )}

        {id && data.objects && data.objects.length > 0 && (
          <ScapeObjectList objects={data.objects} />
        )}

        {/* Object Functions */}
        {id && data.objects && data.objects.length > 0 && (
          <ScapeObjectFunctionList id={id} objects={data.objects} />
        )}
      </div>
    </div>
  )
}

export default ScapeDetails