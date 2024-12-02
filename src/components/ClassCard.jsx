import Loading from "./Loading";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../../reducers/studentSlice";
import { useNavigate } from "react-router-dom";
import { setSelectedClass } from "../../reducers/userActivitySlice";
import { subscribeToClasses } from "../../reducers/classSlice";

const ClassCard = () => {
  const dispatch = useDispatch();
  const { classes, loading } = useSelector((state) => state.classes);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = dispatch(subscribeToClasses());

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [dispatch]);

  
  const handleSelectClass = (classId) => {
    dispatch(fetchStudents(classId));
    dispatch(setSelectedClass(classId));
    navigate("/masterlist");
  };

  return (
    <div>
      {loading ? (
        <Loading size={10} />
      ) : (
        <div className="max-w-[1440px] font-montserrat mx-auto grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-10 mt-12">
          {classes.map((Class) => {
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
          })}
        </div>
      )}
    </div>
  );
};

export default ClassCard;
