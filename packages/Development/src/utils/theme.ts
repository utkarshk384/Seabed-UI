export const setDocumentTheme = (theme: string) => {
	const rootEl = document.getElementsByTagName("html")[0]
	rootEl.dataset["theme"] = theme
}
