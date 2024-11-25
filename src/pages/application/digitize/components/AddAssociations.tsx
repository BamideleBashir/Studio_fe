import { INucleus } from "./AddAttributes";

type Props = {
  nucleus: INucleus;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
};

const AddAssociations = ({ nucleus, setSelectedTab }: Props) => {
  return (
    <div>
      <div>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Add Associations for{" "}
          <span className="text-blue-500">{nucleus?.title}</span>
        </h2>

        <p>{nucleus?.objectDescription}</p>
      </div>

      <div className="mb-10">
        <div className="mt-6">
          <button
            onClick={() => setSelectedTab('add_visuals')}
            className="bg-primary text-white p-2 px-4 rounded-lg block w-full"
          >
            Continue
          </button>
        </div>

        <div className="mt-6">
          <button
            onClick={() => setSelectedTab('add_attributes')}
            className="bg-white text-black p-2 px-4 rounded-lg block w-full font-medium"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAssociations;
