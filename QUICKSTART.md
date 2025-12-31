# OPPE AI - Quick Start Guide

This guide will help you get the OPPE AI application up and running quickly.

## Prerequisites Checklist

Before you begin, make sure you have:
- ✅ Node.js 18 or higher installed
- ✅ PostgreSQL 14 or higher installed and running
- ✅ Git installed
- ✅ A code editor (VS Code recommended)

## Installation Steps

### 1. Navigate to the Project Directory

```bash
cd C:\Users\adamp\OneDrive\Documents\Github\oppe_ai
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including Next.js, React, Prisma, TypeScript, and other dependencies.

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
# On Windows:
copy .env.example .env

# On Mac/Linux:
cp .env.example .env
```

Then edit the `.env` file and update the database connection string:

```env
DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/oppe_ai?schema=public"
```

Replace:
- `USERNAME` with your PostgreSQL username (default: postgres)
- `PASSWORD` with your PostgreSQL password
- `localhost:5432` with your PostgreSQL host and port

### 4. Create the Database

Open PostgreSQL and create the database:

```sql
CREATE DATABASE oppe_ai;
```

Or use the command line:

```bash
psql -U postgres -c "CREATE DATABASE oppe_ai;"
```

### 5. Initialize Prisma and Push Schema

Generate the Prisma Client:

```bash
npx prisma generate
```

Push the database schema:

```bash
npx prisma db push
```

This creates all the necessary tables in your database.

### 6. (Optional) View Your Database

Open Prisma Studio to view your database:

```bash
npx prisma studio
```

This opens a browser interface at http://localhost:5555

### 7. Start the Development Server

```bash
npm run dev
```

The application will start at: **http://localhost:3000**

## Verify Installation

1. Open http://localhost:3000 in your browser
2. You should see the OPPE AI landing page
3. Click "Dashboard" to view the dashboard interface
4. Navigate through the different sections (Physicians, Cases, Reviews, etc.)

## Next Steps

### Create Your First User

Use an API client (Postman, Insomnia, or curl) to create a user:

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "SecurePass123!",
    "name": "Admin User",
    "role": "ADMINISTRATOR",
    "specialty": "Administration"
  }'
```

### Explore the API

Test the API endpoints:

1. **Register**: `POST /api/auth/register`
2. **Login**: `POST /api/auth/login`
3. **Create Case**: `POST /api/cases`
4. **List Cases**: `GET /api/cases`
5. **Create Review**: `POST /api/reviews`
6. **List Reviews**: `GET /api/reviews`

### Add Sample Data

You can use Prisma Studio (step 6) to manually add sample data:

1. Open Prisma Studio: `npx prisma studio`
2. Navigate to different models (User, Case, Competency, etc.)
3. Click "Add record" to create sample data
4. Save your changes

## Common Issues and Solutions

### Database Connection Error

**Problem**: `Can't reach database server`

**Solution**: 
- Ensure PostgreSQL is running
- Verify your DATABASE_URL in `.env`
- Check PostgreSQL is listening on the correct port (default: 5432)

### Port Already in Use

**Problem**: `Port 3000 is already in use`

**Solution**: 
- Kill the process using port 3000, or
- Change the port: `npm run dev -- -p 3001`

### Prisma Client Error

**Problem**: `@prisma/client did not initialize yet`

**Solution**: 
```bash
npx prisma generate
```

### Module Not Found

**Problem**: `Cannot find module '@/lib/...'`

**Solution**: 
```bash
npm install
npx prisma generate
```

## Development Workflow

### Making Database Changes

1. Edit `prisma/schema.prisma`
2. Push changes: `npx prisma db push`
3. Regenerate client: `npx prisma generate`

### Viewing Database

```bash
npx prisma studio
```

### Building for Production

```bash
npm run build
npm start
```

## Project Structure Overview

```
oppe_ai/
├── app/                  # Next.js App Router
│   ├── api/             # API routes
│   ├── dashboard/       # Dashboard pages
│   └── page.tsx         # Home page
├── lib/                 # Utilities
│   ├── auth.ts         # Auth helpers
│   ├── prisma.ts       # DB client
│   └── validations.ts  # Schemas
├── prisma/
│   └── schema.prisma   # Database schema
└── .env                # Environment variables
```

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Getting Help

If you encounter issues:

1. Check the console for error messages
2. Review the README.md for detailed documentation
3. Verify all prerequisites are met
4. Check the PostgreSQL logs
5. Review the Prisma schema for consistency

## Success! 🎉

You should now have:
- ✅ A running Next.js application
- ✅ Database connected and schema deployed
- ✅ API endpoints ready to use
- ✅ Dashboard interface accessible

Start building your OPPE evaluation system!
