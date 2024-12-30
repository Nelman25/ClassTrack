/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import StudentDataRow from "./StudentDataRow";

const GradingSheet = () => {
  const grades = useSelector((state) => state.students.students);

  return (
    <table
      className="w-full bg-slate-100 max-h-[10rem] overflow-x-auto thin-scrollbar"
      border={1}
    >
      <thead className="bg-blue-600">
        <tr className="bg-[#2b2b8f] text-white">
          <th className="border border-white py-2" colSpan={1}>
            Student name
          </th>
          <th className="border border-white" colSpan={5}>
            Quizzes
          </th>
          <th className="border border-white" colSpan={3}>
            Lab Activities
          </th>
          <th className="border border-white" colSpan={1}>
            Project
          </th>
          <th className="border border-white" colSpan={1}>
            Final Exam
          </th>
          <th className="border border-white" colSpan={1}>
            Final Grade
          </th>
        </tr>
        <tr className="bg-blue-400 text-white">
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
      </thead>

      <tbody className="">
        {grades.map((student) => {
          return (
            <StudentDataRow key={student.studentNumber} student={student} />
          );
        })}
      </tbody>
    </table>
  );
};

export default GradingSheet;
