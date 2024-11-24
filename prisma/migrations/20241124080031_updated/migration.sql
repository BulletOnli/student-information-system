/*
  Warnings:

  - A unique constraint covering the columns `[facultyNumber]` on the table `faculties` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentNumber]` on the table `students` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[firstName,lastName]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
CREATE SEQUENCE faculties_facultynumber_seq;
ALTER TABLE "faculties" ALTER COLUMN "facultyNumber" SET DEFAULT nextval('faculties_facultynumber_seq');
ALTER SEQUENCE faculties_facultynumber_seq OWNED BY "faculties"."facultyNumber";

-- AlterTable
CREATE SEQUENCE students_studentnumber_seq;
ALTER TABLE "students" ALTER COLUMN "studentNumber" SET DEFAULT nextval('students_studentnumber_seq');
ALTER SEQUENCE students_studentnumber_seq OWNED BY "students"."studentNumber";

-- CreateIndex
CREATE UNIQUE INDEX "faculties_facultyNumber_key" ON "faculties"("facultyNumber");

-- CreateIndex
CREATE UNIQUE INDEX "students_studentNumber_key" ON "students"("studentNumber");

-- CreateIndex
CREATE INDEX "users_lastName_idx" ON "users"("lastName");

-- CreateIndex
CREATE UNIQUE INDEX "users_firstName_lastName_key" ON "users"("firstName", "lastName");
