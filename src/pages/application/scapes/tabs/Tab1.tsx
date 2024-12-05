/* eslint-disable @typescript-eslint/no-explicit-any */
import { IScapeState } from "../../../../types";
import AddObjects from "../components/AddObjects";
import { toast } from "react-toastify";

type Props = {
  scapeState: IScapeState;
  setScapeState: any;
  setSelectedTab: any;
  selectedObjects: any[];
  setSelectedObjects: any;
};

const CategoriesList = [
  "Transportation",
  "Education",
  "Health",
  "Finance",
  "Agriculture",
  "Tourism",
  "Real Estate",
  "Sports",
  "Entertainment",
  "Others",
];

const Tab1 = ({ scapeState, setScapeState, setSelectedTab, selectedObjects, setSelectedObjects  }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScapeState({
      ...scapeState,
      scapeTitle: e.target.value,
    });
  };

  const handleButtonClick = () => {
    if (!scapeState.scapeTitle) {
      toast.error("Please fill in the scape title");
      return;
    }

    if (!scapeState.about) {
      toast.error("Please fill in the about field");
      return;
    }

    if (!scapeState.category) {
      toast.error("Please select a category");
      return;
    }

    // if (scapeState.objectClass.length < 1) {
    //   toast.error("Please add objects");
    //   return;
    // }

    console.log(scapeState);

    setSelectedTab("tab2");
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <label className="label" htmlFor="scape-title">
          Scape Title
        </label>
        <input
          type="text"
          id="scape-title"
          name="scape-title"
          value={scapeState.scapeTitle}
          onChange={handleChange}
          className="input"
          placeholder="Enter the title of your scape"
        />
      </div>

      <div className="mb-4">
        <label className="label" htmlFor="about">
          About
        </label>
        <textarea
          id="about"
          name="about"
          value={scapeState.about}
          onChange={(e) =>
            setScapeState({
              ...scapeState,
              about: e.target.value,
            })
          }
          className="input"
          placeholder="Enter a brief description of your scape"
        />
      </div>

      <div className="mb-4">
        <label className="label" htmlFor="category">
          Category
        </label>
        <select
          id="category"
          name="category"
          value={scapeState.category}
          onChange={(e) =>
            setScapeState({
              ...scapeState,
              category: e.target.value,
            })
          }
          className="input"
        >
          <option value="">Select a category</option>
          {CategoriesList.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <AddObjects
          scapeState={scapeState}
          setScapeState={setScapeState}
          selectedObjects={selectedObjects}
          setSelectedObjects={setSelectedObjects}
        />
      </div>

      <div>
        <div className="flex justify-end">
          <button className="button" onClick={handleButtonClick}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tab1;
