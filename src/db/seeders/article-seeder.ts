import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import 'dotenv/config';
import * as schema from '@/db/schema'


const pg = neon(process.env.DATABASE_URL!)
const db = drizzle(pg, { schema: { ...schema } })



export async function articleSeeder() {
    const article_id = await db.insert(schema.articleTable).values({
        author_id: "o8LYiVoA1eTg6osjNuSpQWQIsfl7Nsoc",
        title: 'test title one',
        body: "test article body one",
    })
        .returning({
            id: schema.articleTable.id
        });
    console.log({ article_id });

};


articleSeeder()