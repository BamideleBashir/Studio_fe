import { toast } from "react-toastify";
import { IScapeFormState } from "../CreateScape";

type Props = {
  formData: IScapeFormState;
  setFormData: (formData: IScapeFormState) => void;
  setSelectedTab: (value: string) => void;
};

const categoryList = [
  "Entertainment",
  "Education",
  "social",
  "Government",
  "transportation",
  "commerce",
  "health",
  "real estate",
  "environment",
];

const ScapeBasicInfo = ({ formData, setFormData, setSelectedTab }: Props) => {
  const handleNextClick = () => {
    if (!formData.title || !formData.description || !formData.category) {
      toast.error("Please fill all the fields");
      return;
    }

    console.log(formData);
    setSelectedTab("scape_objects");
  };
  return (
    <div>
      {/* title description category */}
      <div className="text-center mt-8">
        <h1 className="text-2xl font-bold text-black">
          Create new Discovery scape
        </h1>
        <p>To discover the location of objects in the real world only.</p>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-sm font-semibold text-black">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="border border-gray-300 rounded-md px-4 py-2"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="description"
            className="text-sm font-semibold text-black"
          >
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="border border-gray-300 rounded-md px-4 py-2"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="category"
            className="text-sm font-semibold text-black"
          >
            Category
          </label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="border border-gray-300 rounded-md px-4 py-2"
          >
            <option value="">Select a category</option>
            {categoryList.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* owner  */}
      <div className="flex flex-col gap-4 mt-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="owner" className="text-sm font-semibold text-black">
            Owner
          </label>
          <input
            type="text"
            id="owner"
            value={formData.owner?.name || ""}
            onChange={(e) =>
              setFormData({ ...formData, owner: { ...formData.owner, name: e.target.value } })
            }
            className="border border-gray-300 rounded-md px-4 py-2"
            placeholder="e.g Apple Inc"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="ownerLink"
            className="text-sm font-semibold text-black"
          >
            Owner Link
          </label>
          <input
            type="text"
            id="ownerLink"
            value={formData.owner?.link || ""}
            onChange={(e) =>
              setFormData({ ...formData, owner: { ...formData.owner, link: e.target.value } })
            }
            className="border border-gray-300 rounded-md px-4 py-2"
            placeholder="e.g www.apple.com"
          />
        </div>
      </div>
      <div className="mt-6">
        <button
          className="bg-primary text-white p-3 font-bold rounded-lg w-full"
          onClick={() => handleNextClick()}
        >
          Next
        </button>
      </div>{" "}
    </div>
  );
};

export default ScapeBasicInfo;
