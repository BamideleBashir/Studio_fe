/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { IScapeState } from "../../../../types";

type Props = {
  scapeState: IScapeState;
  setScapeState: any;
};

const SearchEngine = ({ scapeState, setScapeState }: Props) => {
  const value = scapeState.searchEngine;

  const [inputValue, setInputValue] = useState("");

  const handleAddKeyword = () => {
    if (!inputValue) return;

    setScapeState({
      ...scapeState,
      searchEngine: {
        ...value,
        keyword: [...value.keyword, inputValue],
      },
    });

    setInputValue("");
  };

  const handleRemoveKeyword = (keyword: string) => {
    setScapeState({
      ...scapeState,
      searchEngine: {
        ...value,
        keyword: value.keyword.filter((k) => k !== keyword),
      },
    });
  };

  const handleToggleEnabled = (checked: boolean) => {
    setScapeState({
      ...scapeState,
      searchEngine: {
        ...value,
        enabled: checked,
      },
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddKeyword();
    }
  };

  return (
    <div>
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold mb-1">Search engine</h2>
          <p className="text-sm text-gray-600 mb-4">
            Enable this scape to be discoverable on search
          </p>

          {/* Enable Toggle */}
          <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border">
            <label className="flex justify-between w-full">
              <span className="text-sm">Enable search engine</span>
              <input
                type="checkbox"
                checked={value.enabled}
                onChange={(e) => handleToggleEnabled(e.target.checked)}
                className="p-2 bg-gray-50 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
          </div>
        </div>

        {value.enabled && (
          <div>
            <h3 className="text-sm font-medium mb-2">Add keywords</h3>
            <p className="text-sm text-gray-600 mb-3">
              Add related words that should trigger this scape up on spatial
              search engine.
            </p>

            {/* Keywords Display */}
            <div className="flex flex-wrap gap-2 mb-3">
              {value.keyword.map((keyword: any) => (
                <div
                  key={keyword}
                  className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full"
                >
                  <span className="text-sm">{keyword}</span>
                  <button
                    onClick={() => handleRemoveKeyword(keyword)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <FaMinus size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Keyword Input */}
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter keywords"
                className="w-full p-2 pr-10 bg-gray-50 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleAddKeyword}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-600"
              >
                <FaPlus size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchEngine;
