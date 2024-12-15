import { useSelector } from "react-redux";
import { gradeCategories } from "@/lib/constants";
import GradeCell from "./GradeCell";
import Loading from "./Loading";

const GradingSheet = () => {
  const grades = useSelector((state) => state.students.students);
  const loading = useSelector((state) => state.students.loading);

  return (
    <div className="h-[54rem] max-w-[105rem] overflow-x-scroll thin-scrollbar font-montserrat">
      <header className="bg-[#2b2b8f] sticky top-0">
        <ul className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] items-center text-center text-white text-lg font-montserrat font-semibold">
          {gradeCategories.map((category) => (
            <li key={category} className="py-2 border-l">
              {category}
            </li>
          ))}
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
                {(() => {
                  const inputs = [];
                  for (let i = 1; i <= 5; i++) {
                    inputs.push(
                      <GradeCell
                        key={`quiz${i}`}
                        value={student.quizzes[`quiz${i}`]}
                      />
                    );
                  }
                  return inputs;
                })()}
              </div>
              <div className="grid grid-cols-3 text-center">
                {(() => {
                  const inputs = [];
                  for (let i = 1; i <= 3; i++) {
                    inputs.push(
                      <GradeCell
                        key={`lab${i}`}
                        value={student.labScores[`lab${i}`]}
                      />
                    );
                  }
                  return inputs;
                })()}
              </div>
              <GradeCell value={student.project} />
              <GradeCell value={student.finalExam} />
              <GradeCell value={student.finalExam} />
            </div>
          );
        })
      )}
    </div>
  );
};

export default GradingSheet;
