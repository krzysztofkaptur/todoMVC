import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";

import { Nav } from "@/app/components/nav";
import { fetchMe } from "@/app/services/auth";

import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const accessTokenCookie = cookieStore.get("accessToken");
  const meRes = await fetchMe(accessTokenCookie?.value);
  const me = await meRes.json();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Nav user={me} />
        {children}
      </body>
    </html>
  );
}
