import { IoIosClose } from "react-icons/io";
import { INucleus } from "./AddAttributes";
import { useState } from "react";

type Props = {
  nucleus: INucleus;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
  handleCreateObject: () => void;
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
};

const AddVisuals = ({
  nucleus,
  setSelectedTab,
  handleCreateObject,
  images,
  setImages,
}: Props) => {
  const [loading, setLoading] = useState(false);

  const handleImagesSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const selectedImages = Array.from(files);
    setImages(selectedImages);
  };

  const handleComplete = () => {
    if (images.length === 0) {
      alert("Please select at least one image");
      return;
    }

    setLoading(true);

    handleCreateObject();
  };

  return (
    <div>
      <div>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Add Visuals for{" "}
          <span className="text-blue-500">{nucleus?.title}</span>
        </h2>

        <p>{nucleus?.objectDescription}</p>
      </div>

      <div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Add Visuals
        </h3>

        <div className="mt-4">
          <input
            type="file"
            accept="image/*"
            className="w-full bg-[#fdfeff] p-2 rounded-lg border border-gray-300"
            multiple
            onChange={handleImagesSelect}
          />
        </div>

        <div className="mt-4">
          <div className="grid grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt=""
                  className="w-full h-40 object-cover rounded-lg"
                />
                <button
                  className="absolute top-2 right-2 bg-white p-2 rounded-lg"
                  onClick={() => {
                    const newImages = [...images];
                    newImages.splice(index, 1);
                    setImages(newImages);
                  }}
                >
                  <IoIosClose className="text-2xl text-red-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-10">
        <div className="mt-6">
          <button
            onClick={() => handleComplete()}
            // disabled={loading}
            className="bg-primary text-white p-2 px-4 rounded-lg block w-full"
          >
            {loading ? "Loading..." : "Complete"}
          </button>
        </div>

        <div className="mt-6">
          <button
            onClick={() => setSelectedTab("add_visuals")}
            className="bg-white text-black p-2 px-4 rounded-lg block w-full font-medium"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddVisuals;
