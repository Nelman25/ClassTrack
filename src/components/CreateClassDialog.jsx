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
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const newClass = Object.fromEntries(formData.entries());
    createClass(newClass);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-full flex justify-end max-w-[1440px] mx-auto mt-8">
          <Button className="text-2xl px-4 py-6 bg-green-200 text-slate-700 hover:bg-green-300">
            Create class
          </Button>
        </div>
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
                placeholder="CTINFMGL"
                id="subjectcode"
                name="subjectcode"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Schedule
              </Label>
              <Input
                placeholder="MWF 3:00pm - 5:00pm"
                id="username"
                name="address"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create class</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateClassDialog;
