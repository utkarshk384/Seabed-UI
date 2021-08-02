import _ from "lodash"

import { Theme } from "../core/defaults/theme"

import type { DefaultThemeType, IndexObject, ThemeType } from "@seabedUI/types"

export function ExtendTheme(theme?: ThemeType): ThemeType {
	if (!theme) theme = Theme as ThemeType
	const defaultTheme: DefaultThemeType & IndexObject<unknown> = Theme

	//If default Theme is provided then return without any further modification
	if (_.isEqual(theme, defaultTheme)) return defaultTheme as ThemeType

	return _.mergeWith(defaultTheme, theme)
}
