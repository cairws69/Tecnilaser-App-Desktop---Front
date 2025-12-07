-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "dateOfBirth" TEXT,
    "rg" TEXT,
    "postalCode" TEXT,
    "address" TEXT,
    "neighborhood" TEXT,
    "city" TEXT,
    "state" TEXT,
    "registrationDate" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "devices" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "clientAddress" TEXT,
    "clientNeighborhood" TEXT,
    "clientPhone" TEXT NOT NULL,
    "device" TEXT NOT NULL,
    "model" TEXT,
    "defect" TEXT NOT NULL,
    "voltage" TEXT NOT NULL DEFAULT '110',
    "repair" TEXT,
    "budget" TEXT,
    "entryDate" TEXT NOT NULL,
    "promisedDate" TEXT,
    "observation" TEXT,
    "accepted" TEXT NOT NULL DEFAULT 'não',
    "completionDate" TEXT,
    "exitDate" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Aguardando',
    "warranty" TEXT,
    "downloaded" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "devices_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "devices" ADD CONSTRAINT "devices_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
