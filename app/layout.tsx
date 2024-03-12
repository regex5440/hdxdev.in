import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Harsh Dagar - hdxdev.in",
  description: "hdxdev.in landing page created with Next.Js",
  keywords:
    "next.js, tailwindcss, typescript, hdxdev.in, harsh dagar, harshdagar, hdxdev, hdx, harsh, dagar, harsh dagar, development, web development, software development, web developer, software developer, full stack developer, front end developer, back end developer, mern stack, mern stack developer, mern stack development, mern stack web developer, mern stack software developer, mern stack full stack developer, mern stack front end developer, mern stack back end developer, mern stack web development, mern stack software development, mern stack full stack development, mern stack front end development, mern stack back end development, mern stack web developer, mern stack software developer, mern stack full stack developer, mern stack front end developer, mern stack back end developer, mern stack web development, mern stack software development, mern stack full stack development, mern stack front end development, mern stack back end development, mern stack web developer, mern stack software developer, mern stack full stack developer, mern stack front end developer, mern stack back end developer, mern stack web development, mern stack software development, mern stack full stack development, mern stack front end development, mern stack back end development, mern stack web developer, mern stack software developer, mern stack full stack developer, mern stack front end developer, mern stack back end developer, mern stack web development, mern stack software development, mern stack full stack development, mern stack front end development, mern stack back end development, mern stack web developer, mern stack software developer, mern stack full stack developer, mern stack front end developer, mern stack back end developer, mern stack web development, mern stack software development, mern stack full stack development, mern stack front end development, mern stack back end development, mern stack web developer, mern stack software developer, mern stack full stack developer, mern stack front end developer, mern stack back end developer, mern stack web development, mern stack software development, mern stack full stack development, mern stack front end development, mern stack back end development, mern stack web developer, mern stack software developer, mern stack full stack developer, mern stack front end developer, mern stack back end developer, mern stack web development, mern stack software development, mern stack full stack development, mern stack front end development, mern stack back end",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
