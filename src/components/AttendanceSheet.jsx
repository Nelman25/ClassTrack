import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStudents } from "../../reducers/studentSlice";
import { saveAttendanceToDB } from "../../services";
import Loading from "./Loading";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { fetchAttendance } from "../../reducers/attendanceSlice";

const AttendanceSheet = () => {
  const { classId } = useParams();
  const dispatch = useDispatch();

  const students = useSelector((state) => state.students.students);
  const attendance = useSelector((state) => state.attendance.attendance);
  const dates = useSelector((state) => state.attendance.dates);
  const documentId = useSelector((state) => state.attendance.documentId);
  const loading = useSelector((state) => state.students.loading);

  const [datesState, setDates] = useState(Array(30).fill(""));
  const [attendanceState, setAttendance] = useState({});

  useEffect(() => {
    dispatch(fetchStudents(classId));
    dispatch(fetchAttendance(classId));
  }, [dispatch, classId]);

  console.log(attendance);
  console.log(dates);
  console.log(documentId);

  const getAttendance = async () => {
    const response = await getDocs(
      collection(db, `Classes/${classId}/Attendance`)
    );
    const data = response.docs.map((doc) => {
      const attendance = doc.data();
      const docId = doc.id;
      return { ...attendance, docId };
    });

    console.log(data[0].datesState);
    console.log(data[0].attendanceState);
    console.log(data[0].docId);
  };

  const handleDateChange = (columnIndex, value) => {
    const updatedDates = [...datesState];
    updatedDates[columnIndex] = value;
    setDates(updatedDates);
  };

  const handleAttendanceChange = (studentId, columnIndex, value) => {
    const dataKey = datesState[columnIndex] || `Column-${columnIndex}`;
    setAttendance((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [dataKey]: value,
      },
    }));
  };

  const handleSave = () => {
    const attendanceData = { datesState, attendanceState };
    saveAttendanceToDB(attendanceData, classId);
  };

  if (classId === "undefined") {
    return (
      <div className="h-screen w-full content-center text-center text-5xl font-thin tracking-widest">
        No class selected.
      </div>
    );
  }

  return (
    <div className="max-h-[50rem] max-w-[105rem] overflow-y-auto overflow-x-auto thin-scrollbar">
      <>
        <header className="grid grid-cols-[repeat(33,120px)] w-full bg-[#2b2b8f] h-[3rem]">
          <p className="text-white text-lg col-span-2 indent-3 font-medium flex items-center bg-[#2b2b8f] border-b border-b-slate-300 border-r border-r-slate-300 sticky left-0">
            Student name
          </p>
          {Array.from({ length: 30 }).map((_, index) => (
            <input
              key={index}
              type="date"
              value={datesState[index]}
              onChange={(e) => handleDateChange(index, e.target.value)}
              className="border-b border-b-slate-300 border-r border-r-slate-300 p-1 text-center bg-[#343497] text-white"
            />
          ))}
        </header>
        {loading ? (
          <Loading />
        ) : (
          students.map((student, index) => {
            return (
              <div
                key={student.studentNumber}
                className="grid grid-cols-[repeat(33,120px)] indent-3"
              >
                <p
                  className={`text-sm border-b border-b-slate-300 col-span-2 py-2 border-r border-r-slate-300 sticky left-0 font-montserrat ${
                    index % 2 === 0 ? "bg-blue-100" : "bg-white"
                  }`}
                >
                  {student.name}
                </p>
                {Array.from({ length: 30 }).map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    value={
                      (attendanceState[student.studentNumber] &&
                        attendanceState[student.studentNumber][
                          datesState[index]
                        ]) ||
                      ""
                    }
                    onChange={(e) =>
                      handleAttendanceChange(
                        student.studentNumber,
                        index,
                        e.target.value
                      )
                    }
                    className="border-b border-b-slate-300 border-r border-r-slate-300 p-1 text-center"
                  />
                ))}
              </div>
            );
          })
        )}
      </>
      <button
        className="bg-green-300 px-4 py-2 rounded-sm "
        onClick={getAttendance}
      >
        Save
      </button>
    </div>
  );
};

export default AttendanceSheet;
