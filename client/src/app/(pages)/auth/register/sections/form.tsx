"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { registerUser } from "@/app/services/auth";
import { Button } from "@/app/components/button";
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

      // todo: navigate to login
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <Form onSubmit={onSubmit}>
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
    </Form>
  );
};
