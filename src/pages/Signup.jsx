import { useState } from "react";
import { TfiEmail } from "react-icons/tfi";
import { IoEyeOff } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import nuLogo from "../assets/NU_shield.png";
import { auth, db } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "../reducers/userSlice";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
    setError("");
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (password !== confirmPassword) {
        setError("Password doesn't match, please try again.");
        return;
      }

      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      if (user) {
        const newUser = {
          email: user.email,
          name: user.email,
          uid: user.uid,
        };
        await setDoc(doc(db, "Users", user.uid), newUser);
        dispatch(setUser(newUser));
        console.log("User registered successfully!");
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="w-screen h-screen bg-[#35408F] flex justify-center items-center">
      <div className="w-[900px] bg-white h-[500px] shadow-2xl rounded-md flex overflow-hidden">
        <form onSubmit={handleSubmit} className="w-1/2 bg-white px-10 py-12">
          <h2 className="text-[#35408F] text-xl font-medium mb-6">
            Create an account
          </h2>

          <h2 className="text-[#337BB6] font-medium mb-1">Email</h2>
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
          <h2 className="text-[#337BB6] font-medium mb-1">Password</h2>
          <div className="border border-slate flex h-[43px] mb-4">
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
              className={`w-full h-full px-4 focus:outline-[#35408F] ${
                error && "border border-red-400 bg-red-100"
              }`}
              onChange={handlePasswordChange}
            />
          </div>
          <h2 className="text-[#337BB6] font-medium mb-1">Confirm password</h2>
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
              className={`w-full h-full px-4 focus:outline-[#35408F] ${
                error && "border border-red-400 bg-red-100"
              }`}
              onChange={handleConfirmPassword}
            />
          </div>
          <p className="text-red-400 text-center">{error}</p>
          <button
            type="submit"
            className="w-full mt-8 mb-8 py-2 bg-[#5CB85C] text-white hover:bg-[#41a741]"
          >
            Create account
          </button>
          <div className="flex justify-between">
            <Link to={"/login"}>
              <p className="text-[#337BC6] hover:underline">
                I already have an account
              </p>
            </Link>
            <p className="text-[#337BC6] hover:underline">Forgot Password</p>
          </div>
        </form>
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
      </div>
    </div>
  );
};

export default Signup;
