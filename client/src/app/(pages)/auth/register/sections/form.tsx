"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { registerUser } from "@/app/services/auth";
import { Button } from "@/app/components/ui/button";
import { registerSchema } from "@/app/libs/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/app/components/form";
import { InputGroup } from "@/app/components/inputGroup";

export const RegisterForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const router = useRouter();

  const onSubmit = handleSubmit(async (values) => {
    try {
      await registerUser({
        email: values.email,
        password: values.password,
      });

      router.push("/auth/login");
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <Form onSubmit={onSubmit} className="flex flex-col">
      <h1 className="text-4xl font-thin">Regiser</h1>
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
      <Button type="submit">Register</Button>
      <p>
        Already have an account? <Link href="/auth/login">Login</Link>
      </p>
    </Form>
  );
};
