import { makeCSSVariables, flattenObject } from "@seabedui/utils"
import plugin from "tailwindcss/plugin"

import { defaultTheme } from "./themes"
import { NormalizeTheme } from "./helpers"

import type { PluginCreator } from "tailwindcss/types/config"
import type { InternalTheme, Theme, Dict, CSSStyles } from "@seabedui/types"

/* Import css */
import components from "@seabedui/components/dist/components.json"
import utilities from "@seabedui/components/dist/utils.json"
import base from "@seabedui/components/dist/base.json"

/** 
    Configurations available for the plugin

    1. Theme - @type {Theme}
    3. States - @type {Object}
	4. ResetCSS - @type {boolean}
*/
const Main: PluginCreator = (tw) => {
	const seabedUI = tw.config("seabedui")
	let theme = (seabedUI?.theme as unknown as InternalTheme) || defaultTheme

	theme = NormalizeTheme(theme as Theme)

	/* Include Base Styles */
	// if (tw.config("seabedui.resetCSS") == true) tw.addBase({ ...styles.reset, ...styles.base })
	tw.addBase(base)

	/* Include custom utilities */
	tw.addUtilities(utilities)

	/* Flattened Fonts */
	const fonts = theme.fontSize?.sizes as unknown as Dict<string>
	const bindings = theme.fontSize?.bindings as unknown as Dict<string>

	/* Add CSS Variables */
	const CSSProperties: Dict<string> = {
		"--radius-default": theme.radius,
		"--text-dark": theme.colors.dark.text as string,
		"--text-light": theme.colors.light.text as string,
		...makeCSSVariables(theme.shadows as Dict<string>, "shadow"),
		...makeCSSVariables(theme.radiusConfig as Dict<string>, "radius"),
		...makeCSSVariables(fonts as Dict<string>, "text"),
	}

	/* CSS Variables for Light Colors */

	let flattenedColors = flattenObject<string>(theme.colors.light)
	const lightColors = {
		"--neutral-text": theme.colors.light.text as string,
		...makeCSSVariables(flattenedColors),
	}

	/* CSS Variables for Dark Colors */
	flattenedColors = flattenObject<string>(theme.colors.dark)
	const darkColors = {
		"--neutral-text": theme.colors.dark.text as string,
		...makeCSSVariables(flattenedColors),
	}

	// Check for spinner

	/* Add Components */
	if (!seabedUI.disableComponents) {
		if (theme.css?.spinner) addCSS(theme.css.spinner, ".btn-loading", components)
		tw.addComponents(components)
	}

	/* Injet all CSS Variables */
	tw.addBase({ "html[data-theme='light']": lightColors })
	tw.addBase({ "html[data-theme='dark']": darkColors })
	tw.addUtilities({
		".seabed-content": makeCSSVariables(bindings),
	})

	console.log(makeCSSVariables(bindings))

	tw.addBase({ ":root": CSSProperties })

	/* Custom States for Button, Link etc... */
	// if (typeof tw.config("seabedui.states") == "object") {
	// 	const states = tw.config("seabedui.states") as Dict<string>
	// }
}

/* Unknown Code. Might understand later while adding Button states */
const addCSS = (CSS: CSSStyles, key: string, components: any): void => {
	let isPresent = true

	/* After Selector */
	if (CSS.after) (components[`${key}::after`] = CSS.after), (isPresent = true)

	/* Before Selector */
	if (CSS.before) (components[`${key}::before`] = CSS.before), (isPresent = true)

	if (!CSS.before && isPresent && `${key}::before` in components)
		delete components[`${key}::before`]

	/* Main selector */
	if (CSS.body) components[key] = CSS.body

	if (!CSS.body && isPresent && key in components) delete components[key]
}

export default plugin(Main)

export { defaultTheme }
