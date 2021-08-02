import _ from "lodash"

import { DefaultFont } from "@seabedUI/core/defaults"
import { ParseBorderRadiusSize } from "@seabedUI/utils"
import { Theme } from "../core/defaults/theme"

import type { DefaultThemeType, IndexObject, ThemeType } from "@seabedUI/types"

export function ExtendTheme(theme?: ThemeType): ThemeType {
	if (!theme) theme = Theme as ThemeType
	const defaultTheme: DefaultThemeType & IndexObject<unknown> = Theme

	//If default Theme is provided then return without any further modification
	if (_.isEqual(theme, defaultTheme)) return defaultTheme as ThemeType

	return _.mergeWith(defaultTheme, theme)
}

export function ApplyTheme(theme: DefaultThemeType): void {
	if (typeof document === "undefined")
		throw new Error("Window is undefined. Try calling the function inside of a useEffect")

	const { typography } = theme

	//Load default font if `fontFamily` isn't specified
	if (
		typeof typography?.fontFamily === "string" &&
		typography.fontFamily === "'Ubuntu', sans-serif"
	)
		DefaultFont()
}

export function NormalizeTheme(theme: DefaultThemeType): DefaultThemeType {
	//Convert border Radius to `rem` if it's not done
	theme.borderRadius = ParseBorderRadiusSize(theme.borderRadius as string)

	//If the type of `fontFamily` is string, convert it to `FontType` notation
	const fontFamily = theme.typography.fontFamily
	if (typeof fontFamily === "string") {
		theme.typography.fontFamily = {
			heading: fontFamily,
			body: fontFamily,
			code: fontFamily,
		}
	}

	return theme
}
