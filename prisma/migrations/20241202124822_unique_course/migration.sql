/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `courses` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code,title]` on the table `courses` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "courses_code_key" ON "courses"("code");

-- CreateIndex
CREATE UNIQUE INDEX "courses_code_title_key" ON "courses"("code", "title");
