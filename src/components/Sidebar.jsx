import { SiGoogleclassroom } from "react-icons/si";
import { LuClipboardEdit } from "react-icons/lu";
import { TbEdit } from "react-icons/tb";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="max-w-[18rem] max-h-[53rem] h-[60rem] pt-24 bg-slate-50">
      <nav>
        <ul className="">
          <Link to="/masterlist">
            <li className="flex items-center gap-2 text-slate-700 text-2xl w-full px-8 py-4 hover:bg-blue-400 hover:text-white">
              <SiGoogleclassroom className="text-blue-600 hover:text-white" />
              Masterlist
            </li>
          </Link>
          <Link to="/gradingsheet">
            <li className="flex items-center gap-2 text-slate-700 text-2xl w-full px-8 py-4 hover:bg-blue-400 hover:text-white">
              <TbEdit className="text-blue-600 hover:text-white" />
              Grading sheet
            </li>
          </Link>
          <Link to="gradingsheet">
            <li className="flex items-center gap-2 text-slate-700 text-2xl w-full px-8 py-4 hover:bg-blue-400 hover:text-white">
              <LuClipboardEdit className="text-blue-600 hover:text-white" />
              Attendance sheet
            </li>
          </Link>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
