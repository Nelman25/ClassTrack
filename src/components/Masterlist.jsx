import { useSelector } from "react-redux";
import { studentFields } from "@/lib/constants";
import AddStudentDialog from "./AddStudentDialog";
import Loading from "./Loading";

const Masterlist = () => {
  const students = useSelector((state) => state.students.students);
  const loading = useSelector((state) => state.students.loading);


  return (
    <div className="w-full bg-slate-50 min-h-[55rem] overflow-x-auto thin-scrollbar font-montserrat relative">
      <header className="w-full bg-[#2b2b8f] sticky top-0">
        <ul className="grid grid-cols-[2fr_3fr_1fr_1fr_4fr] gap-6 py-2 items-center px-4 text-white text-base font-montserrat font-semibold">
          {studentFields.map((field) => (
            <li key={field} className="min-w-[150px] py-2">
              {field}
            </li>
          ))}
        </ul>
      </header>
      {loading ? (
        <Loading />
      ) : (
        students.map((student) => {
          return (
            <ul
              key={Math.random()}
              className="grid grid-cols-[2fr_3fr_1fr_1fr_4fr] text-sm items-center gap-6 py-2 px-4 border-b border-b-slate-400 even:bg-blue-100 odd:bg-white"
            >
              <li className="py-2 min-w-[150px] truncate">{student.name}</li>

              <li className="py-2 min-w-[150px] truncate text-blue-600">
                {student.email}
              </li>
              <li className="py-2 min-w-[150px] truncate">
                {student.studentNumber}
              </li>
              <li className="py-2 min-w-[150px] truncate">{student.course}</li>
              <li className="py-2 min-w-[150px] truncate">{student.address}</li>
            </ul>
          );
        })
      )}
      <div className="min-w-[200px] bg-green-400 text-white w-full absolute bottom-0 hover:bg-green-500">
        <AddStudentDialog className="w-full" />
      </div>
    </div>
  );
};

export default Masterlist;
