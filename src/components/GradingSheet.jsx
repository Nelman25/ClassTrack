import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGrades } from "../../reducers/gradeSlice";

const GradingSheet = () => {
  const grades = useSelector((state) => state.grade.grades);
  const loading = useSelector((state) => state.grade.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGrades());
  }, [dispatch]);

  console.log(grades);

  return (
    <div className="w-full bg-slate-100 max-h-[50rem] overflow-x-scroll max-w-[90rem] thin-scrollbar font-montserrat border border-slate-400 rounded-md">
      <header className="bg-blue-700 sticky top-0">
        <ul className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] items-center text-center text-white text-xl font-montserrat font-semibold">
          <li className="py-2">Student name</li>
          <li className="py-2">Quizzes</li>
          <li className="py-2">Lab Activity</li>
          <li className="py-2">Project</li>
          <li className="py-2">Final exam</li>
          <li className="py-2">Final Grade</li>
        </ul>
      </header>
      {loading ? (
        <p>Loading</p>
      ) : (
        grades.map((student) => {
          return (
            <div
              key={student.id}
              className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] odd:bg-blue-100 even:bg-white"
            >
              <p className="px-2 py-4 text-sm font-medium">{student.name}</p>
              <div className="grid grid-cols-5 text-center">
                <input
                  className="py-2 text-center bg-inherit border-l border-b border-b-black border-l-black"
                  type="number"
                  defaultValue={student.quizzes.quiz1}
                />
                <input
                  className="py-2 text-center bg-inherit border-l border-b border-b-black border-l-black"
                  type="number"
                  defaultValue={student.quizzes.quiz2}
                />
                <input
                  className="py-2 text-center bg-inherit border-l border-b border-b-black border-l-black"
                  type="number"
                  defaultValue={student.quizzes.quiz3}
                />
                <input
                  className="py-2 text-center bg-inherit border-l border-b border-b-black border-l-black"
                  type="number"
                  defaultValue={student.quizzes.quiz4}
                />
                <input
                  className="py-2 text-center bg-inherit border-l border-b border-b-black border-l-black"
                  type="number"
                  defaultValue={student.quizzes.quiz5}
                />
              </div>
              <div className="grid grid-cols-3 text-center">
                <input
                  className="py-2 text-center bg-inherit border-l border-b border-b-black border-l-black"
                  type="number"
                  defaultValue={student.labScores.lab1}
                />
                <input
                  className="py-2 text-center bg-inherit border-l border-b border-b-black border-l-black"
                  type="number"
                  defaultValue={student.labScores.lab2}
                />
                <input
                  className="py-2 text-center bg-inherit border-l border-b border-b-black border-l-black"
                  type="number"
                  defaultValue={student.labScores.lab3}
                />
              </div>
              <input
                className="py-2 text-center bg-inherit border-l border-b border-b-black border-l-black"
                type="number"
                defaultValue={student.project}
              />
              <input
                className="py-2 text-center bg-inherit border-l border-b border-b-black border-l-black"
                type="number"
                defaultValue={student.finalExam}
              />
              <input
                className="py-2 text-center bg-inherit border-l border-b border-b-black border-l-black"
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
