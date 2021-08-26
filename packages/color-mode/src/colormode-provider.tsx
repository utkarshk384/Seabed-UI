import { useContext, createContext, useState } from "react"

import { usePrefersDarkMode } from "./usePrefersDarkMode"

import type { ColorSchemeType } from "@seabedui/types"

type colorModeType = ColorSchemeType

type ColorModeContextType = [
	colorMode: colorModeType,
	setColorMode: React.Dispatch<React.SetStateAction<ColorSchemeType<"">>>
]

type Props = {
	useSystemColors: boolean
	initialTheme: ColorSchemeType
}

/* Create Switcher Context */
export const ColorModeContext = createContext<ColorModeContextType>(["dark", () => ""])

export const ColorModeProvider: React.FC<Props> = ({
	children,
	useSystemColors = false,
	initialTheme,
}) => {
	const prefersDarkMode: ColorSchemeType = usePrefersDarkMode() ? "dark" : "light"

	const [colorMode, setColorMode] = useState(useSystemColors ? prefersDarkMode : initialTheme)

	return (
		<ColorModeContext.Provider value={[colorMode, setColorMode]}>
			{children}
		</ColorModeContext.Provider>
	)
}

export const useColorMode = (): ColorModeContextType => useContext(ColorModeContext)
