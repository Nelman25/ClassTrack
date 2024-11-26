import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGrades } from "../../reducers/gradeSlice";
import Loading from "./Loading";

const GradingSheet = () => {
  const grades = useSelector((state) => state.grade.grades);
  const loading = useSelector((state) => state.grade.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGrades());
  }, [dispatch]);

  console.log(grades);

  return (
    <div className="w-full mt-12 bg-slate-100 max-h-[47rem] overflow-x-scroll max-w-[90rem] thin-scrollbar font-montserrat border border-slate-400 rounded-md">
      <header className="bg-[#2b2b8f] sticky top-0">
        <ul className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] items-center text-center text-white text-xl font-montserrat font-semibold">
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
              key={student.id}
              className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] even:bg-blue-200 odd:bg-white"
            >
              <p className="px-2 py-4 text-sm font-medium">{student.name}</p>
              <div className="grid grid-cols-5 text-center">
                <input
                  className="py-4 text-center bg-inherit border-l border-b border-b-black border-l-black"
                  type="number"
                  defaultValue={student.quizzes.quiz1}
                />
                <input
                  className="py-4 text-center bg-inherit border-l border-b border-b-black border-l-black"
                  type="number"
                  defaultValue={student.quizzes.quiz2}
                />
                <input
                  className="py-4 text-center bg-inherit border-l border-b border-b-black border-l-black"
                  type="number"
                  defaultValue={student.quizzes.quiz3}
                />
                <input
                  className="py-4 text-center bg-inherit border-l border-b border-b-black border-l-black"
                  type="number"
                  defaultValue={student.quizzes.quiz4}
                />
                <input
                  className="py-4 text-center bg-inherit border-l border-b border-b-black border-l-black"
                  type="number"
                  defaultValue={student.quizzes.quiz5}
                />
              </div>
              <div className="grid grid-cols-3 text-center">
                <input
                  className="py-4 text-center bg-inherit border-l border-b border-b-black border-l-black"
                  type="number"
                  defaultValue={student.labScores.lab1}
                />
                <input
                  className="py-4 text-center bg-inherit border-l border-b border-b-black border-l-black"
                  type="number"
                  defaultValue={student.labScores.lab2}
                />
                <input
                  className="py-4 text-center bg-inherit border-l border-b border-b-black border-l-black"
                  type="number"
                  defaultValue={student.labScores.lab3}
                />
              </div>
              <input
                className="py-4 text-center bg-inherit border-l border-b border-b-black border-l-black"
                type="number"
                defaultValue={student.project}
              />
              <input
                className="py-4 text-center bg-inherit border-l border-b border-b-black border-l-black"
                type="number"
                defaultValue={student.finalExam}
              />
              <input
                className="py-4 text-center bg-inherit border-l border-b border-b-black border-l-black"
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
