import React, { createContext, useContext, useEffect, useState } from "react"

import { useColorMode } from "@seabedui/color-mode"

import {
	MakeThemeCSSVar,
	MakeColorsCSSVars,
	NormalizeTheme,
	ApplyDefaults,
	ExtendTheme,
	SetTheme,
} from "./theme"
import { Theme as DefaultTheme } from "@seabedui/theme-utils"

import type { Props } from "./seabed-provider"
import type { DefaultThemeType, ThemeType, Component } from "@seabedui/types"

/* Seabed Context */
export const SeabedContext = createContext<ThemeType>(DefaultTheme as ThemeType)

/* Seabed Provider */
export const Provider: React.FC<Props> = ({ children, theme }) => {
	const [colorMode] = useColorMode()

	const [Theme, setTheme] = useState<ThemeType>(() => {
		//Merge `theme` with the default theme
		let _theme = ExtendTheme(theme as ThemeType)

		/* Set the `__colors` property of the theme  */
		_theme = SetTheme(_theme as DefaultThemeType, colorMode)

		//Normalize theme to remove unecessary theme ExcludeProperties
		_theme = NormalizeTheme(_theme as DefaultThemeType)

		return _theme
	})

	useEffect(() => {
		//Merge `theme` with the default theme
		let _theme = ExtendTheme(Theme as ThemeType)

		/* Set the `__colors` property of the theme  */
		_theme = SetTheme(_theme as DefaultThemeType, colorMode)

		//Normalize theme to remove unecessary theme ExcludeProperties
		_theme = NormalizeTheme(_theme as DefaultThemeType)

		MakeColorsCSSVars(Theme as DefaultThemeType, colorMode)

		setTheme(_theme)
	}, [Theme, colorMode])

	useEffect(() => {
		//Apply required styles to `document`
		ApplyDefaults(Theme as DefaultThemeType)

		//Create CSS Variables from theme
		MakeThemeCSSVar(Theme as DefaultThemeType)
	}, [Theme])

	return <SeabedContext.Provider value={Theme as ThemeType}>{children}</SeabedContext.Provider>
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
