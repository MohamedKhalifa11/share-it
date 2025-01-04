This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🚧 Project Status: Under Development 🚧

This project, **SHARE IT**, is currently a work in progress. New features are being added, and existing components are being refined. Expect frequent updates and improvements!

## Features

- **Blog Creation with Real-Time Preview**: Users can create engaging blog posts by adding a title, description, category, pitch, and an image URL. The real-time image preview enhances the content creation experience, allowing users to see how their blog will appear instantly.

- **Seamless User Authentication**: Integrated with **Sanity** and **NextAuth**, the app offers secure and user-friendly authentication via Gmail and GitHub, ensuring data security and ease of access.

- **Performance Optimization**: This project leverages **Suspense** from React to manage the user experience during asynchronous operations. By handling loading states gracefully, it ensures that resources are presented smoothly, enhancing the overall user experience, even on slower networks.

- **Bug Reporting System**: Equipped with a dedicated bug reporting feature, users can submit bugs by uploading screenshots, along with their name and email. This ensures prompt issue resolution and continuous improvement.

- **Automated Error Reporting**: Built-in error tracking captures and sends detailed error reports to the developer, ensuring a stable and reliable user experience.

- **Advanced Search Functionality**: Empower users to effortlessly search for blogs and posts with a robust search mechanism, enhancing user experience and engagement.


- **Dynamic Blog Viewing**: Users can view comprehensive blog posts, complete with real-time view counts, providing insights into content popularity.

- **Secure User Logout**: Users can log out at any time, ensuring their data remains secure and their session ends when desired.

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, Styled-components
- **Backend**: Sanity
- **Authentication**: NextAuth.js and Sanity
- **Database**: Sanity CMS
- **UI Components**: Radix UI, Lucide React
- **Error Tracking**: Sentry
- **Markdown Support**: Markdown-it, UIW React MD Editor
- **Utilities**: clsx, Slugify
- **Build Tools**: TypeScript, ESLint, Prettier

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
