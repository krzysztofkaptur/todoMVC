import { baseURL } from "@/app/config/defaults";
import { redirect } from "next/navigation";

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
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject();
  });

export const fetchMe = (cookie: string | undefined) => {
  if (cookie) {
    return fetch(`http://localhost:3000/api/auth/me`, {
      credentials: "include",
      headers: {
        Cookie: `accessToken=${cookie}`,
      },
    });
  }

  return redirect("/auth/login");
};
