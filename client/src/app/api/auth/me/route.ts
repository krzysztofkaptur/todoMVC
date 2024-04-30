import { NextResponse, NextRequest } from "next/server";
import { redirect } from "next/navigation";
import { baseURL } from "@/app/config/defaults";

export async function GET(request: NextRequest) {
  const accessTokenObj = request.cookies.get("accessToken");

  let data = {};

  try {
    data = await fetch(`${baseURL}/auth/me`, {
      headers: {
        Cookie: `accessToken=${accessTokenObj!.value}`,
      },
    }).then((res) => res.json());
  } catch (err) {
    console.log(err);
    redirect("/auth/login");
  }

  return NextResponse.json(data);
}
