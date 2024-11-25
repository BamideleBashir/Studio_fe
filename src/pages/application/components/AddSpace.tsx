import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import MapBG from "../../../assets/home-banner-map_small.png";

const AddSpace = () => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = () => {
    console.log(searchInput);
  };

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

      <div className="mt-4 rounded-lg"
        style={{
          backgroundImage: `url(${MapBG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "300px",
        }}
      >
        <div className="flex items-end justify-center h-full gap-2 text-blue-600 bg-black bg-opacity-10 pb-6">
          <p className="font-medium mt-4 bg-white p-1 px-2 text-sm rounded-full">Create a new space</p>
          <p className="font-medium mt-4 bg-white p-1 px-2 text-sm rounded-full">Upload your polygon shapefile</p>
        </div>
      </div>

      <div>
        <p className="font-medium mt-4">Recent Spaces</p>
      </div>
    </div>
  )
}

export default AddSpace