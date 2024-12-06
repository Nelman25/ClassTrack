import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchStudents } from "../../reducers/studentSlice";
import Loading from "./Loading";

const GradingSheet = () => {
  const dispatch = useDispatch();
  const grades = useSelector((state) => state.students.students);
  const loading = useSelector((state) => state.students.loading);
  const { classId } = useParams();

  useEffect(() => {
    dispatch(fetchStudents(classId));
  }, [dispatch, classId]);

  return (
    <div className="w-full h-[54rem] mx-4 overflow-x-scroll thin-scrollbar font-montserrat">
      <header className="bg-[#2b2b8f] sticky top-0">
        <ul className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] items-center text-center text-white text-lg font-montserrat font-semibold">
          <li className="py-2 border-l">Student name</li>
          <li className="py-2 border-l">Quizzes</li>
          <li className="py-2 border-l">Lab Activity</li>
          <li className="py-2 border-l">Project</li>
          <li className="py-2 border-l">Final exam</li>
          <li className="py-2 border-l">Final Grade</li>
        </ul>
      </header>
      {loading ? (
        <Loading />
      ) : (
        grades.map((student) => {
          return (
            <div
              key={student.studentNumber}
              className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] even:bg-blue-100 odd:bg-white"
            >
              <p className="px-2 py-4 text-sm font-medium border-b border-b-black">
                {student.name}
              </p>
              <div className="grid grid-cols-5 text-center">
                <input
                  className="gradingSheetCell"
                  type="number"
                  defaultValue={student.quizzes.quiz1}
                />
                <input
                  className="gradingSheetCell"
                  type="number"
                  defaultValue={student.quizzes.quiz2}
                />
                <input
                  className="gradingSheetCell"
                  type="number"
                  defaultValue={student.quizzes.quiz3}
                />
                <input
                  className="gradingSheetCell"
                  type="number"
                  defaultValue={student.quizzes.quiz4}
                />
                <input
                  className="gradingSheetCell"
                  type="number"
                  defaultValue={student.quizzes.quiz5}
                />
              </div>
              <div className="grid grid-cols-3 text-center">
                <input
                  className="gradingSheetCell"
                  type="number"
                  defaultValue={student.labScores.lab1}
                />
                <input
                  className="gradingSheetCell"
                  type="number"
                  defaultValue={student.labScores.lab2}
                />
                <input
                  className="gradingSheetCell"
                  type="number"
                  defaultValue={student.labScores.lab3}
                />
              </div>
              <input
                className="gradingSheetCell"
                type="number"
                defaultValue={student.project}
              />
              <input
                className="gradingSheetCell"
                type="number"
                defaultValue={student.finalExam}
              />
              <input
                className="gradingSheetCell"
                type="number"
                defaultValue={student.finalExam}
              />
            </div>
          );
        })
      )}
    </div>
  );
};

export default GradingSheet;
