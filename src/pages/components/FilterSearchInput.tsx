/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { NucleusApi } from "../../api/nucleusApi";

type FilterSearchInputProps = {
  setPrimaryObject: (primaryObject: string) => void;
};

const FilterSearchInput = ({ setPrimaryObject }: FilterSearchInputProps) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    console.log(searchInput);

    if (
      searchInput === "" ||
      searchInput === null ||
      searchInput === undefined
    ) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    NucleusApi.getNucleus({
      searchQuery: searchInput,
    })
      .then((res) => {
        console.log(res);
        setSearchResults(res.docs);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  // onchange search
  // useEffect(() => {
  //   if (searchInput === "" || searchInput === null || searchInput === undefined) {
  //     setSearchResults([]);
  //   }

  //   // if input is less than 3 characters, do not search
  //   if (searchInput.length < 3) {
  //     return;
  //   }

  //   handleSearch();
  // }, [searchInput]);

  const handleSelect = (result: any) => {
    setPrimaryObject(result);
    setSearchInput(result.title);
    setSearchResults([]);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    handleSearch();
  };

  return (
    <div>
      <input
        className="w-full p-2 rounded-lg border-2"
        type="text"
        value={searchInput}
        // onChange={(e) => setSearchInput(e.target.value)}
        onChange={handleSearchInputChange}
        placeholder="Search for a primary object"
      />

      <div className="max-h-[300px] overflow-y-auto">
        {!loading &&
          searchResults.map((result) => (
            <div
              key={result._id}
              className="mt-4 flex justify-between items-center bg-[#f4f5f7] p-4 rounded-lg cursor-pointer"
              onClick={() => handleSelect(result)}
            >
              <div className="flex items-center">
                <img
                  className="object-cover mr-2 w-10 h-10 rounded-lg"
                  src={result.icon.url}
                  alt=""
                />

                <div>
                  <h4 className="font-bold">{result.title}</h4>
                  <p className="text-sm text-gray-600">
                    {result.objectDescription}
                  </p>
                  <div>
                    <p className="text-sm text-gray-600">
                      Category: {result.category}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="hidden p-2 bg-white rounded-lg">
                  <IoIosSearch className="text-2xl text-blue-500 cursor-pointer" />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FilterSearchInput;
