/*
  Warnings:

  - A unique constraint covering the columns `[schoolId]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `academicYear` to the `report_cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semester` to the `report_cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `report_cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schoolId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "report_cards" ADD COLUMN     "academicYear" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "semester" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "schoolId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_schoolId_key" ON "users"("schoolId");
