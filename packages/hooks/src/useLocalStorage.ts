/* 
	Custom Hook from @jefffjadukco
	https://github.com/jeffjadulco/jeffjadulco.com/blob/master/src/hooks/useSafeLocalStorage.ts
*/

import { useState } from "react"

type returnType<T = unknown> = [T, (val: T) => void]

export function useLocalStorage<T = unknown>(key: string, initialValue?: string): returnType<T> {
	const [valueProxy, setValueProxy] = useState<T>(() => {
		try {
			const value = window.localStorage.getItem(key)
			return value ? JSON.parse(value) : initialValue
		} catch {
			return initialValue
		}
	})

	const setValue = (value: T): void => {
		try {
			const VALUE = typeof value !== "string" ? JSON.stringify(value) : value

			window.localStorage.setItem(key, VALUE)
			setValueProxy(value)
		} catch {
			setValueProxy(value)
		}
	}

	return [valueProxy, setValue]
}
