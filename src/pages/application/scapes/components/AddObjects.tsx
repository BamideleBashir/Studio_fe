/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { NucleusApi } from "../../../../api/nucleusApi";
import { IScapeState } from "../../../../types";
import { IoIosSearch } from "react-icons/io";
import { LiaTimesSolid } from "react-icons/lia";
import { toast } from "react-toastify";

type Props = {
  scapeState: IScapeState;
  setScapeState: any;
  selectedObjects: any[];
  setSelectedObjects: any;
};

const AddObjects = ({ scapeState, setScapeState, selectedObjects, setSelectedObjects }: Props) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    console.log(searchInput);

    setLoading(true);
    NucleusApi.searchNucleus(searchInput)
      .then((res) => {
        console.log(res);
        setSearchResults(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  // listen for changes in search input and call search function but debounce it
  useEffect(() => {
    if (!searchInput) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);


  const handleAddObject = (object: any) => {
    console.log(object);

    // check if object already exists in selectedObjects
    const exists = selectedObjects.find((obj) => obj._id === object._id);

    if (exists) {
      return;
    }

    setSelectedObjects([...selectedObjects, object]);

    setScapeState({
      ...scapeState,
      objectClass: [...scapeState.objectClass, object._id],
    });

    toast.success("Object added successfully");
  };

  const handleRemoveObject = (object: any) => {
    console.log(object);

    const filteredObjects = selectedObjects.filter(
      (obj) => obj._id !== object._id
    );

    setSelectedObjects(filteredObjects);

    setScapeState({
      ...scapeState,
      objectClass: filteredObjects.map((obj) => obj._id),
    });

    toast.success("Object removed successfully");
  };

  return (
    <div>
      <h4 className="font-bold">Add Objects</h4>

      <p className="text-sm text-gray-600">
        Search for objects to add to your scape
      </p>

      <div className="max-h-80 overflow-y-auto">
        <div className="mt-4 flex items-center bg-[#f4f5f7] p-4 rounded-lg">
          <input
            type="text"
            className="w-full bg-transparent outline-none"
            placeholder="Start typing to search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            // on key press enter
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />

          <div className=" rounded-lg" onClick={handleSearch}>
            <IoIosSearch className="text-2xl text-gray-600 cursor-pointer" />
          </div>
        </div>

        {!loading && searchResults.length > 0 && searchResults.map((result) => (
          <div
            key={result._id}
            className="mt-4 flex justify-between items-center bg-[#f4f5f7] p-4 rounded-lg"
            onClick={() => handleAddObject(result)}
          >
            <div className="flex items-center">
              <img
                className="w-10 h-10 mr-2 object-cover rounded-lg"
                src="https://img.icons8.com/?size=256&id=43591&format=png"
                alt=""
              />

              <div>
                <h4 className="font-bold">{result.title}</h4>
                <p className="text-sm text-gray-600">
                  {result.objectDescription}
                </p>
                {/* <div>
                  <p className="text-sm text-gray-600">
                    Category: {result.category}
                  </p>
                </div> */}
              </div>
            </div>

            <div>
              <div className="bg-white p-2 rounded-lg hidden">
                <IoIosSearch className="text-2xl text-blue-500 cursor-pointer" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        {selectedObjects.length > 0 && (
          <div className="mt-4">
            <h4 className="font-bold">Selected Objects</h4>

            <div className="grid grid-cols-2 gap-4 mt-4">
              {selectedObjects.map((object) => (
                <div
                  key={object._id}
                  className="bg-[#f4f5f7] p-4 rounded-lg flex justify-between items-center"
                >
                  <div className="flex items-center">
                    <img
                      className="w-10 h-10 mr-2 object-cover rounded-lg"
                      src="https://img.icons8.com/?size=256&id=43591&format=png"
                      alt=""
                    />

                    <div>
                      <h4 className="font-bold">{object.title}</h4>
                      <p className="text-sm text-gray-600">
                        {
                          object.objectDescription.length > 100
                            ? object.objectDescription.slice(0, 80) + "..."
                            : object.objectDescription
                        }
                      </p>
                    </div>
                  </div>

                  <div>
                    <div
                      className="bg-white p-2 rounded-lg"
                      onClick={() => handleRemoveObject(object)}
                    >
                      <LiaTimesSolid className="text-2xl text-red-500 cursor-pointer" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddObjects;
