import nuLogo from "../assets/NU_shield.png";

const Header = () => {
  return (
    <header className="max-w-[1440px] mx-auto bg-[#2E2EAA] px-12 py-2 font-hostGrotest">
      <div className="flex items-center">
        <img
          src={nuLogo}
          alt="national university logo"
          className="size-16 mr-2"
        />
        <h1 className="text-3xl leading-6">ClassTrack</h1>
      </div>
    </header>
  );
};

export default Header;
