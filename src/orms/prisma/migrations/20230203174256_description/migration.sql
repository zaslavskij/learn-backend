/*
  Warnings:

  - Added the required column `description` to the `cources` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cources" ADD COLUMN     "description" VARCHAR(2000) NOT NULL;
