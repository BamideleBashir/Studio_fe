import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import Logo from "../../../assets/logo/image.png";
import { useAppSelector } from "../../../hooks/reduxHooks";

const TopBar = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div>
      <div className="flex justify-between items-center px-4 py-2 bg-white shadow-sm">
        <div className="flex items-center">
          <RxHamburgerMenu className="text-3xl text-black cursor-pointer hidden" />
          <Link to="/home">
            <img src={Logo} alt="logo" className="h-16" />
          </Link>
        </div>

        <div className="flex items-center">
          <Link to="/profile">
            <img
              src={user.photo?.url}
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
