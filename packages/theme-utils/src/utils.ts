import { useMemo } from "react"
import { useColorMode } from "@seabedui/color-mode"

import type { DefaultThemeType, Dict } from "@seabedui/types"

export function Memoizer<P = Dict, R = Dict>(
	action: (props: P, theme?: DefaultThemeType) => R
): (props: P, theme?: DefaultThemeType) => R {
	return function useMemoizer(props: P, theme?: DefaultThemeType): R {
		const [colorMode] = useColorMode()
		const dependencies: unknown[] = [props, colorMode]
		if (typeof theme !== "undefined") dependencies.push(theme)

		// eslint-disable-next-line react-hooks/exhaustive-deps
		return useMemo(() => action(props, theme), dependencies)
	}
}
