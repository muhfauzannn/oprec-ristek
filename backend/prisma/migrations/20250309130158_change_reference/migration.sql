/*
  Warnings:

  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `category` on the `tryout` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TryOutCategories" AS ENUM ('Math', 'Programming', 'Calculus', 'Business', 'Physics');

-- DropForeignKey
ALTER TABLE "tryout" DROP CONSTRAINT "tryout_category_fkey";

-- AlterTable
ALTER TABLE "tryout" DROP COLUMN "category",
ADD COLUMN     "category" "TryOutCategories" NOT NULL;

-- DropTable
DROP TABLE "category";
