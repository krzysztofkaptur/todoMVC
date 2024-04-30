"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { loginUser } from "@/app/services/auth";
import { Button } from "@/app/components/button";
import { loginSchema } from "@/app/libs/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/app/components/form";
import { InputGroup } from "@/app/components/inputGroup";

export const LoginForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter();

  const onSubmit = handleSubmit(async (values) => {
    try {
      await loginUser({
        email: values.email,
        password: values.password,
      });

      router.push("/");
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <Form onSubmit={onSubmit} className="flex flex-col">
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
      <Button type="submit">Login</Button>
    </Form>
  );
};