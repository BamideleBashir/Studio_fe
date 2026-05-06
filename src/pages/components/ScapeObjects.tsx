/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { IScapeFormState, ScapeObject, INucleus } from "../CreateScape";
import FilterSearchInput from "./FilterSearchInput";
import ObjectFunctionApi from "../../api/objectFunctionApi";
import { NucleusApi } from "../../api/nucleusApi";
import { toast } from "react-toastify";

interface Icon {
  url: string;
  publicId: string;
}

interface Attribute {
  value: string;
  type: string;
  label: string;
}

export interface IObjectFunction {
  _id: string;
  attributes: Attribute[]; // Array of Attribute objects
  category: string;
  createdAt: string; // Assuming ISO 8601 format
  description: string;
  icon: Icon;
  nucleus: string;
  title: string;
  updatedAt: string; // Assuming ISO 8601 format
  user: string;
}

type Props = {
  formData: IScapeFormState;
  setFormData: (formData: IScapeFormState) => void;
  setSelectedTab: (value: string) => void;
};

const ScapeObjects = ({ formData, setFormData, setSelectedTab }: Props) => {
  const [objects, setObjects] = useState<ScapeObject[]>(formData.objects);
  const [selectedNucleus, setSelectedNucleus] = useState<any>();
  const [humanFunctions, setHumanFunctions] = useState<IObjectFunction[]>([]);
  const [loadingHumanFunctions, setLoadingHumanFunctions] = useState(false);

  const [newObject, setNewObject] = useState<ScapeObject>({
    nucleus: selectedNucleus as unknown as INucleus,
    objectFunctions: [],
    pinAccess: "public",
  });

  const setNewObjectNucleus = (nucleus: any) => {
    setSelectedNucleus(nucleus);
    setNewObject({
      ...newObject,
      nucleus: nucleus,
    });
  };

  const [objectFunctions, setObjectFunctions] = useState<IObjectFunction[]>([]);
  const [loadingFunctions, setLoadingFunctions] = useState(false);

  const addNewObject = () => {
    if (!newObject.nucleus) {
      toast.info("Please select a nucleus");
      return;
    }
    // make sure it has not been added before
    if (objects.find((obj) => obj.nucleus._id === newObject.nucleus._id)) {
      toast.info("Object already added");
      return;
    }

    setObjects([...objects, newObject]);
    setFormData({
      ...formData,
      objects: [...objects, newObject],
    });

    // clear
    setNewObject({
      nucleus: undefined as unknown as INucleus,
      objectFunctions: [],
      pinAccess: "public",
    });

    toast.info("Object added");

    setSelectedNucleus(undefined);
    setObjectFunctions([]);
  };

  const removeObject = (object: ScapeObject) => {
    setObjects(objects.filter((obj) => obj !== object));
    setFormData({
      ...formData,
      objects: objects.filter((obj) => obj !== object),
    });
  };

  const fetchObjectFunctions = (nucleus: string) => {
    setLoadingFunctions(true);
    ObjectFunctionApi.getObjectFunctionsByNucleusId(nucleus)
      .then((res) => {
        console.log("res: function", res);
        setObjectFunctions(res.data);
        setLoadingFunctions(false);
      })
      .catch((err) => {
        console.log("err: function", err);
        toast.error("Error fetching object functions");
        setLoadingFunctions(false);
      });
  };

  // on change of nucleus id, fetch object functions
  useEffect(() => {
    if (newObject.nucleus) {
      fetchObjectFunctions(newObject.nucleus._id);
    }
  }, [newObject.nucleus]);

  useEffect(() => {
    if (!formData.canPinHumans) return;
    setLoadingHumanFunctions(true);
    NucleusApi.getHumanNucleus()
      .then((res) => {
        return ObjectFunctionApi.getObjectFunctionsByNucleusId(res.data._id);
      })
      .then((res) => {
        setHumanFunctions(res.data);
        setLoadingHumanFunctions(false);
      })
      .catch(() => {
        setLoadingHumanFunctions(false);
      });
  }, [formData.canPinHumans]);

  const toggleHumanFunction = (fn: IObjectFunction) => {
    const selected = formData.humanFunctions;
    const updated = selected.includes(fn._id)
      ? selected.filter((id) => id !== fn._id)
      : [...selected, fn._id];
    setFormData({ ...formData, humanFunctions: updated });
  };

  // add object function
  const addObjectFunction = (objectFunction: IObjectFunction) => {
    setNewObject({
      ...newObject,
      objectFunctions: [...newObject.objectFunctions, objectFunction._id],
    });
  };

  // remove object function
  const removeObjectFunction = (objectFunction: IObjectFunction) => {
    setNewObject({
      ...newObject,
      objectFunctions: newObject.objectFunctions.filter(
        (obj) => obj !== objectFunction._id,
      ),
    });
  };

  const handleContinue = () => {
    console.log("formData", formData);

    if (objects.length === 0) {
      toast.info("Please add at least one object");
      return;
    }

    setSelectedTab("scape_metadata");
  };

  return (
    <div>
      <div className="text-center mt-8 mb-6">
        <h1 className="text-2xl font-bold text-black">Add Scape Objects</h1>
        <p className="text-sm text-gray-500 mt-2">
          Select the primary objects and their functions for this scape.
        </p>
      </div>

      <div className="bg-white border rounded-xl p-5 mb-8 shadow-sm">
        <h3 className="font-semibold text-lg mb-4 border-b pb-2">
          Add New Object
        </h3>

        {!newObject.nucleus ? (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Find Primary Object
            </label>
            <FilterSearchInput setPrimaryObject={setNewObjectNucleus} />
          </div>
        ) : (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <img
                  src={newObject.nucleus?.icon?.url}
                  alt=""
                  className="w-14 h-14 rounded-lg object-cover bg-white border shadow-sm"
                />
                <div>
                  <h4 className="font-bold text-lg">
                    {newObject.nucleus?.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1 capitalize">
                    {newObject.nucleus?.category}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setNewObjectNucleus(null)}
                className="text-red-500 text-sm font-medium hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
              >
                Change
              </button>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pin Access
              </label>
              <select
                value={newObject.pinAccess}
                onChange={(e) =>
                  setNewObject({
                    ...newObject,
                    pinAccess: e.target.value as
                      | "public"
                      | "private"
                      | "admins",
                  })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-white focus:ring-2 focus:ring-black outline-none transition-shadow"
              >
                <option value="public">Public (Anyone can pin)</option>
                <option value="private">Private (Only you can pin)</option>
                <option value="admins">Admins (Only admins can pin)</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Object Functions
              </label>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                {loadingFunctions ? (
                  <p className="text-sm text-gray-500 text-center py-6 bg-white rounded-lg border border-dashed">
                    Loading object functions...
                  </p>
                ) : (
                  <>
                    {objectFunctions.map((objectFunction, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-white border p-3 rounded-lg hover:border-gray-400 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            className="w-10 h-10 rounded-full object-cover border"
                            src={objectFunction.icon?.url}
                            alt=""
                          />
                          <div>
                            <p className="font-medium text-sm">
                              {objectFunction.title}
                            </p>
                            <p className="text-xs text-gray-500 line-clamp-1">
                              {objectFunction.description}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            newObject.objectFunctions.includes(objectFunction._id)
                              ? removeObjectFunction(objectFunction)
                              : addObjectFunction(objectFunction)
                          }
                          className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                            newObject.objectFunctions.includes(objectFunction._id)
                              ? "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
                              : "bg-black text-white hover:bg-gray-800"
                          }`}
                        >
                          {newObject.objectFunctions.includes(objectFunction._id)
                            ? "Remove"
                            : "Add"}
                        </button>
                      </div>
                    ))}
                    {objectFunctions.length === 0 && (
                      <p className="text-sm text-gray-500 text-center py-6 bg-white rounded-lg border border-dashed">
                        No object functions found for this nucleus
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>

            <button
              onClick={() => addNewObject()}
              className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-sm"
            >
              Add Object to Scape
            </button>
          </div>
        )}
      </div>

      {objects.length > 0 && (
        <div className="mb-8">
          <h3 className="font-semibold text-lg mb-3">
            Added Objects ({objects.length})
          </h3>
          <div className="space-y-3">
            {objects.map((object, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-white border border-gray-200 p-4 rounded-xl shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <img
                    className="w-14 h-14 rounded-lg object-cover bg-gray-50 border"
                    src={object.nucleus?.icon?.url}
                    alt=""
                  />
                  <div>
                    <p className="font-bold">{object.nucleus?.title}</p>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-600 font-medium">
                      <span className="bg-gray-100 px-2 py-1 rounded-md capitalize">
                        Access: {object.pinAccess}
                      </span>
                      <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md">
                        {object.objectFunctions.length} Functions
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeObject(object)}
                  className="text-red-500 hover:bg-red-50 p-2.5 rounded-lg transition-colors border border-transparent hover:border-red-100"
                  title="Remove Object"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {formData.canPinHumans && (
        <div className="bg-white border rounded-xl p-5 mb-8 shadow-sm">
          <h3 className="font-semibold text-lg mb-1 border-b pb-2">Human Functions</h3>
          <p className="text-xs text-gray-500 mb-4">
            Select the functions available to humans when they pin themselves to this scape.
          </p>
          {loadingHumanFunctions ? (
            <p className="text-sm text-gray-500 text-center py-6 border border-dashed rounded-lg">
              Loading human functions...
            </p>
          ) : humanFunctions.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-6 border border-dashed rounded-lg">
              No human functions found. Create a Human Nucleus in nucleus_fe first.
            </p>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
              {humanFunctions.map((fn) => (
                <div
                  key={fn._id}
                  className="flex items-center justify-between bg-white border p-3 rounded-lg hover:border-gray-400 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      className="w-10 h-10 rounded-full object-cover border"
                      src={fn.icon?.url}
                      alt=""
                    />
                    <div>
                      <p className="font-medium text-sm">{fn.title}</p>
                      <p className="text-xs text-gray-500 line-clamp-1">{fn.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleHumanFunction(fn)}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      formData.humanFunctions.includes(fn._id)
                        ? "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
                        : "bg-black text-white hover:bg-gray-800"
                    }`}
                  >
                    {formData.humanFunctions.includes(fn._id) ? "Remove" : "Add"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="mt-8 flex flex-col gap-3">
        <button
          onClick={() => handleContinue()}
          className="black_button w-full"
        >
          Next
        </button>
        <button
          onClick={() => setSelectedTab("basic_info")}
          className="bg-white border border-gray-300 text-gray-700 font-bold py-3 rounded-full hover:bg-gray-50 transition-colors block w-full"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ScapeObjects;
