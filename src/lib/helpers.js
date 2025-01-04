export const getGPA = (grade) => {
  let gpa, gpaBg;

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

  return { gpa, gpaBg };
};

export const getQuizPercentage = (quizzes) => {
  return (
    (Object.values(quizzes).reduce((acc, cur) => acc + cur, 0) / 50) *
    0.25 *
    100
  );
};

export const getLabScoresPercentage = (labScores) => {
  return (
    (Object.values(labScores).reduce((acc, cur) => acc + cur, 0) / 300) *
    0.25 *
    100
  );
};

export const getProjectPercentage = (project) => {
  return (project / 100) * 0.3 * 100;
};

export const getExamPercentage = (exam) => {
  return (exam / 100) * 0.2 * 100;
};
