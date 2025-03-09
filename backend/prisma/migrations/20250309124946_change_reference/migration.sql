/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `category` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "tryout" DROP CONSTRAINT "tryout_category_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "category_name_key" ON "category"("name");

-- AddForeignKey
ALTER TABLE "tryout" ADD CONSTRAINT "tryout_category_fkey" FOREIGN KEY ("category") REFERENCES "category"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
