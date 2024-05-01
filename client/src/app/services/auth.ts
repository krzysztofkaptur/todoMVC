import { baseURL } from "@/app/config/defaults";

export type RegisterUserBody = {
  email: string;
  password: string;
};

export type LoginUserBody = {
  email: string;
  password: string;
};

export const registerUser = (body: RegisterUserBody) =>
  fetch(`${baseURL}/auth/register`, {
    method: "POST",
    body: JSON.stringify(body),
  }).then((res) => res.json());

export const loginUser = (body: LoginUserBody) =>
  fetch(`http://localhost/api/v1/auth/login`, {
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

  return Promise.reject();
};

export const logout = (cookie: string) =>
  fetch(`http://localhost:3000/api/auth/logout`, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Cookie: `accessToken=${cookie}`,
    },
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject();
    }

    return res.json();
  });
