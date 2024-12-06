import { useDispatch, useSelector } from "react-redux";
import AddStudentDialog from "./AddStudentDialog";
import Loading from "./Loading";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchStudents } from "../../reducers/studentSlice";

const Masterlist = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.students);
  const loading = useSelector((state) => state.students.loading);
  const selectedClass = useSelector(
    (state) => state.userActivity.selectedClassId
  );
  const { classId } = useParams();

  useEffect(() => {
    dispatch(fetchStudents(classId));
  }, [dispatch, classId]);

  console.log(students);
  console.log(selectedClass);

  return (
    <div className="flex-1 bg-slate-50 max-h-[80rem] overflow-x-scroll thin-scrollbar font-montserrat relative">
      <header className="bg-[#2b2b8f] sticky top-0">
        <ul className="grid grid-cols-[2fr_3fr_1fr_1fr_4fr] gap-6 py-2 items-center px-4 text-white text-base font-montserrat font-semibold">
          <li className="py-2">Student name</li>
          <li className="py-2">Student email</li>
          <li className="py-2">Student number</li>
          <li className="py-2">Course</li>
          <li className="py-2">Address</li>
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
              <li className="py-2 truncate">{student.name}</li>
              <li className="py-2 truncate text-blue-600">{student.email}</li>
              <li className="py-2 truncate">{student.studentNumber}</li>
              <li className="py-2 truncate">{student.course}</li>
              <li className="py-2 truncate">{student.address}</li>
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
