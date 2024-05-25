<script lang="ts">
    import { goto } from "$app/navigation";
    import { superForm } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";

    import * as Form from "$lib/components/ui/form";
    import { Input } from "$lib/components/ui/input";

    import { formSchema } from "./schema";
    import soccerLogo from "$lib/assets/soccer-logo.svg";

    const { data } = $props();

    const form = superForm(data.form, {
        validators: zodClient(formSchema),
        async onResult({ result }) {
            if (result.type === "success") {
                goto("/login");
            }
        }
    });

    const { form: formData, errors, enhance, constraints } = form;

    const formErrors = $derived($errors._errors);
</script>

<div class="fixed inset-0 m-auto flex h-fit w-full flex-col items-center space-y-8">
    <div class="flex flex-row items-center gap-2">
        <img src={soccerLogo} alt="soccer logo" width="60px" height="60px" class="mb-2" />
        <h1 class="font-['El_Messiri'] text-5xl font-bold">kisaveikkaus</h1>
    </div>
    <form
        use:enhance
        method="POST"
        class="w-1/2 min-w-96 max-w-md space-y-6 rounded-sm border-t-4 border-t-indigo-900 bg-indigo-50 p-8 shadow-md"
    >
        <Form.Field {form} name="username">
            <Form.Control let:attrs>
                <Form.Label class="font-semibold">Käyttäjänimi</Form.Label>
                <Input
                    {...attrs}
                    bind:value={$formData.username}
                    class="shadow-md"
                    {...$constraints.username}
                />
            </Form.Control>
            <Form.Description class="text-xs">
                Valitse käyttäjänimi, josta kaverit tunnistavat sinut.
            </Form.Description>
            <Form.FieldErrors class="text-xs" />
        </Form.Field>

        <Form.Field {form} name="password">
            <Form.Control let:attrs>
                <Form.Label class="font-semibold">Salasana</Form.Label>
                <Input
                    type="password"
                    {...attrs}
                    bind:value={$formData.password}
                    class="shadow-md"
                    {...$constraints.password}
                />
            </Form.Control>
            <Form.FieldErrors class="text-xs" />
        </Form.Field>

        <Form.Field {form} name="passwordConfirm">
            <Form.Control let:attrs>
                <Form.Label class="font-semibold">Vahvista salasana</Form.Label>
                <Input
                    type="password"
                    {...attrs}
                    bind:value={$formData.passwordConfirm}
                    class="shadow-md"
                    {...$constraints.passwordConfirm}
                />
            </Form.Control>
            <Form.FieldErrors class="text-xs" />
        </Form.Field>

        <Form.Field {form} name="email">
            <Form.Control let:attrs>
                <Form.Label class="font-semibold">Sähköpostiosoite</Form.Label>
                <Input
                    type="email"
                    {...attrs}
                    bind:value={$formData.email}
                    class="shadow-md"
                    {...$constraints.email}
                />
            </Form.Control>
            <Form.Description class="text-xs">
                Sähköpostiosoite vaaditaan salasanan palauttamista varten.</Form.Description
            >
            <Form.FieldErrors class="text-xs" />
        </Form.Field>

        <div class="space-x-2">
            <Form.Button class="shadow-md">Rekisteröidy</Form.Button>
            {#if formErrors}
                <small class="font-normal text-destructive">{formErrors[0]}</small>
            {/if}
        </div>
    </form>
</div>
