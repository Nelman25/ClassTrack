import { SiGoogleclassroom } from "react-icons/si";
import { LuClipboardEdit } from "react-icons/lu";
import { TbEdit } from "react-icons/tb";
import { MdSpaceDashboard } from "react-icons/md";
import { Link, useLocation, useParams } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { auth } from "../config/firebase";
import { useEffect, useState } from "react";

const TAB_CLASS =
  "flex items-center gap-2 text-slate-700 text-lg w-full px-4 py-4 group hover:bg-[#4040a5] hover:text-white";

const Sidebar = () => {
  const { classId } = useParams();
  const location = useLocation();
  const [active, setActive] = useState("masterlist");

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("gradingsheet")) setActive("gradingsheet");
    else if (path.includes("attendancesheet")) setActive("attendancesheet");
    else if (path.includes("masterlist")) setActive("masterlist");
  }, [location]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User logged out successfully.");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <aside className="w-[15rem] h-[50rem] pt-24 sidebar relative">
      <nav>
        <ul className="min-w-[240px]">
          <Link to={`/dashboard`}>
            <li className={TAB_CLASS}>
              <MdSpaceDashboard className="group-hover:text-white text-[#2E2EA1]" />
              Dashboard
            </li>
          </Link>
          <Link to={`/masterlist/${classId}`}>
            <li
              className={`${TAB_CLASS} ${
                active === "masterlist" && "bg-[#4040a5] text-white"
              }`}
            >
              <SiGoogleclassroom
                className={`group-hover:text-white text-[#2E2EA1] ${
                  active === "masterlist" && "text-white "
                }`}
              />
              Masterlist
            </li>
          </Link>
          <Link to={`/gradingsheet/${classId}`}>
            <li
              className={`${TAB_CLASS} ${
                active === "gradingsheet" && "bg-[#4040a5] text-white"
              }`}
            >
              <TbEdit
                className={`text-[#2E2EA1] group-hover:text-white ${
                  active === "gradingsheet" && "text-white"
                }`}
              />
              Grading sheet
            </li>
          </Link>
          <Link to={`attendancesheet/${classId}`}>
            <li
              className={`${TAB_CLASS} ${
                active === "attendancesheet" && "bg-[#4040a5] text-white"
              }`}
            >
              <LuClipboardEdit
                className={`text-[#2E2EA1] group-hover:text-white ${
                  active === "attendancesheet" && "text-white"
                }`}
              />
              Attendance sheet
            </li>
          </Link>
        </ul>
      </nav>
      <button
        onClick={handleLogout}
        className="flex w-full items-center justify-center gap-2 text-lg font-medium text-slate-800 absolute bottom-0 group hover:text-blue-400"
      >
        <CiLogout className="text-xl group-hover:text-blue-400" /> Logout
      </button>
    </aside>
  );
};

export default Sidebar;
