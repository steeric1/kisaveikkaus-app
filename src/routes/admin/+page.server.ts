import { error, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.isAdmin) {
        return error(404, "Not found");
    }
};

export const actions: Actions = {
    logOut: async ({ locals }) => {
        locals.pb.authStore.clear();
        return redirect(302, "/");
    }
};
