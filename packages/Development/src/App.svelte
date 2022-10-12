<script lang="ts">
	import { setDocumentTheme } from "./utils"
	import Sidebar from "./layouts/sidebar.svelte";
	import Content from "./layouts/content.svelte";

	import type { SidebarListType } from "./layouts/types"

	/* States */
	let theme = "dark"
	let sidebarItem = "Table"

	/* Set States */
	const setTheme = (): void => {
		if (theme === "dark") theme = "light"
		else theme = "dark"

		setDocumentTheme(theme)
	}

	const setSidebarItem = (e): void => {
		const item = e.detail
		sidebarItem = item
	}

	/* Sidebar Items */
	const sideBarItems:SidebarListType = {
		"Data Display": [
			"Table", 
			"Badge", 
			"Keyboard", 
			"Alert", 
			"Progress", 
			"Button", 
			"Checkbox",
			"Radio"
		],
		Layout: [],
		Typography: [],
	}

	setDocumentTheme(theme)
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
	<link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet"> 
</svelte:head>

<button on:click={setTheme}>
	Set Theme
</button>


<main class="text-center relative w-4/5 mx-auto flex items-end">
	<Sidebar sideBarItems={sideBarItems} on:itemChange={setSidebarItem}/>
	<div class="w-3/12"/>
	<Content sidebarItem={sidebarItem} />
</main>

<style>
	:global(html) {
		font-family: 'Rubik', sans-serif;
		scroll-behavior: smooth;
	}

</style>