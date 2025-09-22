'use server'

import { articleTable } from "@/db/schema";
import { db } from "@/lib/drizzle";
import { ArticleSchema } from "@/lib/zod-schema/articles-schema"


export async function createArticleAction(initial: any, formData: FormData) {
    const data = Object.fromEntries(formData.entries())

    const { success, data: fields, error } = await ArticleSchema.safeParseAsync({ ...data });

    if (!success) {
        return {
            success, errors: {
                title: error?.format().title?._errors[0],
                body: error?.format().body?._errors[0],
            }
        }
    };

    try {
        await db.insert(articleTable).values({
            author_id: formData.get('author_id') as string,
            ...fields,
        })
    } catch (error) {
        return {
            success: false, errors: {
                other: error instanceof Error ? error?.message : 'create fail'
            }
        }
    }

    return { success: true }
}