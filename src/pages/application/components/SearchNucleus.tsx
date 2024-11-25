import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { NucleusApi } from "../../../api/nucleusApi";
import { useNavigate } from "react-router-dom";

const ListOfCommonSearchedItems = [
  "Car",
  "Mobile",
  "Bed",
  "Sofa",
  "Lamp",
  "Cupboard",
];

const SearchNucleus = () => {
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

  const navigate = useNavigate();

  const onSearchResultClick = (result: any) => {
    console.log(result);
    navigate(`/digitize/${result._id}`);
  }

  // listen for changes in search input and call search function but debounce it
  useEffect(() => {
    if (!searchInput) {
      setSearchResults([]);
      return
    }

    const timer = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  return (
    <div>
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

        <div className="bg-white rounded-lg" onClick={handleSearch}>
          <IoIosSearch className="text-2xl text-gray-600 cursor-pointer" />
        </div>
      </div>

      <div className="mb-8">
        {
          loading && (
            <div className="mt-4 bg-[#f6f7f8] p-4 rounded-lg text-center">
              <p className="text-gray-600">Loading...</p>
            </div>
          )
        }
        {!loading && searchResults.length > 0 && searchResults.map((result) => (
          <div
            key={result._id}
            className="mt-4 flex justify-between items-center bg-[#f4f5f7] p-4 rounded-lg"
            onClick={() => onSearchResultClick(result)}
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
                <div>
                  <p className="text-sm text-gray-600">
                    Category: {result.category}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white p-2 rounded-lg hidden">
                <IoIosSearch className="text-2xl text-blue-500 cursor-pointer" />
              </div>
            </div>
          </div>
        ))}

        {/* {!loading && searchResults.length === 0 && (
          <div className="mt-4 bg-[#f6f7f8] p-4 rounded-lg text-center">
            <p className="text-gray-600">No search results found</p>
          </div>
        )} */}
      </div>

      <div className="mt-2">
        <h4 className="font-bold">Commonly searched items</h4>

        <div className="mt-4 grid grid-cols-4 gap-4">
          {ListOfCommonSearchedItems.map((item) => (
            <div
              key={item}
              className="bg-[#f4f5f7] p-3 rounded-lg text-center cursor-pointer"
              onClick={() => setSearchInput(item)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default SearchNucleus;
