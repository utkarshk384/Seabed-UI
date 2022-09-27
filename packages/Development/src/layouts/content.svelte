<script lang="ts">
	import Keyboard from "../components/keyboard.svelte";
    import Badge from "../components/badge.svelte";
    import Table from "../components/table.svelte"
    import "../index.css"
	import Toast from "../components/toast.svelte";

    export let sidebarItem: string = "Table"

    $: console.log(sidebarItem)
</script>


<div class="flex flex-col">
    {#if sidebarItem === "Table"}
        <Table />
    {:else if sidebarItem === "Badge"}
        <Badge />
    {:else if sidebarItem === "Keyboard"}
        <Keyboard />
    {:else if sidebarItem === "Toast"}
        <Toast />
    {/if}
</div>