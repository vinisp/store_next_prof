/*
  Warnings:

  - You are about to alter the column `expires_at` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `Int8` to `Int4`.
  - The `course_id` column on the `Course` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `name` column on the `Course` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `courses` column on the `Course` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `plan` column on the `Course` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `name` on the `Tenant` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `courses` on the `Tenant` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `plan` on the `Tenant` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `slug` on the `Tenant` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `image` on the `Tenant` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "expires_at" SET DATA TYPE INT4;

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "course_id";
ALTER TABLE "Course" ADD COLUMN     "course_id" STRING;
ALTER TABLE "Course" DROP COLUMN "name";
ALTER TABLE "Course" ADD COLUMN     "name" STRING;
ALTER TABLE "Course" DROP COLUMN "courses";
ALTER TABLE "Course" ADD COLUMN     "courses" STRING;
ALTER TABLE "Course" DROP COLUMN "plan";
ALTER TABLE "Course" ADD COLUMN     "plan" STRING;

-- AlterTable
ALTER TABLE "Tenant" DROP COLUMN "name";
ALTER TABLE "Tenant" ADD COLUMN     "name" STRING NOT NULL;
ALTER TABLE "Tenant" DROP COLUMN "courses";
ALTER TABLE "Tenant" ADD COLUMN     "courses" STRING NOT NULL;
ALTER TABLE "Tenant" DROP COLUMN "plan";
ALTER TABLE "Tenant" ADD COLUMN     "plan" STRING NOT NULL;
ALTER TABLE "Tenant" DROP COLUMN "slug";
ALTER TABLE "Tenant" ADD COLUMN     "slug" STRING NOT NULL;
ALTER TABLE "Tenant" DROP COLUMN "image";
ALTER TABLE "Tenant" ADD COLUMN     "image" STRING NOT NULL;
