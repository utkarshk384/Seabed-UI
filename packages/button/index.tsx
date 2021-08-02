import { classNames } from "@seabedUI/utils"
import { forwardRef } from "react"

import Spinner from "../assets/spinner"
import styles from "./button.module.scss"
import useClasses from "./style"

import type { ButtonProps } from "./types"

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
	const {
		rightIcon,
		leftIcon,
		loadingIcon,
		loadingText,
		isActive = false,
		isLoading = false,
		containerWidth = false,
		size = "md",
		color = "primary",
		variant = "solid",
		className,
		...rest
	} = props

	const classes = useClasses({ isActive, containerWidth, isLoading, variant, size })
	return (
		<div className={styles["btn-wrapper"]}>
			<button
				ref={ref}
				className={classNames(styles.btn, classes, className, styles["btn-solid"])}
				disabled={isLoading || variant === "disabled" ? true : false}
				data-active={isActive && true}
				data-color={color}
				data-disabled={variant === "disabled" || (isLoading && true)}
				{...rest}
			>
				{leftIcon && !isLoading && leftIcon}
				{loadingIcon ? isLoading && loadingIcon : isLoading && <Spinner />}
				{isLoading ? loadingText : props.children}
				{rightIcon && !isLoading && rightIcon}
			</button>
		</div>
	)
})

Button.displayName = "Button"
