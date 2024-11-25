import { useEffect, useState } from "react";
import { FaMinus, FaPlus, FaTablet } from "react-icons/fa6";
import { IScapeState } from "../../../../types";
import * as Switch from "@radix-ui/react-switch";

type Props = {
  scapeState: IScapeState;
  setScapeState: any;
};

const SpatialDomain = ({ scapeState, setScapeState }: Props) => {
  // spatialDomain: {
  //   enabled: "true",
  //   domains: [],
  //   limitPinningToDomain: false,
  // },

  const value = scapeState.spatialDomain;

  const [searchText, setSearchText] = useState("");

  const handleToggleEnabled = (checked: boolean) => {
    setScapeState({
      ...scapeState,
      spatialDomain: {
        ...value,
        enabled: checked ? "true" : "false",
      },
    });
  };

  const handleAddDomain = () => {
    if (!searchText) return;

    setScapeState({
      ...scapeState,
      spatialDomain: {
        ...value,
        domains: [...value.domains, searchText],
      },
    });

    setSearchText("");
  };

  const handleRemoveDomain = (domain: string) => {
    setScapeState({
      ...scapeState,
      spatialDomain: {
        ...value,
        domains: value.domains.filter((d) => d !== domain),
      },
    });
  };

  const handleToggleLimitPinning = (checked: boolean) => {
    setScapeState({
      ...scapeState,
      spatialDomain: {
        ...value,
        limitPinningToDomain: checked,
      },
    });
  };

  return (
    <div>
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-1">
            Spatial domain(Location)
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Where are you publishing this scape, people in what location is it
            relevant to?
          </p>

          {/* Public Spatial Domains Toggle */}
          <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border">
          <label className="flex justify-between w-full">
              <span className="text-sm">Public Spatial domains</span>
              <input
                type="checkbox"
                checked={value.enabled === "true"}
                onChange={(e) => handleToggleEnabled(e.target.checked)}
                className="p-2 bg-gray-50 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
          </div>
        </div>

        {value.enabled === "true" && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Spatial domains*</h3>
              <p className="text-sm text-gray-600 mb-3">
                Add where users should discover or engage this
              </p>

              <div className="border p-4 rounded-lg">
                {/* Search Input */}
                <div className="relative mb-3">
                  <input
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Search public spatial domains"
                    className="w-full p-2 pr-10 bg-gray-50 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleAddDomain}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-600"
                  >
                    <FaPlus size={20} />
                  </button>
                </div>

                {/* Domain List */}
                <div className="space-y-2">
                  {value.domains.map((domain) => (
                    <div
                      key={domain}
                      className="flex items-center justify-between p-2 bg-white rounded-lg border"
                    >
                      <span className="text-sm">{domain}</span>
                      <button
                        onClick={() => handleRemoveDomain(domain)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <FaMinus size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Limit Pinning Toggle */}
        <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border">
          <label className="flex justify-between w-full">
            <span className="text-sm">Limit pinning to domain</span>
            <input
              type="checkbox"
              className="p-2 bg-gray-50 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
              checked={value.limitPinningToDomain}
              onChange={(e) => handleToggleLimitPinning(e.target.checked)}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default SpatialDomain;
