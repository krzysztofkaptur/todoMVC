"use client";

import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { logout } from "@/app/services/auth";
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

  const { mutate: logoutMutation, isPending: isLogoutLoading } = useMutation({
    mutationFn: (cookie: string) => logout(cookie),
    onSuccess: () => {
      router.push("/auth/login");
      router.refresh();
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleLogout = async () => {
    if (cookie) {
      logoutMutation(cookie);
    }
  };

  return (
    <div className="shadow-sm">
      <nav className="m-auto flex max-w-md items-center gap-4 p-4">
        {user?.id ? (
          <div className="flex w-full items-center justify-end gap-2">
            <span>{user?.email}</span>
            <Button
              isLoading={isLogoutLoading}
              variant="outline"
              onClick={handleLogout}
            >
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
