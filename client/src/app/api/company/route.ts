import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const company = await fetch("https://localhost:3012/api/company", {
        method: "GET",
        headers: {

        }
    })
}
