import { z } from "zod";

export const formSchema = z
    .object({
        username: z.string().min(3, { message: "Käyttäjänimen on oltava vähintään 3 merkkiä" }),
        password: z.string().min(8, { message: "Salasanan on oltava vähintään 8 merkkiä" }),
        passwordConfirm: z.string().min(1, { message: "Pakollinen kenttä" }),
        email: z
            .string()
            .email({ message: "Virheellinen sähköpostiosoite" })
            .min(1, { message: "Pakollinen kenttä" })
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: "Salasanat eivät täsmää",
        path: ["passwordConfirm"]
    });

export type FormSchema = typeof formSchema;
