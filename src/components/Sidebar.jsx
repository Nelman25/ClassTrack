import { SiGoogleclassroom } from "react-icons/si";
import { LuClipboardEdit } from "react-icons/lu";
import { TbEdit } from "react-icons/tb";
import { MdSpaceDashboard } from "react-icons/md";
import { Link, useParams } from "react-router-dom";

const Sidebar = () => {
  const { classId } = useParams();

  return (
    <aside className="w-[15rem] max-h-[56rem] h-[56rem] pt-24 sidebar">
      <nav>
        <ul>
          <Link to={`/dashboard`}>
            <li className="flex items-center gap-2 text-slate-700 text-lg w-full px-4 py-4 group hover:bg-[#4040a5] hover:text-white">
              <MdSpaceDashboard className="group-hover:text-white text-[#2E2EA1]" />
              Dashboard
            </li>
          </Link>
          <Link to={`/masterlist/${classId}`}>
            <li className="flex items-center gap-2 text-slate-700 text-lg w-full px-4 py-4 group hover:bg-[#4040a5] hover:text-white">
              <SiGoogleclassroom className="group-hover:text-white text-[#2E2EA1]" />
              Masterlist
            </li>
          </Link>
          <Link to={`/gradingsheet/${classId}`}>
            <li className="flex items-center gap-2 text-slate-700 text-lg w-full px-4 py-4 group hover:bg-[#4040a5] hover:text-white">
              <TbEdit className="text-[#2E2EA1] group-hover:text-white" />
              Grading sheet
            </li>
          </Link>
          <Link to={`attendancesheet/${classId}`}>
            <li className="flex items-center gap-2 text-slate-700 text-lg w-full px-4 py-4 group hover:bg-[#4040a5] hover:text-white">
              <LuClipboardEdit className="text-[#2E2EA1] group-hover:text-white" />
              Attendance sheet
            </li>
          </Link>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
