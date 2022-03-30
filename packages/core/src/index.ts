import { createColorClasses, NormalizeTheme } from "@seabedui/utils"
import styles from "@seabedui/components"

import { themes, tailwindColors } from "./themes"

import type { tailwindPlugin, InternalTheme, CustomTheme, Dict, CSSStyles } from "@seabedui/types"

/** 
    Configurations available for the plugin

    1. Theme - @type {Object}
    3. States - @type {Object}
	4. ResetCSS - @type {boolean}
*/

export default function (tw: tailwindPlugin): void {
	let theme = tw.config<InternalTheme>("seabedui.theme") || themes

	let colorVariants: boolean = tw.config("seabedui.colorVariants")
	if (typeof colorVariants === "undefined") colorVariants = true

	theme = NormalizeTheme(theme as CustomTheme, colorVariants)

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

	cssVarLight = { ...cssVarLight, ...theme.__light.css }
	cssVarDark = { ...cssVarDark, ...theme.__dark.css }

	theme.__dark.classes.forEach((cls) => tw.addUtilities(cls))
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
