import { forwardRef } from "react"

import { useTheme } from "@seabedui/theme"
import { styled } from "@linaria/react"
import { Spinner } from "@seabedui/assets"
import { MemoizedStyles, MemoizedClasses } from "./styles"

import type { ButtonProps } from "./types"
import type { DefaultThemeType } from "@seabedui/types"

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
	const {
		loadingText = "loading",
		isActive = false,
		isLoading = false,
		isDisabled = false,
		containerWidth = false,
		size = "md",
		color = "accent",
		textColor = "text.primary",
		textSize = "lg",
		variant = "solid",
		className,
		...htmlAttributes
	} = props

	const theme = useTheme() as DefaultThemeType

	const composedStyles = MemoizedStyles({ size, color, textColor, textSize }, theme)
	const classNames = MemoizedClasses(className)
	return (
		<StyledButton
			style={composedStyles}
			ref={ref}
			className={classNames}
			disabled={isLoading || (variant === "disabled" && true) || isDisabled}
			aria-disabled={isLoading || (variant === "disabled" && true) || isDisabled}
			data-emphasis={variant}
			data-active={isActive}
			aria-pressed={isActive}
			aria-busy={isLoading}
			data-loading={isLoading}
			{...htmlAttributes}
			containerWidth={containerWidth}
		>
			{props.leftIcon && !isLoading && props.leftIcon}
			{props.loadingIcon ? isLoading && props.loadingIcon : isLoading && <Spinner />}
			{isLoading ? loadingText : props.children}
			{props.rightIcon && !isLoading && props.rightIcon}
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
	border-radius: var(--sbu-border-radius);
	font-family: var(--sbu-font-family-heading);
	font-size: var(--size);

	/* 
		Beautifying Styles
	*/

	color: rgb(var(--text-color)); /* Inverted color using Invert function */
	outline: 10px solid transparent;
	outline-offset: -10px;

	/* 
		Stateful Styles
	*/

	&:active,
	&:focus {
		outline-offset: 0;
		outline-color: rgb(var(--color), 0.15);
	}
`
