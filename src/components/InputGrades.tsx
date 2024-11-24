"use client";
import { useState } from "react";
import { PlusCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface GradeInput {
  subject: string;
  grade: string;
}

const InputGradesModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [studentDetails, setStudentDetails] = useState({
    id: "",
    firstName: "",
    lastName: "",
    course: "",
    yearLevel: "",
    section: "",
  });
  const [gradeInputs, setGradeInputs] = useState<GradeInput[]>(
    Array(5).fill({ subject: "", grade: "" })
  );

  const handleStudentDetailsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStudentDetails({ ...studentDetails, [e.target.name]: e.target.value });
  };

  const handleGradeInputChange = (
    index: number,
    field: "subject" | "grade",
    value: string
  ) => {
    const newGradeInputs = [...gradeInputs];
    newGradeInputs[index] = { ...newGradeInputs[index], [field]: value };
    setGradeInputs(newGradeInputs);
  };

  const addGradeInput = () => {
    setGradeInputs([...gradeInputs, { subject: "", grade: "" }]);
  };

  const removeGradeInput = (index: number) => {
    const newGradeInputs = gradeInputs.filter((_, i) => i !== index);
    setGradeInputs(newGradeInputs);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Student Details:", studentDetails);
    console.log("Grades:", gradeInputs);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Input Grades</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Input Student Grades</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <Label htmlFor="id">Student ID</Label>
              <Input
                id="id"
                name="id"
                value={studentDetails.id}
                onChange={handleStudentDetailsChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="id">Email</Label>
              <Input
                id="id"
                name="id"
                value={studentDetails.id}
                onChange={handleStudentDetailsChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={studentDetails.firstName}
                onChange={handleStudentDetailsChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={studentDetails.lastName}
                onChange={handleStudentDetailsChange}
                required
              />
            </div>
          </div>

          <div className="w-full flex gap-2">
            <div className="space-y-2">
              <Label htmlFor="course">Course</Label>
              <Input
                id="course"
                name="course"
                value={studentDetails.course}
                onChange={handleStudentDetailsChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="yearLevel">Year Level</Label>
              <Input
                id="yearLevel"
                name="yearLevel"
                value={studentDetails.yearLevel}
                onChange={handleStudentDetailsChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="section">Section</Label>
              <Input
                id="section"
                name="section"
                value={studentDetails.section}
                onChange={handleStudentDetailsChange}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Grades</Label>
            {gradeInputs.map((input, index) => (
              <div key={index} className="flex space-x-2">
                <Input
                  placeholder="Subject"
                  value={input.subject}
                  onChange={(e) =>
                    handleGradeInputChange(index, "subject", e.target.value)
                  }
                  required
                />
                <Input
                  placeholder="Grade"
                  value={input.grade}
                  onChange={(e) =>
                    handleGradeInputChange(index, "grade", e.target.value)
                  }
                  required
                />
                {index >= 5 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeGradeInput(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addGradeInput}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Grade
            </Button>
          </div>
          <Button type="submit">Submit Grades</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InputGradesModal;
