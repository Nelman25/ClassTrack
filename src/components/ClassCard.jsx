import Loading from "./Loading";
import { useEffect } from "react";
import { fetchClasses } from "../../reducers/classSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../../reducers/studentSlice";

const ClassCard = () => {
  const classes = useSelector((state) => state.classes.classes);
  const students = useSelector((state) => state.students.students);
  const loading = useSelector((state) => state.classes.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchClasses());
  }, [dispatch]);

  const handleSelectClass = (classId) => {
    dispatch(fetchStudents(classId));
  };

  console.log(students);

  return (
    <div>
      {loading ? (
        <Loading size={10} />
      ) : (
        classes.map((Class) => {
          return (
            <div
              onClick={() => handleSelectClass(Class.id)}
              key={Class.id}
              className="rounded-xl h-[400px] border border-slate-700 flex flex-col justify-center items-center text-center odd:text-slate-200 odd:bg-[#2E2EA1] even:bg-yellow-500"
            >
              <h2 className="font-semibold text-4xl">{Class.subject}</h2>
              <p className="text-3xl font-medium">{Class.section}</p>
              <p className="text-2xl">{Class.classSize} members</p>
              <p className="text-2xl">{Class.schedule}</p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ClassCard;
