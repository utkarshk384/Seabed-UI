/**
 * A function that creates an @type { HTMLLinkElement } and loads the default font when a font is not given in the theme object
 */
export function DefaultFont(): void {
	const head = document.querySelector("head")

	const link = createLinkEl(
		"stylesheet",
		"https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,700;1,700&display=swap"
	)
	const preconnect = createLinkEl("preconnect", "https://fonts.gstatic.com", true)
	const preconnectAPI = createLinkEl("preconnect", "https://fonts.googleapis.com")

	if (head) {
		head.appendChild(link)
		head.appendChild(preconnectAPI)
		head.appendChild(preconnect)
	}
}

const createLinkEl = (rel: string, href: string, crossorigin?: boolean): HTMLLinkElement => {
	const link = document.createElement("link")
	link.setAttribute("rel", rel)
	link.setAttribute("href", href)
	if (crossorigin) link.setAttribute("crossorigin", "true")

	return link
}
