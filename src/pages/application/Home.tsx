import { useNavigate } from "react-router-dom";
import RecentScape from "./scapes/components/RecentScape";
import Logo from "../../assets/logo/image.png";
import NewHomeIllustration from "../../assets/illustrations/new_home_illus.png";

const Home = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/create-scape");
  };

  return (
    <div className="px-6 mb-10">
      <div className="text-center">
        <img src={Logo} alt="Logo" className="w-auto h-32 mx-auto" />
        <p>Create Scapes, map-based virtual worlds for real world activities</p>
      </div>

      <img
        src={NewHomeIllustration}
        alt="Home Illustration"
        className="w-full h-64 mx-auto object-contain"
      />

      <div className="my-10 mb-3">
        <RecentScape />
      </div>

      <div>
        <div className="bg-[#FFF3EF] p-4 rounded-3xl">
          <div className="bg-white p-6 rounded-3xl">
            <h2 className="font-medium text-xl">What is a scape</h2>
            <p>
              A scape is a virtual world that can be used to simulate real world
              activities.
            </p>
          </div>
          <div className="mt-4 flex justify-end ">
            <button className="black_button" onClick={handleButtonClick}>
              Create New
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
