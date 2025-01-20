import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { addStudentToDB } from "../services";
import { addStudent } from "../reducers/studentSlice";
import { useState } from "react";

export function AddStudentDialog() {
  const [isModalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.userActivity.classData);
  const uid = useSelector((state) => state.users.uid);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const gradesTemplate = {
      quizzes: {
        quiz1: 0,
        quiz2: 0,
        quiz3: 0,
        quiz4: 0,
        quiz5: 0,
      },
      labScores: {
        lab1: 0,
        lab2: 0,
        lab3: 0,
      },
      project: 0,
      finalExam: 0,
    };

    const data = Object.fromEntries(formData.entries());
    const newStudent = { ...data, ...gradesTemplate };

    addStudentToDB(newStudent, id, uid);
    dispatch(addStudent(newStudent));
    setModalOpen(false);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-green-400 text-lg py-6 hover:bg-green-500">
          Add Student
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a student</DialogTitle>
          <DialogDescription>
            Enter necessary details of your student.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Fullname
              </Label>
              <Input id="name" name="name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Email
              </Label>
              <Input
                type="email"
                name="email"
                id="username"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Course
              </Label>
              <Input id="username" name="course" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Address
              </Label>
              <Input id="username" name="address" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Student number
              </Label>
              <Input
                id="username"
                name="studentNumber"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button className="bg-green-500 hover:bg-green-600" type="submit">
              Add Student
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddStudentDialog;
