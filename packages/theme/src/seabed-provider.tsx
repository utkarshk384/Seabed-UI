import React from "react"

import { Provider } from "./provider"

import { ColorModeProvider } from "@seabedui/color-mode"
import { Theme as DefaultTheme } from "@seabedui/theme-utils"

import type { DefaultThemeType, ThemeType } from "@seabedui/types"

export type Props = {
	theme?: ThemeType
}

export const SeabedProvider: React.FC<Props> = ({ theme = DefaultTheme, children }) => {
	return (
		<ColorModeProvider
			initialTheme={(theme as DefaultThemeType).initalColorMode}
			useSystemColors={(theme as DefaultThemeType).useSystemColors}
		>
			<Provider theme={theme as ThemeType}>{children}</Provider>
		</ColorModeProvider>
	)
}
