import { baseURL } from "@/app/config/defaults";

type RegisterUserBody = {
  email: string;
  password: string;
};

type LoginUserBody = {
  email: string;
  password: string;
};

export const registerUser = (body: RegisterUserBody) =>
  fetch(`${baseURL}/auth/register`, {
    method: "POST",
    body: JSON.stringify(body),
  });

export const loginUser = (body: LoginUserBody) =>
  fetch(`${baseURL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(body),
  }).then((res) => res.json());
