import Loading from "./Loading";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedClass } from "../../reducers/userActivitySlice";
import { subscribeToClasses } from "../../reducers/classSlice";
import CreateClassDialog from "./CreateClassDialog";

const ClassCard = () => {
  const { classes, loading } = useSelector((state) => state.classes);
  const dispatch = useDispatch();
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
    dispatch(setSelectedClass(classId));
    navigate(`/masterlist/${classId}`);
  };

  return (
    <div>
      <div className="max-w-[1440px] mx-auto mt-6 flex py-2 border-b-2 border-b-slate-300 justify-between">
        <h2 className="text-4xl font-montserrat font-medium text-slate-700">
          My Classes
        </h2>
        <CreateClassDialog />
      </div>
      {loading ? (
        <Loading size={10} />
      ) : (
        <div className="max-w-[1440px] font-montserrat mx-auto grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-10 mt-6">
          {classes.map((Class) => {
            return (
              <div
                onClick={() => handleSelectClass(Class.id)}
                key={Class.id}
                className="rounded-xl h-[300px] p-8 border border-slate-700 flex flex-col justify-center items-center text-center odd:text-slate-200 odd:bg-[#2E2EA1] even:bg-yellow-500"
              >
                <h2 className="font-semibold text-3xl">{Class.subject}</h2>
                <p className="text-2xl font-medium">{Class.section}</p>
                <p className="text-xl">{Class.classSize} members</p>
                <p className="text-xl">{Class.schedule}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ClassCard;
