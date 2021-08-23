import React from "react"

import type {
	DefaultPropsType,
	DefaultThemeType,
	SchemeType,
	ExtendedSizeType,
	SizeType,
	SpacingType,
} from "@seabedui/types"

export type SharedStylesProps = {
	size?: SizeType
	color?: SchemeType
	textColor?: SchemeType
	textSize?: ExtendedSizeType
}

/**
 * Button Variants
 */
export type VariantsType = "solid" | "outline" | "ghost" | "link" | "disabled"

/**
 * Button Props
 */
export interface ButtonProps
	extends DefaultPropsType<HTMLButtonElement, "color">,
		SharedStylesProps {
	isLoading?: boolean
	isDisabled?: boolean
	containerWidth?: boolean
	loadingIcon?: React.ReactElement
	leftIcon?: React.ReactElement
	rightIcon?: React.ReactElement
	loadingText?: string
	variant?: VariantsType
}

/**
 * Button Styles
 */
export type MemoizedStylesReturnType = (
	props: Required<SharedStylesProps>,
	theme: DefaultThemeType
) => React.CSSProperties

/**
 * Button Group Styles
 */
export type ButtonGroupStyles = { gap?: SpacingType }

/**
 * Button Group Props
 */
export interface ButtonGroupProps
	extends DefaultPropsType<HTMLDivElement, "direction">,
		ButtonGroupStyles {
	direction?: "row" | "column"
}
