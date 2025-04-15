/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { IScapeFormState, ScapeObject } from "../CreateScape";
import FilterSearchInput from "./FilterSearchInput";
import ObjectFunctionApi from "../../api/objectFunctionApi";
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

  const [newObject, setNewObject] = useState<ScapeObject>({
    nucleus: selectedNucleus,
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
      nucleus: selectedNucleus,
      objectFunctions: [],
      pinAccess: "public",
    });

    toast.info("Object added");

    setSelectedNucleus({});
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
    ObjectFunctionApi.getObjectFunctionsByNucleusId(nucleus)
      .then((res) => {
        console.log("res: function", res);
        setObjectFunctions(res.data);
      })
      .catch((err) => {
        console.log("err: function", err);
        toast.error("Error fetching object functions");
      });
  };

  // on change of nucleus id, fetch object functions
  useEffect(() => {
    if (newObject.nucleus) {
      fetchObjectFunctions(newObject.nucleus._id);
    }
  }, [newObject.nucleus]);

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
        (obj) => obj !== objectFunction._id
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
      <h1 className="text-2xl font-bold text-black">
        Add Scape Objects and Functions
      </h1>

      <div>
        <div className="mt-4">
          <h3 className="font-medium"> Find Primary Object</h3>
          <FilterSearchInput setPrimaryObject={setNewObjectNucleus} />
        </div>

        {/* selected object disabled text input */}
        <div className="mt-6">
          <h3 className="font-medium"> Selected Object</h3>
          <div className="">
            <div>
              <input
                type="text"
                value={selectedNucleus?.title}
                disabled
                className="input !w-full"
              />
            </div>
          </div>
        </div>

        {/* pin access */}
        <div className="mt-4">
          <h3 className="font-medium"> Pin Access</h3>
          <div className="">
            <div>
              {/* select dropdown */}
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
                className="input !w-full"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="admins">Admins</option>
              </select>
            </div>
          </div>
        </div>

        {/* list of object functions with checkbox for including them to the newObject.object functions */}
        <div className="mt-4">
          <h3 className="font-semibold">Select Object Functions</h3>
          <div className="">
            <div>
              {objectFunctions.map((objectFunction, index) => (
                <div
                  key={index}
                  className="flex justify-between w-full bg-[#F4F9FF] p-2 px-4 rounded-lg"
                >
                  <div className="flex">
                    <div className="mr-2">
                      <img
                        className="w-auto h-14 rounded-full"
                        src={objectFunction.icon.url}
                        alt=""
                      />
                    </div>

                    <div>
                      <p className="font-medium">{objectFunction.title}</p>
                      <p className="text-xs">{objectFunction.description}</p>
                      <p>
                        Access:{" "}
                        <span className="font-medium">
                          {newObject.objectFunctions.includes(
                            objectFunction._id
                          )}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={() =>
                        newObject.objectFunctions.includes(objectFunction._id)
                          ? removeObjectFunction(objectFunction)
                          : addObjectFunction(objectFunction)
                      }
                      className="button text-sm font-medium"
                    >
                      {newObject.objectFunctions.includes(objectFunction._id)
                        ? "Remove"
                        : "Add"}
                    </button>
                  </div>
                </div>
              ))}

              {objectFunctions.length === 0 && (
                <p className="text-sm text-gray-500 text-center">
                  No object functions found
                </p>
              )}
            </div>
          </div>
        </div>

        {/* add button */}
        <div className="mt-6">
          <button onClick={() => addNewObject()} className="button">
            Add Object to Scape
          </button>
        </div>

        {/* object functions */}
      </div>

      {/* list of added objects */}
      <div className="mt-6">
        <h3 className="font-medium text-lg mb-2">Added Objects</h3>
        <div>
          {objects.map((object, index) => (
            <div
              key={index}
              className="flex justify-between w-full bg-[#F4F9FF] p-2 px-4 rounded-lg mb-2"
            >
              <div className="flex">
                <div className="mr-2">
                  <img
                    className="w-20 h-20 rounded-lg object-cover"
                    src={object.nucleus.icon.url}
                    alt=""
                  />
                </div>

                <div>
                  <p className="font-medium">{object?.nucleus.title}</p>
                  <p className="text-sm">
                    Access:{" "}
                    <span className="font-medium">{object?.pinAccess}</span>
                  </p>

                  {/* included functions count */}
                  <p className="text-sm">
                    Included Functions:{" "}
                    <span className="font-medium">
                      {object?.objectFunctions.length}
                    </span>
                  </p>
                </div>
              </div>

              <div>
                <button
                  onClick={() => removeObject(object)}
                  className="button text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {objects.length === 0 && (
            <p className="text-sm text-gray-500 text-center">
              No objects added
            </p>
          )}
        </div>
      </div>

      <div className="mt-10">
        <button
          onClick={() => handleContinue()}
          className="bg-primary text-white py-3 rounded-xl font-bold block w-full"
        >
          Next
        </button>
      </div>

      <div className="mt-6">
        <button
          onClick={() => setSelectedTab("basic_info")}
          className="bg-white font-bold p-2 px-4 rounded-lg block w-full"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ScapeObjects;
