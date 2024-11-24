import nuLogo from "../assets/NU_shield.png";
import profile from "../assets/FormalPic200x200.jpg";

const Header = () => {
  return (
    <header className="flex justify-between mx-auto bg-[#2E2EA1] px-8 py-2 font-montserrat border-b-4 border-b-yellow-500">
      <div className="flex items-center">
        <img
          src={nuLogo}
          alt="national university logo"
          className="h-10 w-10 mr-2"
        />
        <h1 className="text-[1.125rem] text-white tracking-widest">CLASSTRACK</h1>
      </div>
      <div className="flex items-center max-w-[]">
        <img src={profile} alt="user profile picture" className="rounded-full size-8 mr-2" />
        <p className="text-white text-sm">Jonel Villaver</p>
      </div>
    </header>
  );
};

export default Header;
