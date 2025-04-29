# Contest Absolve

A platform for CSEC CPD members to discuss and solve programming problems together. Share your Codeforces contest problems and get help from the community.

## Features

- Google Authentication
- Submit Codeforces contest problems
- Browse and view problems
- Comment and discuss solutions
- Real-time updates

## Prerequisites

- Node.js 18.x or later
- MongoDB
- Google OAuth credentials

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd contest-absolve
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory with the following variables:
```
MONGODB_URI=mongodb://localhost:27017/contest-absolve
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

4. Set up Google OAuth:
   - Go to the [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project
   - Enable the Google+ API
   - Create OAuth 2.0 credentials
   - Add `http://localhost:3000/api/auth/callback/google` to the authorized redirect URIs
   - Copy the client ID and client secret to your `.env.local` file

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Usage

1. Sign in with your Google account
2. Submit a problem by providing:
   - Problem title
   - Contest link
   - Problem link
   - Description
3. Browse problems submitted by other users
4. Participate in discussions by commenting on problems

## Technologies Used

- Next.js 14
- TypeScript
- MongoDB
- NextAuth.js
- Tailwind CSS
- React

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
