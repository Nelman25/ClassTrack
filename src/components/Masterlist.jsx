/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";

import { studentFields } from "@/lib/constants";
import AddStudentDialog from "./AddStudentDialog";
import Loading from "./Loading";
import useFetchStudents from "../hooks/useFetchStudents";

const CELL_CLASSES = "py-2 min-w-[150px] truncate";
const TABLE_GRID = "grid grid-cols-[2fr_3fr_1fr_1fr_4fr]";

const StudentHeader = () => {
  return (
    <header className="w-full bg-[#34418E] sticky top-0">
      <ul
        className={`${TABLE_GRID} gap-6 py-2 items-center px-4 text-white text-base font-montserrat font-semibold`}
      >
        {studentFields.map((field) => (
          <li key={field} className="min-w-[150px] py-2">
            {field}
          </li>
        ))}
      </ul>
    </header>
  );
};

const StudentRow = ({ student }) => {
  const { studentNumber, name, email, course, address } = student;
  return (
    <ul
      key={studentNumber}
      className="grid grid-cols-[2fr_3fr_1fr_1fr_4fr] text-sm items-center gap-6 py-2 px-4 border-b border-b-slate-400 even:bg-blue-100 odd:bg-white"
    >
      <li className={`${CELL_CLASSES}`}>{name}</li>

      <li className={`${CELL_CLASSES} text-blue-600`}>{email}</li>
      <li className={`${CELL_CLASSES}`}>{studentNumber}</li>
      <li className={`${CELL_CLASSES}`}>{course}</li>
      <li className={`${CELL_CLASSES}`}>{address}</li>
    </ul>
  );
};

const Masterlist = () => {
  const { subject, section, id } = useSelector(
    (state) => state.userActivity.classData
  );
  const { uid } = useSelector((state) => state.users);
  console.log("id: ", id);
  console.log("uid: ", uid);
  const { students, loading } = useFetchStudents({ id, uid });

  return (
    <div className="w-full overflow-y-auto max-h-[52rem] thin-scrollbar border border-[##e4e4e7] rounded-lg p-4 m-4 mt-0 shadow">
      <h1 className="text-xl font-medium p-4">
        {subject && section ? `${subject} - ${section}` : `No class selected.`}
      </h1>
      <div className="w-full bg-slate-50 overflow-x-auto thin-scrollbar font-montserrat relative">
        <StudentHeader />
        {loading ? (
          <Loading />
        ) : (
          students.map((student) => {
            return <StudentRow key={student.studentNumber} student={student} />;
          })
        )}
        <div className="min-w-[200px] bg-green-400 text-white w-full sticky bottom-0 hover:bg-green-500">
          <AddStudentDialog className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default Masterlist;
