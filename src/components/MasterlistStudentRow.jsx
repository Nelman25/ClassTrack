/* eslint-disable react/prop-types */
const CELL_CLASSES = "py-2 min-w-[150px] truncate";

const MasterlistStudentRow = ({ student }) => {
  const { studentNumber, name, email, course, address } = student;
  return (
    <ul
      key={studentNumber}
      className="grid grid-cols-[2fr_3fr_1fr_1fr_4fr] text-sm items-center gap-6 py-2 px-4 border-b border-b-slate-400 even:bg-blue-100 odd:bg-white"
    >
      <li className={`${CELL_CLASSES}`}>{name}</li>

      <li className={`${CELL_CLASSES} text-blue-600`}>{email}</li>
      <li className={`${CELL_CLASSES}`}>{studentNumber}</li>
      <li className={`${CELL_CLASSES}`}>{course}</li>
      <li className={`${CELL_CLASSES}`}>{address}</li>
    </ul>
  );
};

export default MasterlistStudentRow;
