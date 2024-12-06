import { useState } from "react";
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
import { createClass } from "../../services";

export function CreateClassDialog() {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const newClass = Object.fromEntries(formData.entries());
    createClass(newClass);

    setModalOpen(false);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button className="text-2xl px-4 py-6 bg-green-200 text-black hover:bg-green-300">
          Create class
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new class</DialogTitle>
          <DialogDescription>
            Enter necessary details of your new class.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subject" className="text-right">
                Subject
              </Label>
              <Input
                required
                placeholder="Information Management"
                id="subject"
                name="subject"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="section" className="text-right">
                Section
              </Label>
              <Input
                required
                placeholder="COM231"
                name="section"
                id="section"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subjectcode" className="text-right">
                Subject code
              </Label>
              <Input
                required
                placeholder="CTINFMGL"
                id="subjectcode"
                name="subjectcode"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="schedule" className="text-right">
                Schedule
              </Label>
              <Input
                required
                placeholder="MWF 3:00pm - 5:00pm"
                id="schedule"
                name="schedule"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button className="bg-green-500 hover:bg-green-600" type="submit">
              Create class
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateClassDialog;
