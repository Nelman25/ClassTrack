import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div>
      <h1 className="text-5xl">Landing page</h1>
      <Link to={"/login"} className="text-2xl underline text-blue-600">Go to login page</Link>
    </div>
  );
};

export default LandingPage;
