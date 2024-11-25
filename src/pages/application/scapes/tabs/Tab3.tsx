/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "react-toastify";
import { ScapeApi } from "../../../../api/scapeApi";
import { IScapeState } from "../../../../types";

type Props = {
  scapeState: IScapeState;
  setScapeState: any;
  setSelectedTab: any;
  selectedObjects: any[];
};

const Tab3 = ({ scapeState, setScapeState, setSelectedTab, selectedObjects }: Props) => {
  console.log(selectedObjects);

  const handleSubmitClick = () => {
    console.log(scapeState);
    
    ScapeApi.create(scapeState)
      .then((response) => {
        console.log(response);
        toast.success("Scape created successfully");    
        setSelectedTab("tab4");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.msg || "Failed to create scape");
      });
  };



  const handleChange =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setScapeState({
        ...scapeState,
        scapeOwnershipLabel: {
          ...scapeState.scapeOwnershipLabel,
          [key]: e.target.value,
        },
      });
    };

  const handleToggleEnabled = (checked: boolean) => {
    setScapeState({
      ...scapeState,
      searchEngine: {
        ...scapeState.searchEngine,
        enabled: checked,
      },
    });
  };

  return (
    <div className="p-4">
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-1">Scape Icon</h2>
        <p className="text-sm text-gray-600 mb-4">
          What Object class icon will represent this scape?
        </p>

        <div>
          <label htmlFor="">Select Object</label>
          <select
            className="input"
            value={scapeState.scapeIcon}
            onChange={(e) =>
              setScapeState({
                ...scapeState,
                scapeIcon: e.target.value,
              })
            }
          >
            {selectedObjects.map((object, index) => (
              <option key={index} value={object.title}>
                {object.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <div>
          <h2 className="text-lg font-semibold mb-1">Scape ownership label</h2>
          <p className="text-sm text-gray-600 mb-4">
            What owners name should appear on this scape
          </p>

          {/* Owner Name Input */}
          <div className="space-y-2">
            <label className="block">
              <span className="text-sm font-medium flex items-center">
                Owner name
                <span className="text-red-500 ml-0.5">*</span>
              </span>
              <input
                type="text"
                value={scapeState.scapeOwnershipLabel.ownerName}
                onChange={handleChange("ownerName")}
                placeholder="Eg Apple Inc"
                className="mt-1 w-full p-2 bg-gray-50 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
          </div>

          {/* Owner URL Input */}
          <div className="space-y-2 mt-2">
            <label className="block">
              <span className="text-sm font-medium">Owner url: http</span>
              <input
                type="text"
                value={scapeState.scapeOwnershipLabel.ownerUrl}
                onChange={handleChange("ownerUrl")}
                placeholder="http"
                className="mt-1 w-full p-2 bg-gray-50 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <h2 className="text-lg font-semibold mb-1">Comments</h2>
        <p className="text-sm text-gray-600 mb-2">
          Enable comments on this scape
        </p>

        <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border">
          <label className="flex justify-between w-full">
            <span className="text-sm">Enable search engine</span>
            <input
              type="checkbox"
              checked={scapeState.searchEngine.enabled}
              onChange={(e) => handleToggleEnabled(e.target.checked)}
              className="p-2 bg-gray-50 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
        </div>
      </div>

      <div className="space-y-4 mb-8 bg-[#f4f9ff] p-4 rounded-lg">
        <div>
          <p className="text-xl text-gray-900 font-medium">
            Template this scape
          </p>

          <p>
            Publish this scape as a template and allow others to use it as a
            starting point for their own scapes
          </p>
        </div>

        {/* check box */}
        <div className="">
          <label htmlFor="template" className="mt-4 flex items-center">
            <input
              type="checkbox"
              id="template"
              name="template"
              className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="text-sm">Publish as template</span>
          </label>
        </div>
      </div>

      {/* back and forward button */}
      <div className="flex justify-between">
        <button
          onClick={() => setSelectedTab("tab2")}
          className="bg-gray-200 px-4 py-2 rounded-lg"
        >
          Back
        </button>
        <button
          onClick={() => handleSubmitClick()}
          className="button px-4 py-2 text-white"
        >
          Complete
        </button>
      </div>
    </div>
  );
};

export default Tab3;
