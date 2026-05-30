/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { IScapeFormState } from "../CreateScape";
import axios from "axios";
import { toast } from "react-toastify";

// Nominatim `jsonv2` result shape (with polygon_geojson=1 & addressdetails=1)
interface NominatimAddress {
  country?: string;
  country_code?: string;
  state?: string;
  region?: string;
  county?: string;
  city?: string;
  town?: string;
  village?: string;
}

interface NominatimGeoJSON {
  type: string;
  coordinates: number[][][];
}

interface NominatimResult {
  place_id: number;
  osm_id: number;
  lat: string;
  lon: string;
  display_name: string;
  type: string;
  class: string;
  address?: NominatimAddress;
  geojson?: NominatimGeoJSON;
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

const ScapeGeometry = ({ scapeState, setScapeState }: Props) => {
  console.log("scapeState", scapeState);

  const [searchResults, setSearchResults] = useState<NominatimResult[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    if (!searchQuery) return;
    setLoading(true);

    const baseUrl = "https://nominatim.openstreetmap.org/search";

    // jsonv2 returns lat/lon (center), the geojson polygon, AND an address
    // object (state, country, country_code...) in a single request — so no
    // separate reverse-geocode call is needed.
    const params = {
      format: "jsonv2",
      polygon_geojson: 1,
      addressdetails: 1,
      limit: 10,
      q: searchQuery,
    };

    try {
      const response = await axios.get<NominatimResult[]>(baseUrl, { params });

      // keep only results that actually have a Polygon boundary
      const polygonResults = (response.data || []).filter(
        (result) => result.geojson?.type === "Polygon"
      );

      if (polygonResults.length === 0) {
        toast.error("No polygon boundary found for that search");
      }

      setSearchResults(polygonResults);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch search results");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectResult = (result: NominatimResult) => {
    if (!result.geojson) return;

    const newGeometry: IGeometry = {
      type: "Polygon",
      coordinates: result.geojson.coordinates,
    };

    // Center point [lng, lat] — GeoJSON order — for proximity filtering.
    const position = {
      type: "Point" as const,
      coordinates: [parseFloat(result.lon), parseFloat(result.lat)],
    };

    const address = result.address || {};
    const location = {
      country: address.country || "",
      countryCode: (address.country_code || "").toUpperCase(),
      state: address.state || address.region || "",
      city: address.city || address.town || address.village || address.county || "",
      displayName: result.display_name || "",
    };

    setScapeState((prevState: IScapeFormState) => ({
      ...prevState,
      geometry: newGeometry,
      position,
      location,
    }));

    toast.info(`${result.display_name} selected`);

    setSearchResults([]);
    // setSearchQuery('');
  };

  const handleClearLocation = () => {
    setScapeState((prevState: IScapeFormState) => ({
      ...prevState,
      geometry: { type: "Polygon", coordinates: [] },
      position: { type: "Point", coordinates: [] },
      location: {
        country: "",
        countryCode: "",
        state: "",
        city: "",
        displayName: "",
      },
    }));
  };

  const selectedLocation = scapeState.location;
  const selectedPosition = scapeState.position;
  const hasSelectedLocation = Boolean(selectedLocation?.displayName);

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

        {hasSelectedLocation && (
          <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2 min-w-0">
                <svg
                  className="w-5 h-5 text-green-600 shrink-0 mt-0.5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-green-700">
                    Selected location
                  </p>
                  <p className="text-sm text-gray-800 break-words">
                    {selectedLocation?.displayName}
                  </p>

                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {selectedLocation?.city && (
                      <span className="text-xs bg-white border border-green-200 text-green-800 rounded-full px-2 py-0.5">
                        {selectedLocation.city}
                      </span>
                    )}
                    {selectedLocation?.state && (
                      <span className="text-xs bg-white border border-green-200 text-green-800 rounded-full px-2 py-0.5">
                        {selectedLocation.state}
                      </span>
                    )}
                    {selectedLocation?.country && (
                      <span className="text-xs bg-white border border-green-200 text-green-800 rounded-full px-2 py-0.5">
                        {selectedLocation.country}
                        {selectedLocation.countryCode
                          ? ` (${selectedLocation.countryCode})`
                          : ""}
                      </span>
                    )}
                  </div>

                  {selectedPosition?.coordinates?.length === 2 && (
                    <p className="mt-2 text-xs text-gray-500">
                      Center: {selectedPosition.coordinates[1].toFixed(5)},{" "}
                      {selectedPosition.coordinates[0].toFixed(5)} (lat, lng)
                    </p>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={handleClearLocation}
                className="text-xs text-red-500 hover:underline shrink-0"
              >
                Clear
              </button>
            </div>
          </div>
        )}

        {searchResults.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-semibold mb-2">Search Results</h3>
            <ul>
              {searchResults.map((result) => (
                <li
                  key={result.place_id}
                  className="mb-2 cursor-pointer flex justify-between gap-2"
                >
                  <p className="text-sm">{result.display_name}</p>
                  <button
                    onClick={() => handleSelectResult(result)}
                    className="text-blue-500 hover:underline shrink-0"
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
