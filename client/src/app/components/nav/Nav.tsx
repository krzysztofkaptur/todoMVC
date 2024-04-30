import Link from "next/link";

type Props = {
  user: {
    id: number;
    email: string;
  };
};

export const Nav = (props: Props) => {
  const { user } = props;

  return (
    <nav className="flex gap-4">
      {user?.id ? (
        <span>{user?.email}</span>
      ) : (
        <>
          <Link href="/auth/login">Login</Link>
          <Link href="/auth/register">Register</Link>
        </>
      )}
    </nav>
  );
};
