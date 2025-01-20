import Loading from "./Loading";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedClass } from "../reducers/userActivitySlice";
import { fetchStudents } from "../reducers/studentSlice";
import CreateClassDialog from "./CreateClassDialog";
import ClassCard from "./ClassCard";
import useClassManagement from "@/hooks/useClassManagement";

const ClassList = () => {
  const { uid } = useSelector((state) => state.users);
  const { classes, loading } = useClassManagement(uid);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          {classes.map((classItem) => (
            <ClassCard
              key={classItem.id}
              classItem={classItem}
              onSelect={handleSelectClass}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default ClassList;
