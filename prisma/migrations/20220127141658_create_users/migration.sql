/*
  Warnings:

  - Added the required column `jokester_id` to the `joke` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "joke" ADD COLUMN     "jokester_id" UUID NOT NULL;

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "username" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- AddForeignKey
ALTER TABLE "joke" ADD CONSTRAINT "joke_jokester_id_fkey" FOREIGN KEY ("jokester_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
