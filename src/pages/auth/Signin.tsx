import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FullLogo from "../../assets/logo/image.png";
import AuthApi from "../../api/authApi";
import { useDispatch } from "react-redux";
import { login } from "../../reducers/authSlice";

const Signin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const [signinData, setSigninData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSigninData({
      ...signinData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    AuthApi.login(signinData.email, signinData.password)
      .then((res) => {
        setLoading(false);

        console.log(res);
        const payload = {
          token: res.token,
          user: res.user,
        };

        dispatch(login(payload));
        navigate("/home");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        setError(
          err.response.message ||
            "Something went wrong. Please try again later."
        );
      });
  };

  return (
    <div>
      <div className="p-4 px-8 max-w-[500px] mx-auto mt-20 rounded-lg shadow mb-20">
        <div className="text-center">
          <img src={FullLogo} alt="Logo" className="h-28 mx-auto" />
        </div>

        <h1 className="text-2xl font-semibold mb-6 mt-8">
          Login with your ByteId
        </h1>

        {/* <p className="text-center text-sm text-gray-700 mb-10">
          Login with your ByteId to continue
        </p> */}

        {error && (
          <div
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
            role="alert"
            onClick={() => setError("")}
          >
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-10">
            <label className="hidden" htmlFor="email">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter email or byteId"
              value={signinData.email}
              onChange={handleChange}
              className="w-full p-2 border-b-2 border-black"
              required
            />
          </div>

          <div className="mb-4">
            <label className="hidden" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              value={signinData.password}
              onChange={handleChange}
              className="w-full p-2 border-b-2 border-black"
              required
            />
          </div>

          {/* forgot password */}
          <Link
            to="/community/forgot-password"
            className="block text-primary text-sm underline"
          >
            Forgot password?
          </Link>

          <button
            className="w-full bg-black text-white p-2 rounded-full mt-10 font-bold"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Signin"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="text-red">
              Create Byte Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
