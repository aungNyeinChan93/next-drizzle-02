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
            },
            comments: true
        },
        orderBy: (table, fn) => fn.desc(table.created_at),

    })
    return articles;
};



export async function getArticleById(id: number) {
    const article = await db.query.articleTable.findFirst({
        with: {
            user: {
                columns: { email: true, name: true }
            },
            comments: true
        },
        where: (table, fns) => fns.eq(table.id, id),
        orderBy: (table, fn) => fn.desc(table.created_at),
    })
    return article
}