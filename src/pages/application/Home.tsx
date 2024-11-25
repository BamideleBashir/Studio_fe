import { useState } from "react";
import { FiCpu } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import RecentScape from "./scapes/components/RecentScape";

const Home = () => {
  const navigate = useNavigate();

  const ScapeTypesList = [
    {
      id: 1,
      title: "Discrete",
      description:
        "Contain discrete objects eg people, cars that can be pinned on a map",
    },
    {
      id: 2,
      title: "Continuous",
      description:
        "Contain nondiscrete objects eg rainfall, solar radiation, air quality etc",
    },
  ];

  const [selectedScapeType, setSelectedScapeType] = useState();

  const handleButtonClick = () => {
    navigate("/create-scape");
  };

  return (
    <div className="px-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Studio</h2>
        <p>Create Scapes, map-based virtual worlds for real world activities</p>
      </div>

      <div className="my-10">
        <RecentScape />
      </div>

      <div>
        <h3 className="font-medium text-xl mt-4">Create New Scape</h3>

        <div className="bg-[#FFF3EF] p-4 rounded-3xl">
          <div className="flex gap-4 items-center">
            <div className="bg-white p-2 rounded-full">
              <FiCpu size={30} />
            </div>
            <div>
              <p className="text-lg">From Scratch</p>
              <p>Start with a blank canvas</p>
            </div>
          </div>

          <div className="mt-4 bg-white rounded-2xl">
            <div className="">
              {ScapeTypesList.map((type) => (
                <div
                  key={type.id}
                  className={`flex items-center justify-between p-4 mb-2 rounded-lg cursor-pointer`}
                  onClick={() => setSelectedScapeType(type.id)}
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {type.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{type.description}</p>
                  </div>
                  <div className="ml-4">
                    <span
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedScapeType === type.id
                          ? "border-blue-500"
                          : "border-gray-400"
                      }`}
                    >
                      {selectedScapeType === type.id && (
                        <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex gap-10">
            <div className="flex items-center gap-2">
              <label htmlFor="upload-data">Upload Data</label>
              <input type="checkbox" id="upload-data" name="upload-data" />
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="upload-data">Pin on Scape</label>
              <input type="checkbox" id="upload-data" name="upload-data" />
            </div>
          </div>

          <div className="mt-4 flex justify-end ">
            <button className="bg-gray-950 text-white px-4 py-2 rounded-3xl"
              onClick={handleButtonClick}
            >
              Create New
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
