-- CreateTable
CREATE TABLE "rent" (
    "id" SERIAL NOT NULL,
    "location" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "ownername" TEXT NOT NULL,

    CONSTRAINT "rent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Market" (
    "id" SERIAL NOT NULL,
    "hiredOwner" TEXT NOT NULL,

    CONSTRAINT "Market_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Market_hiredOwner_key" ON "Market"("hiredOwner");

-- AddForeignKey
ALTER TABLE "Market" ADD CONSTRAINT "Market_hiredOwner_fkey" FOREIGN KEY ("hiredOwner") REFERENCES "user"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
