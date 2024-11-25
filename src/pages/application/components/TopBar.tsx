import { RxHamburgerMenu } from "react-icons/rx";
import FullLogo from "../../.../../../assets/logo/full_logo.png";
import { Link } from "react-router-dom";

const TopBar = () => {
  return (
    <div>
      <div className="flex justify-between items-center px-4 py-2 bg-white shadow-sm">
        <div className="flex items-center">
          <RxHamburgerMenu className="text-3xl text-black cursor-pointer hidden" />
          <Link to="/home">
            <img src={FullLogo} alt="logo" className="h-16" />
          </Link>
        </div>

        <div className="flex items-center">
          <Link to="/profile">
            <img
              src="https://avatar.iran.liara.run/public/boy?username=Ash"
              alt="avatar"
              className="h-10 w-10 rounded-full"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
