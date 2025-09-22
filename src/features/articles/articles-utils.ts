import { articleTable } from '@/db/schema';
import { db } from '@/lib/drizzle'
import 'server-only'

export type ArticleType = typeof articleTable.$inferSelect

// export type ArticleType = Awaited<ReturnType<typeof getAllarticles>>;

export async function getAllarticles() {
    const articles = await db.query.articleTable.findMany({
        with: {
            user: {
                columns: { email: true, name: true }
            }
        },
        orderBy: (table, fn) => fn.desc(table.created_at),

    })
    return articles;
}