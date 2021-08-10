import _ from "lodash"

import { Theme } from "./defaults"

import type { DefaultThemeType, Dict, ThemeType } from "@seabedui/types"

export function ExtendTheme(theme?: ThemeType): ThemeType {
	if (!theme) theme = Theme as ThemeType
	const defaultTheme: DefaultThemeType & Dict<unknown> = Theme

	//If default Theme is provided then return without any further modification
	if (_.isEqual(theme, defaultTheme)) return defaultTheme as ThemeType

	return _.mergeWith(defaultTheme, theme)
}
