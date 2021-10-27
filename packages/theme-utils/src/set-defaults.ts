import { ParseSizes } from "./parse"

import type { DefaultPropsInterface, Dict, RequiredBy } from "@seabedui/types"

export function DefaultSpacing<T extends DefaultPropsInterface>(props: T): T {
	const { m = "0", p = "0", mt, mr, mb, ml, pt, pr, pb, pl } = props

	const pSet: Dict<string | null> = {
		p: ParseSizes(p)[0],
		pt: pt ? ParseSizes(pt)[0] : null,
		pr: pr ? ParseSizes(pr)[0] : null,
		pb: pb ? ParseSizes(pb)[0] : null,
		pl: pl ? ParseSizes(pl)[0] : null,
	}

	const mSet: Dict<string | null> = {
		m: ParseSizes(m)[0],
		mt: mt ? ParseSizes(mt)[0] : null,
		mr: mr ? ParseSizes(mr)[0] : null,
		mb: mb ? ParseSizes(mb)[0] : null,
		ml: ml ? ParseSizes(ml)[0] : null,
	}

	const padding = `${pSet.pt || pSet.p} ${pSet.pr || pSet.p} ${pSet.pb || pSet.p} ${
		pSet.pl || pSet.p
	}`
	const margin = `${mSet.mt || mSet.m} ${mSet.mr || mSet.m} ${mSet.mb || mSet.m} ${
		mSet.ml || mSet.m
	}`

	return { ...props, padding, margin }
}

export function DefaultProps<P extends DefaultPropsInterface = DefaultPropsInterface>(
	props: P
): RequiredBy<P, "padding" | "margin"> {
	props = DefaultSpacing(props)

	const { cx = "", sx = {} } = props

	return { ...props, cx, sx } as RequiredBy<P, "padding" | "margin" | "cx" | "sx">
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
