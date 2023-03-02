-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "googleId" TEXT,
    "email" TEXT,
    "telefone" TEXT,
    "createdAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_googleId_key" ON "user"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_telefone_key" ON "user"("telefone");
