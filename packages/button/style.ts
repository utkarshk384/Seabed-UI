import { IndexObject } from "@seabedUI/types"
import { classNames } from "@seabedUI/utils"
import styles from "./button.module.scss"

import type { Config } from "./types"

const useClasses = (config: Config): string => {
	const variants: IndexObject = {
		solid: styles["btn-solid"],
		outline: styles["btn-outline"],
		ghost: styles["btn-ghost"],
		link: styles["btn-link"],
		disabled: styles["btn-disabled"],
	}

	const size: IndexObject = {
		xs: styles["btn-xs"],
		sm: styles["btn-sm"],
		md: styles["btn-md"],
		lg: styles["btn-lg"],
		xl: styles["btn-xl"],
		"2xl": styles["btn-2xl"],
	}

	const loading = config.isLoading ? styles["btn-disabled"] : ""
	const active = config.isActive ? styles["btn-active"] : ""
	const fullwidth = config.containerWidth ? styles["btn-full"] : ""

	const classes = classNames(
		variants[config.variant],
		size[config.size],
		loading,
		active,
		fullwidth
	)

	return classes
}

export default useClasses
