import { makeCSSVariables, flattenObject } from "@seabedui/utils"
import styles from "@seabedui/components"

import { defaultTheme } from "./themes"
import { NormalizeTheme } from "./helpers"

import type { tailwindPlugin, InternalTheme, Theme, Dict, CSSStyles } from "@seabedui/types"

/** 
    Configurations available for the plugin

    1. Theme - @type {Theme}
    3. States - @type {Object}
	4. ResetCSS - @type {boolean}
*/
export default function (tw: tailwindPlugin): void {
	let theme = tw.config<InternalTheme>("seabedui.theme") || defaultTheme

	theme = NormalizeTheme(theme as Theme)

	/* Include Base Styles */
	tw.addBase(styles.base)

	/* Include custom utilities */
	tw.addUtilities(styles.utilities)

	// /* Add custom tailwindcss colors */
	// Object.keys(tailwindColors).forEach((color) =>
	// 	tw.addUtilities(createColorClasses({ cssVar: color }))
	// )

	/* Flattened Fonts */
	const fonts = flattenObject(theme.fontSize as Dict<unknown>)

	/* Add CSS Variables */
	const CSSProperties: Dict<string> = {
		"--radius-default": theme.radius,
		...makeCSSVariables(theme.shadows as Dict<string>, "shadow"),
		...makeCSSVariables(theme.radiusConfig as Dict<string>, "radius"),
		...makeCSSVariables(theme.breakpoints as Dict<string>, "bp"),
		...makeCSSVariables(theme.colors.neutral as Dict<string>),
		...makeCSSVariables(fonts as Dict<string>, "text"),
	}

	/* CSS Variables for Light Colors */
	let flattenedColors = flattenObject<string>(theme.colors.light)
	const lightColors = makeCSSVariables(flattenedColors)

	/* CSS Variables for Dark Colors */
	flattenedColors = flattenObject<string>(theme.colors.dark)
	const darkColors = makeCSSVariables(flattenedColors)

	/* Injet all CSS Variables */
	tw.addBase({ "html[data-theme='light']": lightColors })
	tw.addBase({ "html[data-theme='dark']": darkColors })
	tw.addUtilities({ "text-custom": "hsla(var(--text), 1)" })
	tw.addBase({ ":root": CSSProperties })

	// Check for spinner
	if (theme.css?.spinner) addCSS(theme.css.spinner, ".btn-loading")

	/* Custom States for Button, Link etc... */
	// if (typeof tw.config("seabedui.states") == "object") {
	// 	const states = tw.config("seabedui.states") as Dict<string>
	// }

	/* Add Components */
	tw.addComponents(styles.components)

	/* Reset CSS */
	if (tw.config("seabedui.resetCSS") == true) tw.addBase(styles.reset)
}

/* Unknown Code. Might understand later while adding Button states */
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
