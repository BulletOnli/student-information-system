/*
  Warnings:

  - You are about to drop the column `quarter` on the `grades` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[semester,enrolledSubjectId]` on the table `grades` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "grades_semester_quarter_enrolledSubjectId_key";

-- AlterTable
ALTER TABLE "grades" DROP COLUMN "quarter";

-- CreateIndex
CREATE UNIQUE INDEX "grades_semester_enrolledSubjectId_key" ON "grades"("semester", "enrolledSubjectId");
