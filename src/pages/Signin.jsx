import { useState } from "react";
import nuLogo from "../assets/NU_shield.png";
import { TfiEmail } from "react-icons/tfi";
import { IoEyeOff } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { fetchUser } from "../services";
import { useDispatch } from "react-redux";
import { setUser } from "../reducers/userSlice";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      const currentUser = await fetchUser();
      dispatch(setUser(currentUser));
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="w-screen h-screen bg-[#35408F] flex justify-center items-center">
      <div className="w-[900px] bg-white h-[500px] shadow-2xl rounded-md flex overflow-hidden">
        <div className="w-1/2 bg-[#FFD51D]">
          <img
            src={nuLogo}
            alt="national university logo"
            className="w-[83px] h-[100px] mx-auto mt-20 mb-8"
          />
          <h1 className="text-[#35408F] text-3xl font-bold text-center my-2">
            Welcome to ClassTrack
          </h1>
          <p className="text-sm text-[#35408F] text-center py-2 px-8">
            Effortless student management designed just for you.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="w-1/2 px-10 py-12">
          <h2 className="text-[#35408F] text-2xl font-medium mb-12">Sign in</h2>

          <h2 className="text-lg text-[#337BB6] font-medium mb-1">Email</h2>
          <div className="border border-slate flex h-[43px] mb-4">
            <span className="inline-block p-3 bg-slate-300 border border-slate-400">
              <TfiEmail />
            </span>
            <input
              type="text"
              required
              placeholder="Email/Username"
              className="w-full h-full px-4 focus:outline-[#35408F]"
              onChange={handleEmailChange}
            />
          </div>
          <h2 className="text-lg text-[#337BB6] font-medium mb-1">Password</h2>
          <div className="border border-slate flex h-[43px]">
            <span
              onClick={handleShowPassword}
              className="inline-block p-3 bg-slate-300 border border-slate-400"
            >
              {showPassword ? <IoEye /> : <IoEyeOff />}
            </span>
            <input
              type={`${showPassword ? "text" : "password"}`}
              placeholder="Password"
              required
              className="w-full h-full px-4 focus:outline-[#35408F]"
              onChange={handlePasswordChange}
            />
          </div>
          <p className="text-red-500 text-center pt-2">{error}</p>
          <button
            type="submit"
            className="w-full mt-8 mb-12 py-2 bg-[#5CB85C] text-white hover:bg-[#41a741]"
          >
            Login
          </button>
          <div className="flex justify-between">
            <Link to={"/signup"}>
              <p className="text-[#337BC6] hover:underline">
                Create an account
              </p>
            </Link>
            <p className="text-[#337BC6] hover:underline">Forgot Password</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
