import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { useEffect } from "react";

const AppLayout = () => {
  const user = useAppSelector((state) => state.auth.user);

  if (!user || !user.byteId) {
    console.log("redirecting to login");
    window.location.href = "/";
  }

  // console.log(user);

  useEffect(() => {
    console.log("user", user);
    if (!user || !user.byteId) {
      window.location.href = "/"; 
    }
  }, [user]);

  return (
    <div>
      <TopBar />
      
      <div className="max-w-[1200px] mx-auto mt-4">
        <Outlet />
      </div>
    </div>
  )
}

export default AppLayout