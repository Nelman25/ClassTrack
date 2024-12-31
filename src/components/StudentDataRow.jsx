/* eslint-disable react/prop-types */
import { useState } from "react";

const StudentDataRow = ({ student }) => {
  const { name, quizzes, labScores, project, finalExam } = student;

  const [studentData, setStudentData] = useState({
    name,
    quizzes,
    labScores,
    project,
    finalExam,
  });

  const quizPercentage =
    (Object.values(studentData.quizzes).reduce((acc, cur) => acc + cur, 0) /
      50) *
    0.25 *
    100;

  const labPercentage =
    (Object.values(studentData.labScores).reduce((acc, cur) => acc + cur, 0) /
      300) *
    0.25 *
    100;

  const projectPercentage = (studentData.project / 100) * 0.3 * 100;
  const examPercentage = (studentData.finalExam / 100) * 0.2 * 100;

  const grade =
    quizPercentage + labPercentage + projectPercentage + examPercentage;
  let gpa;
  let gpaBg;

  console.log(`quizzes: ${quizPercentage}`);
  console.log(`lab: ${labPercentage}`);
  console.log(`project: ${projectPercentage}`);
  console.log(`exam: ${examPercentage}`);

  if (grade >= 96) {
    gpa = 4.0;
    gpaBg = "bg-green-300";
  } else if (grade >= 90) {
    gpa = 3.5;
    gpaBg = "bg-green-200";
  } else if (grade >= 84) {
    gpa = 3.0;
    gpaBg = "bg-green-100";
  } else if (grade >= 78) {
    gpa = 2.5;
    gpaBg = "bg-orange-100";
  } else if (grade >= 72) {
    gpa = 2.0;
    gpaBg = "bg-orange-200";
  } else if (grade >= 66) {
    gpa = 1.5;
    gpaBg = "bg-orange-300";
  } else if (grade >= 60) {
    gpa = 1.0;
    gpaBg = "bg-red-200";
  } else if (grade < 60) {
    gpa = "R";
    gpaBg = "bg-red-300";
  }

  console.log(gpa);

  const editQuizzes = (e, field) => {
    setStudentData((prevStudentData) => ({
      ...prevStudentData,
      quizzes: {
        ...prevStudentData.quizzes,
        [field]: Number(e.target.value),
      },
    }));
  };

  const editLab = (e, field) => {
    setStudentData((prevStudentData) => ({
      ...prevStudentData,
      labScores: {
        ...prevStudentData.labScores,
        [field]: Number(e.target.value),
      },
    }));
  };

  const editProject = (e) => {
    setStudentData((prevStudentData) => ({
      ...prevStudentData,
      project: Number(e.target.value),
    }));
  };

  const editFinalExam = (e) => {
    setStudentData((prevStudentData) => ({
      ...prevStudentData,
      finalExam: Number(e.target.value),
    }));
  };

  return (
    <tr className="bg-white text-center h-12 odd:bg-white even:bg-blue-100">
      <td className="gradeCell py-1 px-12">{name}</td>
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
