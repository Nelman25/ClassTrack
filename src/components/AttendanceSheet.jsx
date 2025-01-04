import { useState } from "react";
import { useSelector } from "react-redux";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateAttendanceToDB } from "../../services";
import Swal from "sweetalert2";

const AttendanceSheet = () => {
  const { id, subject, section, records, dates } = useSelector(
    (state) => state.userActivity.classData
  );
  const [datesState, setDates] = useState(dates || Array(1).fill(""));
  const [attendance, setAttendance] = useState(records || {});

  const students = useSelector((state) => state.students.students);

  console.log(datesState);
  console.log(attendance);
  const addDate = () => {
    setDates([...datesState, ""]);
  };

  const updateDate = (index, value) => {
    const newDates = [...datesState];
    newDates[index] = value;
    setDates(newDates);
  };

  const updateAttendance = (studentId, date, status) => {
    setAttendance((prev) => ({
      ...prev,
      [`${studentId}-${date}`]: status,
    }));
  };

  const getAttendance = (studentId, date) => {
    return attendance[`${studentId}-${date}`] || "";
  };

  const handleSaveChanges = async () => {
    try {
      await updateAttendanceToDB(id, datesState, attendance);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card className="w-full max-h-[50rem] overflow-y-auto thin-scrollbar">
      <CardHeader>
        <CardTitle>
          {subject} - {section}
        </CardTitle>
        <button
          onClick={handleSaveChanges}
          className="bg-[#5CB85C] py-2 px-4 my-2 text-[#FFFAEC] text-lg rounded-sm hover:bg-[#1f691f]"
        >
          Save changes
        </button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-2 border min-w-56 bg-[#34418E] text-white">
                  Student Name
                </th>
                {datesState.map((date, index) => (
                  <th
                    key={index}
                    className="p-2 border bg-[#34418E] text-white"
                  >
                    <Input
                      type="date"
                      value={date}
                      onChange={(e) => updateDate(index, e.target.value)}
                      className="w-full border-none"
                    />
                  </th>
                ))}
                <th className="p-2 border-r border-b border-r-slate-400 border-b-slate-400">
                  <Button onClick={addDate} className="w-full">
                    Add Date
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="even:bg-white odd:bg-blue-50">
                  <td className="p-2 border-r border-b border-r-slate-400 border-b-slate-400">
                    {student.name}
                  </td>
                  {datesState.map((date, index) => (
                    <td
                      key={index}
                      className="p-2 border-r border-b border-r-slate-400 border-b-slate-400"
                    >
                      <Select
                        value={getAttendance(student.studentNumber, date)}
                        onValueChange={(value) =>
                          updateAttendance(student.studentNumber, date, value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="present">Present</SelectItem>
                          <SelectItem value="absent">Absent</SelectItem>
                          <SelectItem value="late">Late</SelectItem>
                          <SelectItem value="excused">Excused</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  ))}
                  <td className="p-2 border"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendanceSheet;
