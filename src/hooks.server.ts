import type { Handle } from "@sveltejs/kit";
import PocketBase from "pocketbase";

export const handle: Handle = async ({ event, resolve }) => {
    event.locals.pb = new PocketBase("http://localhost:8090");
    const { authStore } = event.locals.pb;

    // load the store data from the request cookie string
    authStore.loadFromCookie(event.request.headers.get("cookie") || "");

    try {
        // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
        authStore.isValid && (await event.locals.pb.collection("users").authRefresh());
    } catch (_) {
        // clear the auth store on failed refresh
        authStore.clear();
    }

    console.log(event.request.method, event.url.pathname, "| auth =", authStore.isValid);

    /*authStore.onChange(() => {
        event.locals.isAdmin = authStore.isValid && authStore.isAdmin;
    }, true);*/

    const response = await resolve(event);

    // update client token
    response.headers.append("set-cookie", authStore.exportToCookie());

    return response;
};
