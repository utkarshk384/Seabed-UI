<script lang="ts">
    import type { SidebarListType } from "./types"
    import { createEventDispatcher } from "svelte"

    const dispatch = createEventDispatcher();

    export let sideBarItems: SidebarListType
</script>

<div class="p-4 w-2/12 text-left top-0 fixed overflow-y-auto h-screen">
    {#each Object.keys(sideBarItems) as title}
        <div class="py-5">
            <h4 class="px-4 text-title-lg text-primary-foreground">{title}</h4>
            {#each sideBarItems[title] as key}
                <a on:click={() => dispatch('itemChange', key)} href="#" class="p-4 w-full block hover:bg-accent-background transition-colors duration-300 rounded-base">
                    <span class="text-paragraph-lg text-accent-foreground">
                        {key}
                    </span>
                </a>
            {/each}
        </div>
    {/each}
</div>