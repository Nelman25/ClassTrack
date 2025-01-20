/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import StudentDataRow from "./StudentDataRow";
import { updateGradesToDB } from "../services";
import Swal from "sweetalert2";

const GradingSheet = () => {
  const grades = useSelector((state) => state.students.students);
  const changes = useSelector((state) => state.userActivity.gradesChanges);
  const { subject, section, id } = useSelector(
    (state) => state.userActivity.classData
  );
  const { uid } = useSelector((state) => state.users);

  const handleSaveChanges = async () => {
    try {
      await updateGradesToDB(changes, id, uid);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full overflow-y-auto max-h-[52rem] thin-scrollbar border border-[##e4e4e7] rounded-lg p-4 m-4 mt-0 shadow">
      <div className="flex justify-between items-center px-4 min-w-full">
        <h1 className="text-xl font-medium max-xl:text-base">
          {subject && section
            ? `${subject} - ${section}`
            : `No class selected.`}
        </h1>
        <button
          onClick={handleSaveChanges}
          className="bg-[#5CB85C] py-2 px-4 my-2 text-[#FFFAEC] text-lg rounded-sm hover:bg-[#1f691f] max-xl:text-sm"
        >
          Save changes
        </button>
      </div>
      <table className="w-full bg-slate-100 min-w-[1000px] max-w-[1600px] max-h-[10rem] overflow-x-auto">
        <thead>
          <tr className="bg-[#34418E] text-white">
            <th className="font-semibold py-2" colSpan={1}>
              Student name
            </th>
            <th className="font-semibold" colSpan={5}>
              Quizzes
            </th>
            <th className="font-semibold" colSpan={3}>
              Lab Activities
            </th>
            <th className="font-semibold" colSpan={1}>
              Project
            </th>
            <th className="font-semibold" colSpan={1}>
              Final Exam
            </th>
            <th className="font-semibold" colSpan={1}>
              Final Grade
            </th>
          </tr>
          <tr className="bg-[#3347b6] text-white">
            <th className="gradeCell py-1">Full name</th>
            <th className="gradeCell">Quiz 1</th>
            <th className="gradeCell">Quiz 2</th>
            <th className="gradeCell">Quiz 3</th>
            <th className="gradeCell">Quiz 4</th>
            <th className="gradeCell">Quiz 5</th>
            <th className="gradeCell">Lab 1</th>
            <th className="gradeCell">Lab 2</th>
            <th className="gradeCell">Lab 3</th>
            <th className="gradeCell">Project Score</th>
            <th className="gradeCell">Exam Score</th>
            <th className="gradeCell">Grade</th>
          </tr>
          <tr className="bg-blue-200 text-white">
            <th className="gradeCell py-1"></th>
            {Array(5)
              .fill("")
              .map((_, index) => {
                return (
                  <th
                    key={index}
                    className="gradeCell bg-green-100 text-slate-600 font-medium"
                  >
                    (10)
                  </th>
                );
              })}
            {Array(5)
              .fill("")
              .map((_, index) => {
                return (
                  <th
                    key={index}
                    className="gradeCell bg-orange-100 text-slate-600 font-medium"
                  >
                    (100)
                  </th>
                );
              })}

            <th className="gradeCell">(4.0)</th>
          </tr>
        </thead>

        <tbody className="">
          {grades.map((student) => {
            return (
              <StudentDataRow key={student.studentNumber} student={student} />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default GradingSheet;
