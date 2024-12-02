/*
  Warnings:

  - Added the required column `academicYear` to the `report_cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semester` to the `report_cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `report_cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schoolId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'SUPER_ADMIN';

-- AlterTable
ALTER TABLE "report_cards" ADD COLUMN     "academicYear" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "semester" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "schoolId" TEXT NOT NULL;
