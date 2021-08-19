import React, { createContext, useContext, useEffect, useMemo } from "react"

import { Colors } from "@seabedui/utils"
import { useDarkMode } from "@seabedui/hooks"

import {
	MakeThemeCSSVar,
	DefaultColorsCssVar,
	ApplyDefaultsColors,
	NormalizeTheme,
	ApplyDefaults,
	ExtendTheme,
	SetTheme,
} from "./theme"
import { Theme } from "./defaults"

import type { DefaultThemeType, ThemeType, Component } from "@seabedui/types"

export type Props = {
	theme?: ThemeType
}

/* Seabed Context */
export const SeabedContext = createContext<ThemeType>(Theme as ThemeType)

/* Seabed Provider */
export const SeabedProvider: React.FC<Props> = ({ children, theme = Theme }) => {
	//Hook to determine the color Mode
	const [isDark] = useDarkMode()

	/* 
		Memoized version of the the theme that is merged with the default theme.
	*/
	const FinalTheme = useMemo(() => {
		//Merge `theme` with the default theme
		let mergedTheme = ExtendTheme(theme as ThemeType)

		mergedTheme = SetTheme(mergedTheme as DefaultThemeType, isDark)

		return mergedTheme
	}, [theme, isDark])

	useEffect(() => {
		//Set the `__colors` property of the theme
		ApplyDefaultsColors(FinalTheme as DefaultThemeType, isDark)
	}, [isDark, FinalTheme])

	useEffect(() => {
		//Apply required styles to `document`
		ApplyDefaults(FinalTheme as DefaultThemeType)

		//Normalize theme to remove unecessary theme ExcludeProperties
		const normalizedTheme = NormalizeTheme(FinalTheme as DefaultThemeType)

		//Create CSS Variables from theme
		MakeThemeCSSVar(normalizedTheme)
	}, [FinalTheme])

	/* 
		Make CSS Variables from default colors
	*/
	useEffect(() => {
		DefaultColorsCssVar(Colors, theme.cssPrefix as string)
	}, [theme.cssPrefix])

	return <SeabedContext.Provider value={FinalTheme as ThemeType}>{children}</SeabedContext.Provider>
}

/**
 *
 * @returns { ThemeType }
 * Custom hook for using the theme with react
 */
export const useTheme = (): Readonly<ThemeType> => {
	const theme = useContext(SeabedContext)
	if (!theme) throw new Error("`useTheme` can't be used outside of  `<SeabedProvider />`")

	return theme
}

/**
 *
 * @param Component
 * A HOC Component that includes the theme object as props
 *
 */
export const withTheme = <T,>(Component: Component<T>): Component<T> => {
	const NewComponent: Component<T> = (props) => {
		const theme = useTheme() as DefaultThemeType

		return <Component {...props} theme={theme} />
	}
	return NewComponent
}
