import { WalkBuilder, WalkNode } from "walkjs"
import _ from "lodash"

import type { DefaultThemeType, IndexObject, RequiredColorsType } from "@seabedUI/types"

const PREFIX = "sbu" //unable to use dynamic prefix due to js to scss restrictions.

export const ExcludeProperties = ["colorMode", "cssPrefix"]

export const ThemeCSSVar = (theme: DefaultThemeType): DefaultThemeType => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { colorMode, colors, ...sanitizedTheme } = theme as DefaultThemeType
	const FontPrefix = ["heading", "body", "code"]

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	CssVar(sanitizedTheme as IndexObject<any>, (node, root) => {
		if (FontPrefix.includes(node.key as string))
			SetProperty(`${node.parent?.key}-${node.key}`, node.val, root)
		else SetProperty(`${node.key}`, node.val, root)
	})

	return theme
}

export const ColorsCssVar = (colors: RequiredColorsType, isDark: boolean): void => {
	if (isDark) CssVar(colors.dark)
	else CssVar(colors.light)
}

export const DefaultColorsCssVar = (colors: IndexObject<unknown>): void => {
	CssVar(colors, (node, root) => {
		const pre = node.parent?.key

		if (pre) SetProperty(`${node.parent?.key}-${node.key}`, node.val, root)
		else SetProperty(`${node.key}`, node.val, root)
	})
}

export function CssVar(
	obj: Record<string, unknown>,
	Customizer?: (node: WalkNode, root: HTMLElement) => void
): void {
	const root = document.documentElement as HTMLElement
	if (!root)
		throw new Error("Document is not defined. Try calling the function inside a useEffect.")

	new WalkBuilder()
		.withSimpleCallback((node: WalkNode) => {
			if (node.nodeType === "value") {
				if (Customizer) Customizer(node, root)
				else SetProperty(node.key as string, node.val, root)
			}
		})
		.walk(obj)
}

const addCSSPrefix = (varName: string): string => {
	return `--${PREFIX}-${_.kebabCase(varName)}`
}

export const SetProperty = (varName: string, val: string, root: HTMLElement): void =>
	root.style.setProperty(addCSSPrefix(varName as string), `${val}`)

export const GetProperty = (varName: string, root: HTMLElement): string => {
	const computedStyle = getComputedStyle(root)
	return computedStyle.getPropertyValue(addCSSPrefix(varName))
}
