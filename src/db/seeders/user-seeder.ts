import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless'
import * as schema from '@/db/schema'
const pg = neon(process.env.DATABASE_URL!)


const db = drizzle(pg, { schema: { ...schema } })



export async function main() {
    const user_id = await db.insert(schema.user)
        .values([
            { name: 'koko', email: 'koko@gmail.com', id: '1' },
            { name: 'susu', email: 'susu@gmail.com', id: '2' },
            { name: 'fofo', email: 'fofo@gmail.com', id: '3' },

        ])
        .returning({
            id: schema.user.id
        })

    console.log({ user_id });

};

main();