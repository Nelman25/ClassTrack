/* eslint-disable react/prop-types */
import {
  getExamPercentage,
  getGPA,
  getLabScoresPercentage,
  getProjectPercentage,
  getQuizPercentage,
} from "@/lib/helpers";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setGradesChanges } from "../../reducers/userActivitySlice";

const StudentDataRow = ({ student }) => {
  const dispatch = useDispatch();
  const { name, quizzes, labScores, project, finalExam, docId } = student;
  const [studentData, setStudentData] = useState({
    name,
    quizzes,
    labScores,
    project,
    finalExam,
    docId,
  });

  const quizPercentage = getQuizPercentage(studentData.quizzes);
  const labPercentage = getLabScoresPercentage(studentData.labScores);
  const projectPercentage = getProjectPercentage(studentData.project);
  const examPercentage = getExamPercentage(studentData.finalExam);
  const grade =
    quizPercentage + labPercentage + projectPercentage + examPercentage;
  const { gpa, gpaBg } = getGPA(grade);

  const editQuizzes = (e, field) => {
    setStudentData((prevStudentData) => {
      const updatedStudentData = {
        ...prevStudentData,
        quizzes: {
          ...prevStudentData.quizzes,
          [field]: Number(e.target.value),
        },
      };
      dispatch(setGradesChanges(updatedStudentData));
      return updatedStudentData;
    });
  };

  const editLab = (e, field) => {
    setStudentData((prevStudentData) => {
      const updatedStudentData = {
        ...prevStudentData,
        labScores: {
          ...prevStudentData.labScores,
          [field]: Number(e.target.value),
        },
      };
      dispatch(setGradesChanges(updatedStudentData));
      return updatedStudentData;
    });
  };

  const editProject = (e) => {
    setStudentData((prevStudentData) => {
      const updatedStudentData = {
        ...prevStudentData,
        project: Number(e.target.value),
      };
      dispatch(setGradesChanges(updatedStudentData));
      return updatedStudentData;
    });
  };

  const editFinalExam = (e) => {
    setStudentData((prevStudentData) => {
      const updatedStudentData = {
        ...prevStudentData,
        finalExam: Number(e.target.value),
      };
      dispatch(setGradesChanges(updatedStudentData));
      return updatedStudentData;
    });
  };

  return (
    <tr className="bg-white text-center h-12 odd:bg-white even:bg-blue-100">
      <td className="gradeCell py-1 w-[300px] text-start">{name}</td>
      <td className="gradeCell">
        <input
          className="gradeInputCell"
          type="number"
          defaultValue={quizzes.quiz1}
          onChange={(e) => editQuizzes(e, "quiz1")}
        />
      </td>
      <td className="gradeCell">
        <input
          className="gradeInputCell"
          type="number"
          defaultValue={quizzes.quiz2}
          onChange={(e) => editQuizzes(e, "quiz2")}
        />
      </td>
      <td className="gradeCell">
        <input
          className="gradeInputCell"
          type="number"
          defaultValue={quizzes.quiz3}
          onChange={(e) => editQuizzes(e, "quiz3")}
        />
      </td>
      <td className="gradeCell">
        <input
          className="gradeInputCell"
          type="number"
          defaultValue={quizzes.quiz4}
          onChange={(e) => editQuizzes(e, "quiz4")}
        />
      </td>
      <td className="gradeCell">
        <input
          className="gradeInputCell"
          type="number"
          defaultValue={quizzes.quiz5}
          onChange={(e) => editQuizzes(e, "quiz5")}
        />
      </td>
      <td className="gradeCell">
        <input
          className="gradeInputCell"
          type="number"
          defaultValue={labScores.lab1}
          onChange={(e) => editLab(e, "lab1")}
        />
      </td>
      <td className="gradeCell">
        <input
          className="gradeInputCell"
          type="number"
          defaultValue={labScores.lab2}
          onChange={(e) => editLab(e, "lab2")}
        />
      </td>
      <td className="gradeCell">
        <input
          className="gradeInputCell"
          type="number"
          defaultValue={labScores.lab3}
          onChange={(e) => editLab(e, "lab3")}
        />
      </td>
      <td className="gradeCell">
        <input
          className="gradeInputCell"
          type="number"
          defaultValue={project}
          onChange={editProject}
        />
      </td>
      <td className="gradeCell">
        <input
          className="gradeInputCell"
          type="number"
          defaultValue={finalExam}
          onChange={editFinalExam}
        />
      </td>
      <td className={`gradeCell ${gpaBg}`}>{gpa}</td>
    </tr>
  );
};

export default StudentDataRow;
