import { createContext, useContext, useEffect, useMemo } from "react"

import { Colors, ExtendTheme } from "@seabedUI/core"
import { useDarkMode } from "@seabedUI/hooks"
import { Theme } from "../core/defaults/theme"
import { NormalizeTheme, ApplyTheme } from "./theme"
import { ThemeCSSVar, DefaultColorsCssVar, ColorsCssVar } from "./css-var"

import type { DefaultThemeType, RequiredColorsType, ThemeType } from "@seabedUI/types"

export const SeabedContext = createContext<ThemeType>(Theme as ThemeType)

export type Props = {
	theme?: ThemeType
}

export const SeabedProvider: React.FC<Props> = ({ children, theme = Theme }) => {
	//Hook to determine the color Mode
	const [isDark] = useDarkMode()

	/* 
		Memoized version of the the theme that is merged with the default theme.
	*/
	const FinalTheme = useMemo(() => {
		//Merge `theme` with the default theme
		const mergedTheme = ExtendTheme(theme as ThemeType)

		return mergedTheme
	}, [theme])

	/* 
		Side effect when colorMode changes.	
	*/
	useEffect(() => {
		ColorsCssVar(FinalTheme.colors as RequiredColorsType, isDark)
	}, [FinalTheme.colors, isDark])

	useEffect(() => {
		//Apply required styles to `document`
		ApplyTheme(FinalTheme as DefaultThemeType)

		//Normalize theme to remove unecessary theme ExcludeProperties
		const normalizedTheme = NormalizeTheme(FinalTheme as DefaultThemeType)

		//Create CSS Variables from theme
		ThemeCSSVar(normalizedTheme)
	}, [FinalTheme])

	/* 
		Make CSS Variables from default colors
	*/
	useEffect(() => {
		DefaultColorsCssVar(Colors)
	}, [])

	return <SeabedContext.Provider value={FinalTheme as ThemeType}>{children}</SeabedContext.Provider>
}

export const useTheme = (): ThemeType => {
	const theme = useContext(SeabedContext)
	if (!theme) throw new Error("`useTheme` can't be used outside of  `<SeabedProvider />`")

	return theme
}
