/*
  Warnings:

  - You are about to drop the column `reportCardId` on the `grades` table. All the data in the column will be lost.
  - You are about to drop the column `subject` on the `grades` table. All the data in the column will be lost.
  - You are about to drop the `_StudentToSubject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `report_cards` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[semester,quarter,enrolledSubjectId]` on the table `grades` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `enrolledSubjectId` to the `grades` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quarter` to the `grades` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semester` to the `grades` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `grades` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AcademicQuarter" AS ENUM ('PRELIMS', 'MIDTERMS', 'FINALS');

-- CreateEnum
CREATE TYPE "Semester" AS ENUM ('FIRST', 'SECOND');

-- DropForeignKey
ALTER TABLE "_StudentToSubject" DROP CONSTRAINT "_StudentToSubject_A_fkey";

-- DropForeignKey
ALTER TABLE "_StudentToSubject" DROP CONSTRAINT "_StudentToSubject_B_fkey";

-- DropForeignKey
ALTER TABLE "grades" DROP CONSTRAINT "grades_reportCardId_fkey";

-- DropForeignKey
ALTER TABLE "report_cards" DROP CONSTRAINT "report_cards_studentId_fkey";

-- AlterTable
ALTER TABLE "grades" DROP COLUMN "reportCardId",
DROP COLUMN "subject",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "enrolledSubjectId" TEXT NOT NULL,
ADD COLUMN     "quarter" "AcademicQuarter" NOT NULL,
ADD COLUMN     "semester" "Semester" NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "_StudentToSubject";

-- DropTable
DROP TABLE "report_cards";

-- CreateTable
CREATE TABLE "EnrolledSubject" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,

    CONSTRAINT "EnrolledSubject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "grades_semester_quarter_enrolledSubjectId_key" ON "grades"("semester", "quarter", "enrolledSubjectId");

-- AddForeignKey
ALTER TABLE "EnrolledSubject" ADD CONSTRAINT "EnrolledSubject_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnrolledSubject" ADD CONSTRAINT "EnrolledSubject_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grades" ADD CONSTRAINT "grades_enrolledSubjectId_fkey" FOREIGN KEY ("enrolledSubjectId") REFERENCES "EnrolledSubject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
