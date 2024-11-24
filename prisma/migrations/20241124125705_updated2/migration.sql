/*
  Warnings:

  - You are about to drop the column `facultyNumber` on the `faculties` table. All the data in the column will be lost.
  - You are about to drop the column `studentNumber` on the `students` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "faculties_facultyNumber_key";

-- DropIndex
DROP INDEX "students_studentNumber_key";

-- AlterTable
ALTER TABLE "faculties" DROP COLUMN "facultyNumber";

-- AlterTable
ALTER TABLE "students" DROP COLUMN "studentNumber";
