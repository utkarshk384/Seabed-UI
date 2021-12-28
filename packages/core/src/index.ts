import { genShadesTint, createColorClasses, NormalizeTheme } from "@seabedui/utils"
import styles from "@seabedui/components"

import { themes, tailwindColors } from "./themes"

import type {
	tailwindPlugin,
	InternalTheme,
	CustomTheme,
	Dict,
	BrandColors,
	CSSStyles,
} from "@seabedui/types"

/** 
    Configurations available for the plugin

    1. Theme - @type {Object}
    3. States - @type {Object}
	4. ResetCSS - @type {boolean}
*/

export default function (tw: tailwindPlugin): void {
	let theme = tw.config<InternalTheme>("seabedui.theme") || themes

	theme = NormalizeTheme(theme as CustomTheme)

	let colorVariants: boolean = tw.config("seabedui.colorVariants")

	if (typeof colorVariants === "undefined") colorVariants = true

	const clrs = theme.colors

	/* Include Base Styles */
	tw.addBase(styles.base)

	/* Include custom utilities */
	tw.addUtilities(styles.utilities)

	/* Add custom tailwindcss colors */
	Object.keys(tailwindColors).forEach((color) =>
		tw.addUtilities(createColorClasses({ cssVar: color }))
	)

	/* Add CSS Variables */
	const CSSProperties: Dict<string> = {
		"--border-radius": theme.borderRadius,
		"--error": clrs.error,
		"--success": clrs.success,
		"--warning": clrs.warning,
		"--info": clrs.info,
	}
	let commonClasses: Dict<Dict<string>> = {}
	let cssVarDark: Dict<string> = { "--text": clrs.dark.text },
		cssVarLight: Dict<string> = { "--text": clrs.light.text }

	Object.keys(clrs).forEach((key) => {
		if (typeof key !== "string") return
		const classes = createColorClasses({ cssVar: `--${key}` })
		commonClasses = { ...commonClasses, ...classes }
	})

	/* Generate custom theme colors (genColorVariants) */
	const light = { ...clrs.light.brand, bg: clrs.light.bg, ...clrs.light.states }
	const dark = { ...clrs.dark.brand, bg: clrs.dark.bg, ...clrs.dark.states }

	const lightTheme = generateThemeColors(light, colorVariants)
	const darkTheme = generateThemeColors(dark, colorVariants)

	cssVarLight = { ...cssVarLight, ...lightTheme.css }
	cssVarDark = { ...cssVarDark, ...darkTheme.css }

	darkTheme.classes.forEach((cls) => tw.addUtilities(cls))
	tw.addBase({ "html[data-theme='light']": cssVarLight })
	tw.addBase({ "html[data-theme='dark']": cssVarDark })
	tw.addUtilities({ "text-custom": "hsla(var(--text), 1)" })
	tw.addBase({ ":root": CSSProperties })

	/* Inject CSS in components */

	// Check for spinner
	if (theme.css?.spinner) addCSS(theme.css.spinner, ".btn-loading")

	/* States */
	// if (typeof tw.config("seabedui.states") == "object") {
	// 	const states = tw.config("seabedui.states") as Dict<string>
	// }

	/* Add Components */
	tw.addComponents(styles.components) // Adding Variants is causing problems

	/* Reset CSS */
	if (tw.config("seabedui.resetCSS") == true) tw.addBase(styles.reset)
}

const generateThemeColors = (colorObject: BrandColors, ColorVariants: boolean): ThemeColors => {
	const CSSProperties: Dict<string> = {}
	const classes: Dict<Dict<string>>[] = []

	const excluded = ["disabled", "dragged", "focus", "hover", "pressed"] // To ignore creating variants for stateful colors

	Object.keys(colorObject).forEach((color) => {
		let count = 100

		/* Run the code below if `color` is in excluded or if generating color variants is disabled by the user */
		if (excluded.includes(color) || !ColorVariants) {
			const cssVar = `--${color}`
			CSSProperties[cssVar] = colorObject[color]
			classes.push(createColorClasses({ cssVar }))
			return
		}

		const isBgColor = color == "bg" // To check if current property is a bg color

		const clrs = genShadesTint(colorObject[color])
		clrs.forEach((clr) => {
			let cssVar = ""
			if (isBgColor) {
				cssVar = `--bg-${count}`
				CSSProperties[cssVar] = clr
				classes.push(
					createColorClasses({ cssVar, customName: `${count}`, colorTypes: { bg: true } })
				)
			} else {
				cssVar = `--${color}-${count}`
				CSSProperties[cssVar] = clr
				classes.push(createColorClasses({ cssVar: cssVar }))
			}
			count += 100
		})
	})

	return { css: CSSProperties, classes }
}

type ThemeColors = { css: Dict<string>; classes: Dict<Dict<string>>[] }

const addCSS = (CSS: CSSStyles, key: string): void => {
	let isPresent = true

	/* After Selector */
	if (CSS.after) (styles.components[`${key}::after`] = CSS.after), (isPresent = true)

	/* Before Selector */
	if (CSS.before) (styles.components[`${key}::before`] = CSS.before), (isPresent = true)

	if (!CSS.before && isPresent && `${key}::before` in styles.components)
		delete styles.components[`${key}::before`]

	/* Main selector */
	if (CSS.body) styles.components[key] = CSS.body

	if (!CSS.body && isPresent && key in styles.components) delete styles.components[key]
}
