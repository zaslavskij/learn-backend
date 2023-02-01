/*
  Warnings:

  - Added the required column `title` to the `cources-parts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cources-parts" ADD COLUMN     "title" VARCHAR(140) NOT NULL;
