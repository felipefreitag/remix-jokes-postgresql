CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- CreateTable
CREATE TABLE "joke" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),
    "name" VARCHAR(250) NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "joke_pkey" PRIMARY KEY ("id")
);
