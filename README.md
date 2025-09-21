# XPS Dashboard &mdash; Track Your Daily Testing Activity 🚀

## Steps to follow

1. **Create App using pnpm**
2. **Add prisma to project**
3. **Update prisma models and migrate them**
4. **Create github repo**
5. **Create update basic layout & add shadcn dashboard**
6. **Start creating folder structure**
7. **Add Shadcn components**
8. **Add Motion Primitives**
9. **Create server action, forms, add myUi components**
10. **start writting code..**

## Technologies Used 🛠️

- **Next.js** &mdash; Fullstack React Framework ⚛️
- **Shadcn/UI** &mdash; Modern UI Components 🎨
- **Motion Primitives** &mdash; Animation Utilities 🌀
- **Lucide Icons** &mdash; Icon Library 🖼️
- **Tailwind CSS** &mdash; Utility-first CSS Framework 💨
- **Prisma** &mdash; Database ORM 🗄️
- **React Hook Form** &mdash; Form Management 📝

## Project Description 📋

**XPS Dashboard** is a comprehensive testing management platform designed to help testers organize and streamline their daily activities on Windows. 🖥️

## Core Features 🌟

- **Daily Activity Tracking** 📅
- **Script Management** 📜
- **Database Table Explorer** 📊
- **Test Case Management** 🧪
  - Manual Test Cases ✍️
  - Automation Test Cases 🤖
  - Regression Test Screenshots 🖼️
- **Excel Sheet Organization** 📑
- **Module & Application Directory** 🗂️
- **User Guide Repository** 📚
- **Secure Credential Storage** 🔒
  - Portal Access Details 🌐
  - User Management 👥
  - Password Storage 🗝️

## Benefits 🎯

- Centralized testing resource management 🗃️
- Easy access to testing artifacts 🔗
- Improved team collaboration 🤝
- Secure information storage 🛡️
- Streamlined workflow organization 🏃‍♂️

## How to install Prisma

1. **Install Prisma CLI and SQLite as a dev dependency:**

   ```sh
   pnpm add -D prisma
   npx prisma init --datasource-provider sqlite
   pnpm add @prisma/client
   ```

2. **Initialize Prisma in your project:**

   ```sh
   npx prisma init --datasource-provider sqlite
   ```

   This creates a `prisma` folder with a `schema.prisma` file and a `.env` file.

3. **Define your data model:**

   Edit `prisma/schema.prisma` and add your models. For example:

   ```prisma
   model User {
     id    Int     @id @default(autoincrement())
     name  String
     email String  @unique
   }
   ```

4. **Run the first migration:**

   ```sh
   npx prisma migrate dev --name init
   ```

   This will create your SQLite database and apply the migration.

5. **Generate Prisma Client:**
   ```sh
   npx prisma generate
   ```

Your Prisma setup with SQLite is now ready!

---

> _Built for testers, by testers. Enjoy a seamless and secure testing experience!_ ✨
