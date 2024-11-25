/* eslint-disable @typescript-eslint/no-explicit-any */
import { IScapeState } from "../../../../types";
import SearchEngine from "../components/SearchEngine";
import SpatialDomain from "../components/SpatialDomain";

type Props = {
  scapeState: IScapeState;
  setScapeState: any;
  setSelectedTab: any;
};

const Tab2 = ({ scapeState, setScapeState, setSelectedTab }: Props) => {
  // add  view, pinComments, pinObjects, spatialDomain, searchEngine
  // view: {
  //   level: "public",
  //   users: [],
  // },
  // pinComments: {
  //   level: "public",
  //   users: [],
  // },
  // pinObjects: {
  //   level: "public",
  //   users: [],
  // },

  // function to control state from scapeState

  const onViewChange = (value: string) => {
    setScapeState({
      ...scapeState,
      view: {
        level: value,
        users: [],
      },
    });
  };

  const onCommentChange = (value: string) => {
    setScapeState({
      ...scapeState,
      pinComments: {
        level: value,
        users: [],
      },
    });
  };

  const onObjectChange = (value: string) => {
    setScapeState({
      ...scapeState,
      pinObjects: {
        level: value,
        users: [],
      },
    });
  };

  const handleButtonClick = () => {
    console.log(scapeState);
    setSelectedTab("tab3");
  };

  return (
    <div className="p-4 mb-8">
      <div className="space-y-6">
        {/* View Permissions */}
        <div>
          <h3 className="text-sm text-gray-600 mb-2">
            Who can view this scape?
          </h3>
          <div className="flex space-x-4 bg-[#e2edf8] p-2 rounded-md justify-between font-me">
            <label className="flex items-center">
              <input
                type="radio"
                name="viewPermission"
                value="public"
                checked={scapeState.view.level === "public"}
                onChange={(e) => onViewChange(e.target.value)}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-2 text-sm">Public</span>
            </label>

            <label className="flex items-center">
              <input
                type="radio"
                name="viewPermission"
                value="selected"
                disabled
                checked={scapeState.view.level === "selected"}
                onChange={(e) => onViewChange(e.target.value)}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-2 text-sm">Selected Users</span>
            </label>

            <label className="flex items-center">
              <input
                type="radio"
                name="viewPermission"
                value="admin"
                checked={scapeState.view.level === "admin"}
                onChange={(e) => onViewChange(e.target.value)}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-2 text-sm">Admin only</span>
            </label>
          </div>
        </div>

        {/* Pin Comments Permissions */}
        <div>
          <h3 className="text-sm text-gray-600 mb-2">
            Who can share comment within this scape?
          </h3>
          <div className="flex space-x-4 bg-[#e2edf8] p-2 rounded-md justify-between font-me">
            <label className="flex items-center">
              <input
                type="radio"
                name="commentPermission"
                value="public"
                checked={scapeState.pinComments.level === "public"}
                onChange={(e) => onCommentChange(e.target.value)}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-2 text-sm">Public</span>
            </label>

            <label className="flex items-center">
              <input
                type="radio"
                name="commentPermission"
                value="selected"
                disabled
                checked={scapeState.pinComments.level === "selected"}
                onChange={(e) => onCommentChange(e.target.value)}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-2 text-sm">Selected Users</span>
            </label>

            <label className="flex items-center">
              <input
                type="radio"
                name="commentPermission"
                value="admin"
                checked={scapeState.pinComments.level === "admin"}
                onChange={(e) => onCommentChange(e.target.value)}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-2 text-sm">Admin only</span>
            </label>
          </div>
        </div>

        {/* Pin Objects Permissions */}
        <div>
          <h3 className="text-sm text-gray-600 mb-2">
            Who can pin objects within this scape?
          </h3>
          <div className="flex space-x-4 bg-[#e2edf8] p-2 rounded-md justify-between font-me">
            <label className="flex items-center">
              <input
                type="radio"
                name="objectPermission"
                value="public"
                checked={scapeState.pinObjects.level === "public"}
                onChange={(e) => onObjectChange(e.target.value)}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-2 text-sm">Public</span>
            </label>

            <label className="flex items-center">
              <input
                type="radio"
                name="objectPermission"
                value="selected"
                disabled
                checked={scapeState.pinObjects.level === "selected"}
                onChange={(e) => onObjectChange(e.target.value)}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-2 text-sm">Selected Users</span>
            </label>

            <label className="flex items-center">
              <input
                type="radio"
                name="objectPermission"
                value="admin"
                checked={scapeState.pinObjects.level === "admin"}
                onChange={(e) => onObjectChange(e.target.value)}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-2 text-sm">Admin only</span>
            </label>
          </div>
        </div>

        {/* Spatial Domain */}
        <SpatialDomain scapeState={scapeState} setScapeState={setScapeState} />

        {/* Search Engine */}
        <SearchEngine scapeState={scapeState} setScapeState={setScapeState} />

        {/* back and forward button */}
        <div className="flex justify-between">
          <button
            onClick={() => setSelectedTab("tab1")}
            className="bg-gray-200 px-4 py-2 rounded-lg"
          >
            Back
          </button>
          <button
            onClick={() => handleButtonClick()}
            className="button bg-blue-500 px-4 py-2 rounded-lg text-white"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tab2;
