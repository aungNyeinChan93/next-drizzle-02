'use server'

import { auth } from "@/lib/auth"
import { RegisterSchema } from "@/lib/zod-schema/auth-schema"
import { headers } from "next/headers"


export async function registerAction(initial: any, formData: FormData) {
    const data = Object.fromEntries(formData.entries())

    const { success, data: fields, error } = await RegisterSchema.safeParseAsync({ ...data })

    if (!success) {
        return {
            success, errors: {
                name: error?.format().name?._errors[0],
                email: error?.format().email?._errors[0],
                password: error?.format().password?._errors[0],
            }
        }
    }
    try {
        const { user } = await auth.api.signUpEmail({ body: { ...fields, callbackURL: '/' }, headers: await headers() })
        if (!user) {
            return { success: false, errors: { other: 'register fail' } }
        }
    } catch (error) {
        return { success: false, errors: { other: error instanceof Error ? error?.message : 'register fail' } }

    }
    return { success: true }
}