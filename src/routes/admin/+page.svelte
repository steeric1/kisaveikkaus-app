<script>
    import { Button } from "@/components/ui/button";
    import { Input } from "@/components/ui/input";
    import { Label } from "@/components/ui/label";
</script>

<form method="POST" action="?/logOut">
    <Button type="submit">Kirjaudu ulos</Button>
</form>

<form method="POST" action="" class="space-y-2">
    <Label for="fileInput" class="font-semibold">Rekisteröintikoodit</Label>
    <Input
        id="fileInput"
        type="file"
        class="h-fit rounded-md p-0 text-xs file:cursor-pointer file:rounded-none file:bg-primary file:p-2 file:px-4 file:text-xs file:text-primary-foreground file:transition-colors hover:file:bg-primary/90"
        accept=".csv"
    />
    <p class="text-xs text-muted-foreground">Hyväksytyt muodot: CSV</p>
</form>
