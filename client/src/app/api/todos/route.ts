import { NextResponse, NextRequest } from "next/server";
import { baseURL } from "@/app/config/defaults";

export async function GET(request: NextRequest) {
  const accessTokenObj = request.cookies.get("accessToken");

  let data = {};

  try {
    data = await fetch(`${baseURL}/todos`, {
      headers: {
        Cookie: `accessToken=${accessTokenObj!.value}`,
      },
    }).then((res) => res.json());
  } catch (err) {
    console.log(err);
  }

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const accessTokenObj = request.cookies.get("accessToken");

  let data = {};

  try {
    data = await fetch(`${baseURL}/todos`, {
      method: "POST",
      headers: {
        Cookie: `accessToken=${accessTokenObj!.value}`,
      },
      body: JSON.stringify(payload),
    }).then((res) => res.json());
  } catch (err) {
    console.log(err);
  }

  return NextResponse.json(data);
}
