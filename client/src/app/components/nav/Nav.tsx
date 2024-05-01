"use client";

import Link from "next/link";

import { logout } from "@/app/services/auth";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";

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
    <div className="shadow-sm">
      <nav className="m-auto flex max-w-md items-center gap-4 p-4">
        {user?.id ? (
          <div className="flex w-full items-center justify-end gap-2">
            <span>{user?.email}</span>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link href="/auth/login">Login</Link>
            <Link href="/auth/register">Register</Link>
          </div>
        )}
      </nav>
    </div>
  );
};
