import { Memoizer, ParseSizes, classnames } from "@seabedui/utils"

import type { Dict } from "@seabedui/types"

import type { ButtonGroupStyles } from "../types"

export const useClasses = Memoizer<string | undefined>((className) => {
	const classNames = classnames(className)

	return classNames
})

export const useStyles = Memoizer<Required<ButtonGroupStyles>, Dict>((props) => {
	const gap = ParseSizes(props.gap)

	if (gap.error) throw gap.error

	return {
		"--gap": gap.data as string,
	}
})
