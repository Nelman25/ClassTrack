import Loading from "./Loading";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedClass } from "../../reducers/userActivitySlice";
import { subscribeToClasses } from "../../reducers/classSlice";
import { fetchStudents } from "../../reducers/studentSlice";
import CreateClassDialog from "./CreateClassDialog";

const ClassCard = () => {
  const { classes, loading } = useSelector((state) => state.classes);
  const { uid } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = dispatch(subscribeToClasses(uid));

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [dispatch, uid]);

  const handleSelectClass = async (classId) => {
    const selectedClass = classes.find((classItem) => classItem.id === classId);
    dispatch(setSelectedClass(selectedClass));
    await dispatch(fetchStudents({ classId, uid })).unwrap();
    navigate(`/masterlist/${classId}`);
  };

  return (
    <>
      <div className="max-w-[1440px] overflow-y-auto mx-auto mt-6 flex py-2 border-b-2 border-b-slate-300 justify-between">
        <h2 className="text-4xl font-montserrat font-medium text-slate-700">
          My Classes
        </h2>
        <CreateClassDialog />
      </div>
      {loading ? (
        <Loading size={10} />
      ) : (
        <div className="max-w-[1440px] max-h-[40rem] thin-scrollbar overflow-y-auto px-8 font-montserrat mx-auto grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-10 mt-6">
          {classes.map((Class) => {
            console.log(Class);
            return (
              <div
                onClick={() => handleSelectClass(Class.id)}
                key={Class.id}
                className="rounded-xl h-[300px] p-8 border border-slate-700 flex flex-col justify-center items-center text-center odd:text-slate-100 odd:bg-[#2E2EA1] even:bg-yellow-500 hover:bg-opacity-90 transition ease-in-out delay-100"
              >
                <h2 className="font-bold text-2xl">{Class.subject}</h2>
                <p className="text-xl font-medium mt-2">{Class.section}</p>
                <p className="text-lg mt-4">
                  <strong>{Class.classSize}</strong> students
                </p>
                <p className="text-base mt-2 w-[250px]">{Class.schedule}</p>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default ClassCard;
