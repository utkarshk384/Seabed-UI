<script lang="ts">
	import Keyboard from "../components/keyboard.svelte";
    import Badge from "../components/badge.svelte";
    import Table from "../components/table.svelte"
    import "../index.css"
	import Alert from "../components/alert.svelte";
	import Progress from "../components/progress.svelte";
	import Button from "../components/button.svelte";
	import Checkbox from "../components/checkbox.svelte";
	import Radio from "../components/radio.svelte";

    export let sidebarItem: string = "Table"

    $: console.log(sidebarItem)
</script>


<div class="flex flex-col w-full">
    {#if sidebarItem === "Table"}
        <Table />
    {:else if sidebarItem === "Badge"}
        <Badge />
    {:else if sidebarItem === "Keyboard"}
        <Keyboard />
    {:else if sidebarItem === "Alert"}
        <Alert />
    {:else if sidebarItem === "Progress"}
        <Progress />
    {:else if sidebarItem === "Button"}
        <Button />
    {:else if sidebarItem === "Checkbox"}
        <Checkbox />
    {:else if sidebarItem === "Radio"}
        <Radio />
    {/if}
</div>