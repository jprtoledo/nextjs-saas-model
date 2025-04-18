# Next.js SaaS Model

This is a modern, production-ready SaaS (Software as a Service) template built with Next.js, designed to serve as a foundation for your future SaaS applications. It includes essential features like authentication, database integration, and email functionality.

## Features

- 🚀 Next.js 15 with App Router
- 🔐 Authentication with JWT
- 📧 Email functionality with Nodemailer
- 🗄️ PostgreSQL database with Prisma ORM
- 🎨 Modern UI with Tailwind CSS
- ⚡ TypeScript for type safety
- 🔍 ESLint for code quality
- 📱 Responsive design
- 🔄 State management
- 🔒 Secure password hashing with bcrypt

## Prerequisites

- Node.js 18.17 or later
- npm or yarn
- PostgreSQL database (or Supabase)

## Getting Started

1. Clone the repository:
```bash
git clone <your-repo-url>
cd nextjs-saas-model
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```env
DATABASE_URL="your-database-url"
DIRECT_URL="your-direct-database-url"
ACCESS_SECRET="your-access-token-secret"
REFRESH_SECRET="your-refresh-token-secret"
EMAIL_USER="your-email"
EMAIL_PASSWORD="your-email-password"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection URL (with connection pooling) | Yes |
| `DIRECT_URL` | Direct PostgreSQL connection URL | Yes |
| `ACCESS_SECRET` | Secret key for JWT access tokens | Yes |
| `REFRESH_SECRET` | Secret key for JWT refresh tokens | Yes |
| `EMAIL_USER` | Email address for sending emails | Yes |
| `EMAIL_PASSWORD` | Email account password | Yes |
| `NEXT_PUBLIC_APP_URL` | Public URL of your application | Yes |

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run postinstall` - Generate Prisma client

## Project Structure

```
├── src/              # Source code
│   ├── app/         # Next.js app router
│   ├── components/  # React components
│   ├── lib/         # Utility functions
│   └── types/       # TypeScript types
├── prisma/          # Database schema and migrations
├── public/          # Static assets
└── ...config files
```

## Contributing

Feel free to submit issues and enhancement requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.