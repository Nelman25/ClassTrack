import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStudentInfo } from "../../reducers/studentInfoSlice";

const Masterlist = () => {
  const info = useSelector((state) => state.info.studentInfo);
  const loading = useSelector((state) => state.info.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStudentInfo());
  }, [dispatch]);

  return (
    <div className="w-full bg-slate-100 max-h-[50rem] overflow-x-scroll max-w-[90rem] thin-scrollbar font-montserrat">
      <header className="bg-blue-700 sticky top-0">
        <ul className="grid grid-cols-[2fr_3fr_1fr_1fr_4fr] gap-6 items-center text-white text-xl font-montserrat">
          <li className="py-2 indent-5">Student name</li>
          <li className="py-2 indent-5">Student email</li>
          <li className="py-2 pl-5">Student number</li>
          <li className="py-2 indent-5">Course</li>
          <li className="py-2 indent-5">Address</li>
        </ul>
      </header>
      {loading ? (
        <p>loading</p>
      ) : (
        info.map((student) => {
          return (
            <ul
              key={student.id}
              className="grid grid-cols-[2fr_3fr_1fr_1fr_4fr] items-center gap-6 border-b border-b-slate-400 even:bg-blue-200 odd:bg-white"
            >
              <li className="py-2 indent-5">{student.name}</li>
              <li className="py-2 indent-5 text-blue-700 underline">
                {student.email}
              </li>
              <li className="py-2 indent-5">{student.studentNumber}</li>
              <li className="py-2 indent-5">{student.course}</li>
              <li className="py-2 indent-5">{student.address}</li>
            </ul>
          );
        })
      )}
    </div>
  );
};

export default Masterlist;
