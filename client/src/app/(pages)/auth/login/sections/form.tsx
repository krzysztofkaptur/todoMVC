"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";

import { loginUser } from "@/app/services/auth";
import { Button } from "@/app/components/ui/button";
import { loginSchema } from "@/app/libs/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/app/components/form";
import { InputGroup } from "@/app/components/inputGroup";

import type { LoginUserBody } from "@/app/services/auth";

export const LoginForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter();

  const { mutate: login, isPending } = useMutation({
    mutationFn: (body: LoginUserBody) => loginUser(body),
    onSuccess: () => {
      router.push("/");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    login({ email: values.email, password: values.password });
  });

  return (
    <Form onSubmit={onSubmit} className="flex flex-col">
      <h1 className="text-4xl font-extralight">Login</h1>
      <InputGroup
        label="Email"
        error={errors.email?.message as string}
        type="email"
        required={true}
        {...register("email")}
      />
      <InputGroup
        label="Password"
        error={errors.password?.message as string}
        required={true}
        type="password"
        {...register("password")}
      />
      <Button type="submit" isLoading={isPending}>
        Login
      </Button>
      <p>
        Don&apos;t have an account? <Link href="/auth/register">Register</Link>
      </p>
    </Form>
  );
};
