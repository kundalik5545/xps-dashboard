-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "eMemberId" INTEGER,
    "xpsId" INTEGER,
    "userHashId" TEXT,
    "userName" TEXT,
    "password" TEXT,
    "memorableWord" TEXT,
    "xpsSchemeId" INTEGER,
    "eMemberSchemeId" INTEGER,
    "statusId" INTEGER,
    "dob" DATETIME,
    "niNumber" TEXT,
    "userEmail" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Portal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "portalName" TEXT NOT NULL,
    "appName" TEXT NOT NULL,
    "userName" TEXT,
    "password" TEXT,
    "memorableWord" TEXT,
    "portalUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ProposedTask" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "qaTaskId" INTEGER NOT NULL,
    "qaTaskTitle" TEXT NOT NULL,
    "qaTaskState" TEXT NOT NULL DEFAULT 'Proposed',
    "timeAllocated" TEXT,
    "timeRemained" TEXT,
    "qaTaskUrl" TEXT,
    "createdAt" DATETIME,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Bug" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bugId" INTEGER NOT NULL,
    "bugTitle" TEXT NOT NULL,
    "bugPortal" TEXT NOT NULL DEFAULT 'XPS',
    "qaBugState" TEXT NOT NULL DEFAULT 'Proposed',
    "environment" TEXT NOT NULL DEFAULT 'ST',
    "assignedTo" TEXT NOT NULL DEFAULT 'Default',
    "bugUrl" TEXT,
    "createdAt" DATETIME,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "BugDescription" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bugId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "BugDescription_bugId_fkey" FOREIGN KEY ("bugId") REFERENCES "Bug" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "XpsMenu" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "menuName" TEXT NOT NULL,
    "schemeLevel" TEXT NOT NULL,
    "module" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "XpsMenuDescription" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "menuId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "XpsMenuDescription_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "XpsMenu" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "XpsTable" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tableName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "XpsScript" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "menuId" INTEGER NOT NULL,
    "scriptTitle" TEXT NOT NULL,
    "sqlScript" TEXT,
    "scriptInfo" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "XpsScript_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "XpsMenu" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "XpsTableDescription" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tableId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "XpsTableDescription_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "XpsTable" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "XpsColumn" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tableId" INTEGER NOT NULL,
    "columnName" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "XpsColumn_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "XpsTable" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "XpsUserGuide" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "chapterName" TEXT NOT NULL,
    "chapterNo" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "XpsUserGuideDescription" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "guideId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "XpsUserGuideDescription_guideId_fkey" FOREIGN KEY ("guideId") REFERENCES "XpsUserGuide" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EmMenu" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "menuName" TEXT NOT NULL,
    "portalName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "EmMenuDescription" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "menuId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "EmMenuDescription_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "EmMenu" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EmTable" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tableName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "EmScript" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "menuId" INTEGER NOT NULL,
    "scriptTitle" TEXT,
    "sqlScript" TEXT,
    "appName" TEXT,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "EmScript_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "EmMenu" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EmColumn" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tableId" INTEGER NOT NULL,
    "columnName" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "EmColumn_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "EmTable" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EmTableDescription" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tableId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "EmTableDescription_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "EmTable" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ReleasedTask" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "taskId" INTEGER NOT NULL,
    "taskTitle" TEXT NOT NULL,
    "taskState" TEXT,
    "environment" TEXT,
    "assignedBy" TEXT DEFAULT 'Default',
    "comments" TEXT,
    "taskUrl" TEXT,
    "createdAt" DATETIME,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "DailyTask" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "azureId" INTEGER,
    "title" TEXT NOT NULL,
    "portalName" TEXT NOT NULL DEFAULT 'XPS',
    "appName" TEXT NOT NULL DEFAULT 'PenScope',
    "taskPriority" TEXT NOT NULL DEFAULT 'Low',
    "state" TEXT NOT NULL DEFAULT 'Active',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "DailyTaskComment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "taskId" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "DailyTaskComment_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "DailyTask" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
