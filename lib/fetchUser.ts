"use server";
import { cookies } from "next/headers";
import axios from "axios";

export async function fetchUser() {
  const accessToken = cookies().get("accessToken")?.value;
  try {
    if (!accessToken) {
      throw new Error("No access token found");
    }
    const res = await axios.get(`${process.env.APP_URL}/api/v1/user`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data.data;
  } catch (error: any) {
    console.log("[Error] when fetch user on server: ", error);
    return null;
  }
}
