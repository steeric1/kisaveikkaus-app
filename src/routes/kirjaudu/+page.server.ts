import type { PageServerLoad, Actions } from "./$types";

import { fail, setError, superValidate } from "sveltekit-superforms";
import { formSchema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";

export const load: PageServerLoad = async ({ locals }) => {
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

        const { username, password } = form.data;

        try {
            await event.locals.pb.collection("users").authWithPassword(username, password);
        } catch (err) {
            return setError(form, "", "Väärä käyttäjänimi tai salasana", { status: 401 });
        }

        return { form };
    }
};
