import { classnames, ThrowError } from "@seabedui/utils"
import { Memoizer, ParseSizes } from "@seabedui/theme-utils"

import type { Dict } from "@seabedui/types"

import type { ButtonGroupStyles } from "../types"

export const useClasses = Memoizer<string | undefined>((className) => {
	const classNames = classnames(className)

	return classNames
})

export const useStyles = Memoizer<Required<ButtonGroupStyles>, Dict>((props) => {
	const [gap, err] = ParseSizes(props.gap)

	if (err) throw ThrowError(err)

	return {
		"--gap": gap as string,
	}
})
