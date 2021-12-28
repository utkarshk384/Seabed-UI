import { toHSL } from "./colors"

import type {
	CustomTheme,
	BorderRadiusType,
	InternalTheme,
	Dict,
	DeepRequired,
} from "@seabedui/types"

export function NormalizeTheme(theme: CustomTheme): InternalTheme {
	/* Convert all colors to HSL */
	if (typeof theme.colors == "object") theme.colors = Colors2HSL(theme.colors)

	/* Convert all borderRadius to px */
	if (theme.borderRadius) theme.borderRadius = BorderRadius(theme.borderRadius) as BorderRadiusType

	/* Set `colorVariants` to `true` if it is undefined */

	return theme as InternalTheme
}

export function BorderRadius(radius: BorderRadiusType): string {
	const reserved = ["full", "2xl", "xl", "lg", "md", "sm", "none"]
	if (typeof radius == "string" && reserved.includes(radius)) {
		switch (radius) {
			case "full":
				return "9999px"
			case "2xl":
				return "32px"
			case "xl":
				return "24px"
			case "lg":
				return "16px"
			case "md":
				return "12px"
			case "sm":
				return "8px"
			case "none":
				return "0px"
		}
	}

	const converted: string = radius as string
	if (converted.includes("px") || converted.includes("rem") || converted.includes("em"))
		return `${radius}`
	else return `${radius}px`
}

const Colors2HSL = (clrs: CustomTheme["colors"]): InternalTheme["colors"] => {
	let colors = clrs as DeepRequired<CustomTheme["colors"]>

	if (typeof colors.dark == "undefined" && typeof colors.light == "undefined")
		throw new Error("No dark or light colors found")
	else if (typeof colors.dark == "undefined") colors.dark = colors.light
	else if (typeof colors.light == "undefined") colors.light = colors.dark

	colors = recursiveHSL(colors)

	if (typeof colors.dark.states == "undefined")
		colors.dark.states = {
			disabled: colors.dark.brand.accent,
			dragged: colors.dark.brand.accent,
			focus: colors.dark.brand.accent,
			hover: colors.dark.brand.accent,
			pressed: colors.dark.brand.accent,
		}

	if (typeof colors.light.states == "undefined")
		colors.light.states = {
			disabled: colors.light.brand.accent,
			dragged: colors.light.brand.accent,
			focus: colors.light.brand.accent,
			hover: colors.light.brand.accent,
			pressed: colors.light.brand.accent,
		}

	return colors
}

const recursiveHSL = <T>(usrObj: T): T => {
	const obj = usrObj as unknown as Dict<string | Dict<string>>
	Object.keys(obj).forEach((key) => {
		if (typeof obj[key] === "string") obj[key] = toHSL(obj[key] as string)
		// eslint-disable-next-line
		else obj[key] = recursiveHSL(obj[key])
	})

	return obj as unknown as T
}
