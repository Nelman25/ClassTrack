import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStudents } from "../../reducers/studentSlice";
import Loading from "./Loading";

const AttendanceSheet = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.students.loading);
  const students = useSelector((state) => state.students.students);
  const { classId } = useParams();

  useEffect(() => {
    dispatch(fetchStudents(classId));
  }, [dispatch, classId]);

  console.log(students);

  return (
    <div className="max-h-[50rem] max-w-[105rem] overflow-y-auto overflow-x-auto thin-scrollbar">
      {loading ? (
        <Loading />
      ) : (
        <>
          <header className="grid grid-cols-[repeat(50,80px)] w-full bg-[#2b2b8f] h-[3rem]">
            <p className="text-white text-lg col-span-4 indent-3 font-medium flex items-center bg-[#2b2b8f] border-b border-b-slate-300 border-r border-r-slate-300 sticky left-0">
              Student name
            </p>
            {Array.from({ length: 46 }).map((_, index) => (
              <input
                key={index}
                type="date"
                className="border-b border-b-slate-300 border-r border-r-slate-300 p-1 text-center bg-[#343497] text-white"
              />
            ))}
          </header>
          {students.map((student, index) => {
            return (
              <div
                key={student.studentNumber}
                className="grid grid-cols-[repeat(50,80px)] indent-3"
              >
                <p
                  className={`text-sm border-b border-b-white col-span-4 py-2 border-r border-r-slate-300 sticky left-0 ${
                    index % 2 === 0 ? "bg-blue-100" : "bg-white"
                  }`}
                >
                  {student.name}
                </p>
                {Array.from({ length: 46 }).map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    className="border-b border-b-slate-300 border-r border-r-slate-300 p-1 text-center"
                  />
                ))}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default AttendanceSheet;
