import { toHSL, genShadesTint } from "./colors"
import { createColorClasses } from "./addUtils"

import type {
	BorderRadiusType,
	CustomTheme,
	InternalTheme,
	Dict,
	DeepRequired,
	ThemedColors,
	InternalStyles,
} from "@seabedui/types"

export function NormalizeTheme(userTheme: CustomTheme, colorVariants: boolean): InternalTheme {
	let theme = userTheme as InternalTheme

	/* Convert all colors to HSL */
	if (typeof theme.colors == "object") theme.colors = Colors2HSL(theme.colors)

	/* Convert all borderRadius to px */
	if (theme.borderRadius) theme.borderRadius = BorderRadius(theme.borderRadius as BorderRadiusType)

	/* Set state colors for all the brand colors */
	theme = generateThemeColors(theme, colorVariants)

	return theme
}

const generateThemeColors = (theme: InternalTheme, colorVariants: boolean): InternalTheme => {
	const brandColors = ["primary", "secondary", "accent"]
	const themes = ["dark", "light"]

	themes.forEach((k) => {
		/* Dark */
		const baseTheme = theme.colors[k] as Required<ThemedColors>
		const colorMode = baseTheme.brand
		const variants: Dict<string[]> = {
			primary: genShadesTint(colorMode.primary),
			secondary: genShadesTint(colorMode.secondary),
			accent: genShadesTint(colorMode.accent),
			bg: genShadesTint(baseTheme.bg),
		}
		const themeName = `__${k}`

		const __theme: InternalStyles = { classes: [], css: {} }

		brandColors.forEach((clr) => {
			if (!colorMode[`${clr}-hover`]) colorMode[`${clr}-hover`] = variants[clr][1]
			if (!colorMode[`${clr}-focus`]) colorMode[`${clr}-focus`] = variants[clr][1]
			if (!colorMode[`${clr}-pressed`]) colorMode[`${clr}-pressed`] = variants[clr][1]
			if (!colorMode[`${clr}-dragged`]) colorMode[`${clr}-dragged`] = variants[clr][1]

			__theme.css[`--${clr}-hover`] = colorMode[`${clr}-hover`]
			__theme.css[`--${clr}-focus`] = colorMode[`${clr}-focus`]
			__theme.css[`--${clr}-pressed`] = colorMode[`${clr}-pressed`]
			__theme.css[`--${clr}-dragged`] = colorMode[`${clr}-dragged`]
		})

		Object.keys(variants).forEach((color) => {
			const clrs = variants[color]
			let count = 100

			if (!colorVariants) {
				const cssVar = `--${color}`
				__theme.css[cssVar] = colorMode[color]
				__theme.classes.push(createColorClasses({ cssVar }))
				return
			}

			clrs.forEach((clr) => {
				let cssVar = ""
				// If varaint type is `bg` then create only
				cssVar = `--${color}-${count}`
				__theme.css[cssVar] = clr

				if (color == "bg") {
					__theme.classes.push(
						createColorClasses({ cssVar, customName: `${count}`, colorTypes: { bg: true } })
					)
				} else __theme.classes.push(createColorClasses({ cssVar: cssVar }))

				count += 100
			})
		})

		theme[themeName] = __theme
	})

	return theme
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
