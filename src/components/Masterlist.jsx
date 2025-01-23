/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";

import AddStudentDialog from "./AddStudentDialog";
import Loading from "./Loading";
import useFetchStudents from "../hooks/useFetchStudents";
import { useParams } from "react-router-dom";
import MasterlistHeader from "./MasterlistHeader";
import MasterlistStudentRow from "./MasterlistStudentRow";

const Masterlist = () => {
  const id = localStorage.getItem("classId");
  const uid = localStorage.getItem("uid");
  const { subject, section } = useSelector(
    (state) => state.userActivity.classData
  );
  // const { uid } = useSelector((state) => state.users);
  const { classId } = useParams();
  const { students, loading } = useFetchStudents({ classId, uid });

  return (
    <div className="w-full overflow-y-auto max-h-[52rem] thin-scrollbar border border-[##e4e4e7] rounded-lg p-4 m-4 mt-0 shadow">
      <h1 className="text-xl font-medium p-4">
        {subject && section ? `${subject} - ${section}` : `No class selected.`}
      </h1>
      <div className="w-full bg-slate-50 overflow-x-auto thin-scrollbar font-montserrat relative">
        <MasterlistHeader />
        {loading ? (
          <Loading />
        ) : (
          students.map((student) => {
            return (
              <MasterlistStudentRow
                key={student.studentNumber}
                student={student}
              />
            );
          })
        )}
        <div className="min-w-[200px] bg-green-400 text-white w-full sticky bottom-0 hover:bg-green-500">
          <AddStudentDialog className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default Masterlist;
