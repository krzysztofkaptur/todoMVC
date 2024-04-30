"use client";

import Link from "next/link";

import { logout } from "@/app/services/auth";
import { useRouter } from "next/navigation";

type Props = {
  user: {
    id: number;
    email: string;
  };
  cookie: string | undefined;
};

export const Nav = (props: Props) => {
  const { user, cookie } = props;
  const router = useRouter();

  const handleLogout = async () => {
    if (cookie) {
      try {
        await logout(cookie);
        router.push("/auth/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <nav className="flex gap-4">
      {user?.id ? (
        <>
          <span>{user?.email}</span>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link href="/auth/login">Login</Link>
          <Link href="/auth/register">Register</Link>
        </>
      )}
    </nav>
  );
};
