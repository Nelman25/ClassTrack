import { useSelector } from "react-redux";
import { gradeCategories } from "@/lib/constants";
import GradeCell from "./GradeCell";
import Loading from "./Loading";

const GradingSheet = () => {
  const grades = useSelector((state) => state.students.students);
  const loading = useSelector((state) => state.students.loading);

  return (
    <div className="h-[54rem] overflow-x-auto thin-scrollbar font-montserrat">
      <header className="bg-[#2b2b8f] sticky top-0 w-full">
        <ul className="grid grid-cols-[240px_480px_240px_240px_240px_240px] max-xl:grid-cols-[180px_360px_180px_180px_180px_180px] w-full items-center text-center text-white text-lg font-montserrat font-semibold">
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
              className="grid grid-cols-[240px_480px_240px_240px_240px_240px] max-xl:grid-cols-[180px_360px_180px_180px_180px_180px] even:bg-blue-100 odd:bg-white"
            >
              <p className="px-2 py-4 text-sm border-b border-b-slate-300 max-w-[240px] max-xl:max-w-[180px]">
                {student.name}
              </p>
              <div className="grid grid-cols-5 text-center min-w-[480px] max-xl:min-w-[360px]">
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
              <div className="grid grid-cols-3 text-center min-w-[240px] max-xl:min-w-[180px]">
                {(() => {
                  const inputs = [];
                  for (let i = 1; i <= 3; i++) {
                    inputs.push(
                      <GradeCell
                        key={`lab${i}`}
                        value={student.labScores[`lab${i}`]}
                        className=""
                      />
                    );
                  }
                  return inputs;
                })()}
              </div>
              <GradeCell value={student.project} className="" />
              <GradeCell value={student.finalExam} className="" />
              <GradeCell value={student.finalExam} className="" />
            </div>
          );
        })
      )}
    </div>
  );
};

export default GradingSheet;
