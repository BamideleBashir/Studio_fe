/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { IScapeFormState } from "../CreateScape";
import axios from "axios";
import { toast } from "react-toastify";

interface FeatureGeocoding {
  place_id: number;
  osm_type: string;
  osm_id: number;
  osm_key: string;
  osm_value: string;
  type: string;
  label: string;
  name: string;
}

interface FeatureProperties {
  geocoding: FeatureGeocoding;
}

interface Geometry {
  type: string;
  coordinates: number[][][]; // 3D array of numbers
}

interface IFeature {
  type: string;
  properties: FeatureProperties;
  geometry: Geometry;
}

type Props = {
  scapeState: IScapeFormState;
  setScapeState: any;
};

type IGeometry = {
  type:
    | "Point"
    | "LineString"
    | "Polygon"
    | "MultiPoint"
    | "MultiLineString"
    | "MultiPolygon"
    | "GeometryCollection";
  coordinates: number[][][];
};

// type Position = {
//   type: "Point";
//   coordinates: number[];
// };

const ScapeGeometry = ({ scapeState, setScapeState }: Props) => {
  console.log("scapeState", scapeState);

  const [searchResults, setSearchResults] = useState<IFeature[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    if (!searchQuery) return;
    setLoading(true);

    const baseUrl = "https://nominatim.openstreetmap.org/search";

    const params = {
      format: "geocodejson",
      polygon_geojson: 1,
      q: searchQuery,
    };

    const response = await axios.get(baseUrl, { params });

    if (!response) {
      setLoading(false);
      toast.error("Failed to fetch search results");
    }

    const data = response.data;
    const features: IFeature[] = data.features;

    // get only features where the geometry type is polygon
    const polygonFeatures = features.filter(
      (feature) => feature.geometry.type === "Polygon"
    );

    if (!polygonFeatures) {
      setLoading(false);
      toast.error("No polygon features found for selected location");
    }

    setSearchResults(polygonFeatures);
    setLoading(false);
  };

  const handleSelectResult = (feature: IFeature) => {
    const geometry = feature.geometry;
    const coordinates = geometry.coordinates; // Assuming the first coordinate array is the boundary

    const newGeometry: IGeometry = {
      type: "Polygon",
      coordinates: coordinates,
    };

    setScapeState((prevState: IScapeFormState) => ({
      ...prevState,
      geometry: newGeometry,
    }));

    toast.info(`${feature.properties.geocoding.label} selected`);

    setSearchResults([]);
    // setSearchQuery('');
  };

  return (
    <div className="space-y-4 mt-4">
      <div>
        <h2 className="text-lg font-semibold mb-1">Scape Spatial Domain</h2>
        <p className="text-sm text-gray-600 mb-4">
          Search and select a location to define the spatial domain of your
          scape, <br /> You may search for a place, city, or region. e,g New
          York City, US or Lagos, Nigeria.
        </p>

        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a place"
            className="w-full p-2 pr-10 bg-gray-50 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        </div>

        {loading && (
          <div className="mt-4 text-center text-gray-600">
            <p>Loading...</p>
          </div>
        )}

        {searchResults.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-semibold mb-2">Search Results</h3>
            <ul>
              {searchResults.map((result, index) => (
                <li
                  key={index}
                  className="mb-2 cursor-pointer flex justify-between"
                >
                  <p>{result.properties.geocoding.label}</p>
                  <button
                    onClick={() => handleSelectResult(result)}
                    className="text-blue-500 hover:underline"
                  >
                    select
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScapeGeometry;
