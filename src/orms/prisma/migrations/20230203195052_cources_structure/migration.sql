-- CreateTable
CREATE TABLE "cources-parts" (
    "id" SERIAL NOT NULL,
    "courceId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cources-parts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cource-lessons" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(140) NOT NULL,
    "lesson" VARCHAR(2000) NOT NULL,
    "courcePartId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cource-lessons_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cources-parts" ADD CONSTRAINT "cources-parts_courceId_fkey" FOREIGN KEY ("courceId") REFERENCES "cources"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cource-lessons" ADD CONSTRAINT "cource-lessons_courcePartId_fkey" FOREIGN KEY ("courcePartId") REFERENCES "cources-parts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
