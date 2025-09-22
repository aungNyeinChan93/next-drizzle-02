import { user } from "@/db/schema"
import { db } from "@/lib/drizzle"
import { asc } from "drizzle-orm"



export async function getAllUsers() {
    const users = await db.query.user.findMany({
        columns: { name: true, email: true },
        orderBy: asc(user.name),
    })
    return users;
}