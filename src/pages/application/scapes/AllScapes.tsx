import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IScape } from "../../../types";
import { ScapeApi } from "../../../api/scapeApi";

const AllScapes = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IScape[]>([]);

  const fetchData = () => {
    setLoading(true);
    ScapeApi.getYourScapes()
      .then((res) => {
        setData(res.data.docs || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="px-6 mb-10 mt-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-black">All Scapes</h2>
        <Link to="/create-scape" className="black_button px-6 py-2 rounded-full text-sm font-medium">
          Create New Scape
        </Link>
      </div>

      {loading ? (
        <p className="text-center my-8 text-gray-500 font-medium">Loading scapes...</p>
      ) : data.length === 0 ? (
        <div className="border border-dashed border-gray-300 p-8 rounded-2xl text-center bg-gray-50">
          <p className="text-gray-500 mb-4">You don't have any scapes yet.</p>
          <Link to="/create-scape" className="text-blue-600 font-medium hover:underline">
            Create your first scape
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((scape) => (
            <div key={scape._id} className="bg-white border border-gray-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-4 items-start mb-4">
                {scape.icon && (
                  <img
                    src={scape.icon.url}
                    alt={scape.title}
                    className="w-16 h-16 rounded-xl object-cover border border-gray-100 bg-gray-50"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900 line-clamp-1" title={scape.title}>
                    {scape.title}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium capitalize mt-1">
                    {scape.category}
                  </p>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-5 line-clamp-2 h-10">
                {scape.description}
              </p>

              <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                <div className="text-xs text-gray-500 font-medium">
                  {scape.viewingAccess} • {scape.objects?.length || 0} objects
                </div>
                <Link
                  to={`/scape-details/${scape._id}`}
                  className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  View details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllScapes;
