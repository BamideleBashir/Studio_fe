import { FaCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";

const SuccessTab = () => {
  return (
    <div className="max-w-[600px] text-center shadow-md mx-auto p-6 mt-8">
      <div className="">
        <FaCheck className="text-6xl text-black mx-auto" />
      </div>
      <h2 className="text-lg font-semibold mb-1 ">Success</h2>
      <p className="text-sm text-gray-600 mb-4">
        Your scape has been created successfully
      </p>

      <div className="flex bg">
        <Link to="/home" className="button w-full btn-primary">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default SuccessTab;
