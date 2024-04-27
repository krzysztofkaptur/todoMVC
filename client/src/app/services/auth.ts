import { baseURL } from "@/app/services/config";

type RegisterUser = {
  email: string;
  password: string;
};

export const registerUser = (body: RegisterUser) =>
  fetch(`${baseURL}/auth/register`, {
    method: "POST",
    body: JSON.stringify(body),
  });
