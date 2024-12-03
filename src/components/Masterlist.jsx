import { useSelector } from "react-redux";
import AddStudentDialog from "./AddStudentDialog";
import Loading from "./Loading";

const Masterlist = () => {
  const students = useSelector((state) => state.students.students);
  const loading = useSelector((state) => state.students.loading);
  const selectedClass = useSelector(
    (state) => state.userActivity.selectedClassId
  );

  console.log(students);
  console.log(selectedClass);

  return (
    <div className="bg-slate-50 mt-12 max-h-[50rem] overflow-x-scroll max-w-[90rem] thin-scrollbar font-montserrat relative border border-slate-400 rounded-md">
      <header className="bg-[#2b2b8f] sticky top-0">
        <ul className="grid grid-cols-[2fr_3fr_1fr_1fr_4fr] gap-6 items-center text-white text-xl font-montserrat font-semibold">
          <li className="py-2 indent-5">Student name</li>
          <li className="py-2 indent-5">Student email</li>
          <li className="py-2 pl-5">Student number</li>
          <li className="py-2 indent-5">Course</li>
          <li className="py-2 indent-5">Address</li>
        </ul>
      </header>
      {loading ? (
        <Loading />
      ) : (
        students.map((student) => {
          return (
            <ul
              key={Math.random()}
              className="grid grid-cols-[2fr_3fr_1fr_1fr_4fr] items-center gap-6 py-3 border-b border-b-slate-400 even:bg-blue-200 odd:bg-white"
            >
              <li className="py-2 pl-5">{student.name}</li>
              <li className="py-2 pl-5 text-blue-700 underline">
                {student.email}
              </li>
              <li className="py-2 pl-5">{student.studentNumber}</li>
              <li className="py-2 pl-5">{student.course}</li>
              <li className="py-2 pl-5">{student.address}</li>
            </ul>
          );
        })
      )}
      <div className="bg-green-400 text-white w-full absolute bottom-0 hover:bg-green-500">
        <AddStudentDialog className="w-full" />
      </div>
    </div>
  );
};

export default Masterlist;
