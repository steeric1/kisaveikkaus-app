import { z } from "zod";

export const formSchema = z.object({
    username: z.string().min(1, { message: "Pakollinen kenttä" }),
    password: z.string().min(1, { message: "Pakollinen kenttä" })
});

export type FormSchema = typeof formSchema;
