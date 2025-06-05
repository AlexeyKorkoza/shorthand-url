/*
  Warnings:

  - A unique constraint covering the columns `[shortUrl]` on the table `ShortUrl` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[alias]` on the table `ShortUrl` will be added. If there are existing duplicate values, this will fail.
  - Made the column `alias` on table `ShortUrl` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ShortUrl" ALTER COLUMN "alias" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ShortUrl_shortUrl_key" ON "ShortUrl"("shortUrl");

-- CreateIndex
CREATE UNIQUE INDEX "ShortUrl_alias_key" ON "ShortUrl"("alias");
