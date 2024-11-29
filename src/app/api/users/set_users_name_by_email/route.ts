"use server"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { set_users_name_by_email } from "~/server/functions"
import { auth } from "~/auth"

type updateNameData = {
  users_name: string;
  users_email: string;
};

export const POST = async (req: NextRequest) => {
  const session = await auth();
  if (!session) return NextResponse.json(
    { error: "Not authenticated" },
    { status: 401 }
  );
  const { users_name, users_email } = await req.json() as updateNameData;
  console.log('API received users_name:', users_name, 'users_id:', users_email); // Log received data
  try {
    await set_users_name_by_email(users_name, users_email);
    return NextResponse.json({ message: "Username updated successfully", users_name }, { status: 200 });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: "Error updating username" }, { status: 500 });
  }
};
