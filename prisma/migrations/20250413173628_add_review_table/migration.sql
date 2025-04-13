-- CreateTable
CREATE TABLE "review" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "ReviewEmail" TEXT NOT NULL,

    CONSTRAINT "review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "review_ReviewEmail_key" ON "review"("ReviewEmail");

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_ReviewEmail_fkey" FOREIGN KEY ("ReviewEmail") REFERENCES "User_Provider"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
