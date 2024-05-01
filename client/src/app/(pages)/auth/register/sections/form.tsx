"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";

import { registerUser } from "@/app/services/auth";
import { Button } from "@/app/components/ui/button";
import { registerSchema } from "@/app/libs/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/app/components/form";
import { InputGroup } from "@/app/components/inputGroup";

import type { RegisterUserBody } from "@/app/services/auth";

export const RegisterForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const router = useRouter();

  const { mutate: registerMutation, isPending } = useMutation({
    mutationFn: (body: RegisterUserBody) => registerUser(body),
    onSuccess: () => {
      router.push("/auth/login");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    registerMutation({ email: values.email, password: values.password });
  });

  return (
    <Form onSubmit={onSubmit} className="flex flex-col">
      <h1 className="text-4xl font-thin">Register</h1>
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
      <Button isLoading={isPending} type="submit">
        Register
      </Button>
      <p>
        Already have an account? <Link href="/auth/login">Login</Link>
      </p>
    </Form>
  );
};
