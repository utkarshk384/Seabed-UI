import { useEffect, useState } from "react"

import { usePrefersDarkMode } from "./usePrefersDarkMode"

type returnType<T = boolean> = [boolean, (val: T) => void]

export function useDarkMode(): returnType {
	const prefersDarkMode = usePrefersDarkMode()
	const [isDark, setDark] = useState(prefersDarkMode)

	useEffect(() => {
		if (window === undefined) return
		const root = window.document.documentElement

		root.classList.remove(isDark ? "sbu-light" : "sbu-dark")
		root.classList.add(isDark ? "sbu-dark" : "sbu-light")

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isDark])

	useEffect(() => {
		if (window === undefined) return
		setDark(prefersDarkMode)

		const root = window.document.documentElement
		root.classList.remove(prefersDarkMode ? "sbu-light" : "sbu-dark")
		root.classList.add(prefersDarkMode ? "sbu-dark" : "sbu-light")
	}, [prefersDarkMode])

	return [isDark, setDark]
}
