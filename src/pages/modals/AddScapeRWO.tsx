/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { INucleus } from "../CreateScape";
import ModalBase from "./ModalBase";
import { IObjectFunction } from "../components/ScapeObjects";
import { toast } from "react-toastify";
import ObjectFunctionApi from "../../api/objectFunctionApi";
import FilterSearchInput from "../components/FilterSearchInput";
import { ScapeApi } from "../../api/scapeApi";

export interface NewScapeObject {
  nucleus: INucleus;
  objectFunctions: string[];
  pinAccess?: "public" | "private" | "admins";
  users?: string[];
}

const AddScapeRWO = ({
  scapeId,
  fetchScape,
}: {
  scapeId: string;
  fetchScape: any;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedNucleus, setSelectedNucleus] = useState<any>();

  const [newObject, setNewObject] = useState<NewScapeObject>({
    nucleus: selectedNucleus,
    objectFunctions: [],
    pinAccess: "public",
  });

  const [objectFunctions, setObjectFunctions] = useState<IObjectFunction[]>([]);

  // on change of nucleus id, fetch object functions
  useEffect(() => {
    if (newObject.nucleus) {
      fetchObjectFunctions(newObject.nucleus._id);
    }
  }, [newObject.nucleus]);

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

  const setNewObjectNucleus = (nucleus: any) => {
    setSelectedNucleus(nucleus);
    setNewObject({
      ...newObject,
      nucleus: nucleus,
    });
  };

  const addNewObject = () => {
    setAddingObject(true);

    const payload = {
      nucleus: newObject.nucleus._id,
      objectFunctions: newObject.objectFunctions,
      pinAccess: newObject.pinAccess,
    }

    ScapeApi.addRealObjectToScape(scapeId, payload)
      .then((res) => {
        console.log("res: add object", res);
        toast.success("Object added to scape");
        setLoading(false);
        setIsModalOpen(false);
        fetchScape(scapeId);
      })
      .catch((err) => {
        console.log("err: add object", err);
        setLoading(false);
        toast.error(err.response.data.message || "Something went wrong");
      });
  };

  const [addingObject, setAddingObject] = useState<boolean>(false);

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)} className="my_button">
        <div className="button">
          <p className="text-main">Add RWO Object</p>
        </div>
      </button>

      <ModalBase
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Scape Activity"
        hideCancel={true}
      >
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
            <button
              onClick={() => addNewObject()}
              className="button"
              // disabled={addingObject}
            >
              {addingObject ? "Adding..." : "Add Object"}
            </button>
          </div>

          {/* object functions */}
        </div>
      </ModalBase>
    </div>
  );
};

export default AddScapeRWO;
