import { useEffect, KeyboardEvent, useState } from "react"

import type { Dict, KeyboardButtons } from "@seabedui/types"

type ResolvedKeys = {
	key: string | null
	shiftKey: boolean
	altKey: boolean
	ctrlKey: boolean
	metaKey: boolean
}

const resolveKeys = (keyPressed: KeyboardButtons[], e: KeyboardEvent): ResolvedKeys => {
	const resolvedKeys: ResolvedKeys = {
		key: null,
		altKey: false,
		shiftKey: false,
		ctrlKey: false,
		metaKey: false,
	}

	keyPressed.forEach((key) => {
		if (key === "ctrl" && e.ctrlKey) resolvedKeys.ctrlKey = true
		else if (key === "shift" && e.shiftKey) resolvedKeys.shiftKey = true
		else if (key === "alt" && e.altKey) resolvedKeys.altKey = true
		else if (key === "windows/command" && e.metaKey) resolvedKeys.metaKey = true
		else if (key === "space") resolvedKeys.key = " "

		if (resolvedKeys.key === null) resolvedKeys.key = key
		else throw new Error(`Only one key can be pressed at a time.`)
	})

	const keys = []
	Object.keys(resolvedKeys).forEach((key) => {
		if (key !== "key" && (resolvedKeys as Dict<unknown>)[key]) keys.push(key)
	})

	if (keys.length > 1) throw new Error("Only one Modifier key can be used at a time")

	return resolvedKeys
}

export const useKeyPress = (keyPressed: KeyboardButtons[]): boolean => {
	const [key, setKey] = useState(false)
	useEffect(() => {
		const handleKeyPress = (event: Event): void => {
			const e = event as unknown as KeyboardEvent
			const resolveKeyPress = resolveKeys(keyPressed, e)

			if (
				e.key === resolveKeyPress.key &&
				(resolveKeyPress.altKey ||
					resolveKeyPress.ctrlKey ||
					resolveKeyPress.metaKey ||
					resolveKeyPress.shiftKey) &&
				e.key === resolveKeyPress.key
			)
				if (e.type === "keydown") setKey(true)
				else if (e.type === "keyup") setKey(false)
		}

		window.addEventListener("keyup", handleKeyPress)
		window.addEventListener("keydown", handleKeyPress)

		return () => {
			window.removeEventListener("keyup", handleKeyPress)
			window.removeEventListener("keydown", handleKeyPress)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return key
}
