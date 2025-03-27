import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signup from "./pages/auth/Signup";
import Signin from "./pages/auth/Signin";
import AppLayout from "./pages/application/components/AppLayout";
import Home from "./pages/application/Home";
import Profile from "./pages/profile/Profile";
// import CreateScapes from "./pages/application/scapes/CreateScapes";
import CreateScape from "./pages/CreateScape";
import ScapeDetails from "./pages/ScapeDetails";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="signup" element={<Signup />} />

          <Route path="/" element={<AppLayout />}>
            <Route path="home" element={<Home />} />
            <Route path="create-scape" element={<CreateScape />} />
            <Route path="scape-details/:id" element={<ScapeDetails />} />

            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
