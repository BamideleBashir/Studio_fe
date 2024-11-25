/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { NucleusApi } from "../../../api/nucleusApi";

type FilterSearchInputProps = {
  setPrimaryObject: (primaryObject: string) => void;
};

const FilterSearchInput = ({
  setPrimaryObject,
}: FilterSearchInputProps) => {
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
    setPrimaryObject(result._id);
    setSearchInput(result.title)
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
      />


      <div>
        {!loading && searchResults.map((result) => (
          <div key={result.id} onClick={() => handleSelect(result)}
            className="p-2 cursor-pointer hover:bg-gray-100 bg-gray-50"
          >
            {result.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterSearchInput;
