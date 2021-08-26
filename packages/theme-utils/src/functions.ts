import { useMemo } from "react"

import { useColorMode } from "@seabedui/color-mode"

import type { DefaultProps, DefaultThemeType, Dict } from "@seabedui/types"

export function DefaultSpacing<T extends DefaultProps>(props: T): T {
	const {
		m = 0,
		mt = "0",
		mr = "0",
		mb = "0",
		ml = "0",
		pt = "0",
		pr = "0",
		pb = "0",
		pl = "0",
		p = "0",
	} = props

	const newProps = { ...props, m, mt, mr, mb, ml, pt, pr, pb, pl, p }

	return newProps
}

export function DefaultProps<P = Dict>(props: P): P {
	props = DefaultSpacing(props)

	return props
}

export function DefaultFont(): void {
	const head = document.querySelector("head")

	const createLinkEl = (rel: string, href: string, crossorigin?: boolean): HTMLLinkElement => {
		const link = document.createElement("link")
		link.setAttribute("rel", rel)
		link.setAttribute("href", href)
		if (crossorigin) link.setAttribute("crossorigin", "true")

		return link
	}

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

export function Memoizer<P = Dict, R = string>(
	action: (props: P, theme?: DefaultThemeType) => R
): (props: P, theme?: DefaultThemeType) => R {
	return function useMemoizer(props: P, theme?: DefaultThemeType): R {
		const [colorMode] = useColorMode()
		const dependencies: unknown[] = [props, colorMode]
		if (typeof theme !== "undefined") dependencies.push(theme)

		// eslint-disable-next-line react-hooks/exhaustive-deps
		return useMemo(() => action(props, theme), dependencies)
	}
}
