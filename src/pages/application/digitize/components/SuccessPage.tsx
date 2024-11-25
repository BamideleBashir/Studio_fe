import { Link } from "react-router-dom";
import { INucleus } from "./AddAttributes";

type Props = {
  nucleus: INucleus;
};

const SuccessPage = ({ nucleus }: Props) => {
  return (
    <div>
      <div>
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-4">
          You have successfully digitized a {nucleus?.title}
        </h2>

        <p className="text-gray-700">
          Congratulations! Now you have a unique, digital identity that will
          represents this car in spatial domains.
        </p>
      </div>

      <div className="mt-20 border border-gray-100 p-6 rounded-lg shadow">
        <p className="text-gray-700 mt-4 font-medium">
          Your ByteID:
        </p>

        <div className="bg-[#fdfeff] rounded-lg mt-4">
          <p className="text-gray-800 text-4xl font-semibold">
            SPKFDNJSKLJFG03
          </p>
        </div>

        {/* link  view object page */}
        <div className="mt-8">
          <button
            className="bg-primary text-white p-2 px-4 rounded-lg block w-full"
          >
            View Object Page
          </button>
        </div>
      </div>

      {/* back home */}
      <div className="mt-10 text-center underline">
        <Link
          to="/home"
          className="bg-white text-black p-2 px-4 rounded-lg block w-full font-medium"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
