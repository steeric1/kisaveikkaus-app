import type { Actions, PageServerLoad } from "./$types";
import { TOKENS_FILE } from "$env/static/private";
import { error, fail, redirect } from "@sveltejs/kit";
import { formSchema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";
import { setError, superValidate } from "sveltekit-superforms";
import { ClientResponseError } from "pocketbase";

export const load: PageServerLoad = async (event) => {
    try {
        const tokens = await Bun.file(TOKENS_FILE).text();
        event.locals.registrationToken = tokens
            .split("\n")
            .map((line) => line.split(" "))
            .find(([token, used]) => token === event.params.token && used === "0")?.[0];
    } catch (err) {
        console.error(err);
        error(500, { message: "Palvelimen virhe" });
    }

    if (!event.locals.registrationToken) {
        redirect(302, "/ala-yrita");
    }

    return {
        form: await superValidate(zod(formSchema))
    };
};

export const actions: Actions = {
    default: async (event) => {
        const form = await superValidate(event, zod(formSchema));

        if (!form.valid) {
            return fail(400, { form });
        }

        const { username, password, passwordConfirm, email } = form.data;

        try {
            await event.locals.pb.collection("users").create({
                email,
                password,
                passwordConfirm,
                username
            });
        } catch (err) {
            if (err instanceof ClientResponseError) {
                const { data } = err.data;
                if (data.username) {
                    setError(form, "username", "Käyttäjänimi on varattu");
                }

                if (data.email) {
                    setError(form, "email", "Sähköposti on jo käytössä");
                }

                return fail(409, { form });
            }
        }

        return { form };
    }
};
