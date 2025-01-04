import nuLogo from "../assets/NU_shield.png";
import defaultProfile from "../assets/defaultProfile.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { name } = useSelector((state) => state.users);

  return (
    <header className="flex justify-between bg-[#34418E] px-8 py-2 font-montserrat border-b-4 border-b-[#FFD51D] header">
      <Link to="/dashboard">
        <div className="flex items-center">
          <img
            src={nuLogo}
            alt="national university logo"
            className="h-10 w-10 mr-2"
          />
          <h1 className="text-[1.125rem] text-white tracking-widest">
            CLASSTRACK
          </h1>
        </div>
      </Link>
      <div className="flex items-center max-w-[]">
        <img
          src={defaultProfile}
          alt="user profile picture"
          className="rounded-full size-8 mr-2"
        />
        <p className="text-white text-sm">{name ? name : "Guest"}</p>
      </div>
    </header>
  );
};

export default Header;
