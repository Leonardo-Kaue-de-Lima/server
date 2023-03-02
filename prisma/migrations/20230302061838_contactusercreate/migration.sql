-- CreateTable
CREATE TABLE "contact_user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "contact" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    CONSTRAINT "contact_user_contact_fkey" FOREIGN KEY ("contact") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "contact_user_contact_amount_key" ON "contact_user"("contact", "amount");
