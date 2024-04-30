import { NextResponse, NextRequest } from "next/server";
import { baseURL } from "@/app/config/defaults";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const accessTokenObj = request.cookies.get("accessToken");

  let data = {};

  try {
    data = await fetch(`${baseURL}/todos/${params.id}`, {
      method: "DELETE",
      headers: {
        Cookie: `accessToken=${accessTokenObj!.value}`,
      },
    }).then((res) => res.json());
  } catch (err) {
    console.log(err);
  }

  return NextResponse.json(data);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const payload = await request.json();
  const accessTokenObj = request.cookies.get("accessToken");

  let data = {};

  try {
    data = await fetch(`${baseURL}/todos/${params.id}`, {
      method: "PATCH",
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
