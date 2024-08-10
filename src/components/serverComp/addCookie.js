"use server";

import { cookies } from "next/headers";

export async function handleAddCookie(
    username=String,
    password=String
) {
    await cookies().set("user", JSON.stringify({username, password}), {secure:true});
}

export async function handleExistCookie() {
    const cookieStore = await cookies();
    return cookieStore.has("user")
}
export async function handleGetCookie() {
    const cookieStore = await cookies();
    return cookieStore.get("user");
}