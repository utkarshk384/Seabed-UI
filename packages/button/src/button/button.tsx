import { forwardRef, useRef } from "react"
import { styled } from "@linaria/react"

import { Spinner } from "@seabedui/spinner"
import { useTheme } from "@seabedui/theme"
import { DefaultProps } from "@seabedui/theme-utils"
import { useMergeRefs } from "@seabedui/utils"
import { useStyles, useClasses } from "./styles"

import type { ButtonProps } from "../types"
import type { DefaultThemeType } from "@seabedui/types"

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
	props = DefaultProps(props)
	const {
		spinner = <Spinner />,
		loadingText = "loading",
		isLoading = false,
		isDisabled = false,
		containerWidth = false,
		fontFamily = "heading",
		size = "md",
		color = "accent",
		textColor = "text.primary",
		textSize = "lg",
		variant = "solid",
		className,
		...htmlAttributes
	} = props

	const theme = useTheme() as DefaultThemeType
	const btnRef = useRef(null)

	const composedStyles = useStyles({ size, color, textColor, textSize, fontFamily }, theme)
	const classNames = useClasses(className)

	return (
		<StyledButton
			style={composedStyles}
			ref={useMergeRefs(ref, btnRef)}
			className={classNames}
			disabled={isLoading || (variant === "disabled" && true) || isDisabled}
			aria-disabled={isLoading || (variant === "disabled" && true) || isDisabled}
			data-emphasis={variant}
			aria-busy={isLoading}
			data-loading={isLoading}
			containerWidth={containerWidth}
			{...htmlAttributes}
		>
			{isLoading ? props.spinnerPosition === "start" && spinner : props.leftIcon && props.leftIcon}

			{isLoading ? loadingText : <span>{props.children}</span>}

			{isLoading ? props.spinnerPosition === "end" && spinner : props.rightIcon && props.rightIcon}
		</StyledButton>
	)
})

Button.displayName = "Button"

const StyledButton = styled.button<ButtonProps>`
	/* 
		Base Styles
	*/
	position: relative;
	width: ${(props) => (props.containerWidth ? "100%" : "auto")};
	padding: var(--padding);
	background: transparent;
	cursor: pointer;
	border: none;
	border-radius: var(--border-radius);
	font-family: var(--font-family);
	font-size: var(--size);

	/* 
		Beautifying Styles
	*/

	color: rgb(var(--text-color));
	outline: 10px solid transparent;
	outline-offset: -10px;

	/* 
		Stateful Styles
	*/

	&:active,
	&:focus {
		outline-offset: 0;
		outline-color: rgb(var(--bg-color), 0.15);
	}
`
