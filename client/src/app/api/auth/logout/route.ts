import { NextResponse, NextRequest } from "next/server";
import { redirect } from "next/navigation";
import { baseURL } from "@/app/config/defaults";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const accessTokenObj = request.cookies.get("accessToken");

  let data = {};

  try {
    data = await fetch(`${baseURL}/auth/logout`, {
      headers: {
        Cookie: `accessToken=${accessTokenObj!.value}`,
      },
      body: null,
      method: "POST",
    });

    cookies().delete("accessToken");

    redirect("/auth/login");
  } catch (err) {
    console.log(err);
  }

  return NextResponse.json(data);
}
