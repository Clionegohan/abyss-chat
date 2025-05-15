/*
  Warnings:

  - Made the column `avatarUrl` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `passwordHash` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "avatarUrl" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "passwordHash" SET NOT NULL;
