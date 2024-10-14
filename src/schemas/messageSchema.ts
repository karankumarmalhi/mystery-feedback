import {z} from 'zod'

export const messageSchema = z.object({
    content : z
    .string()
    .min(10, "content must be at least of 10 character")
    .max(500, 'content must be no longer than 500 character')
})