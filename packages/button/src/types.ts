import React from "react"

import type {
	DefaultPropsType,
	DefaultThemeType,
	SchemeType,
	ExtendedSizeType,
	SizeType,
} from "@seabedui/types"

type sharedProps = {
	size?: SizeType
	color?: SchemeType
	textColor?: SchemeType
	textSize?: ExtendedSizeType
}

export type VariantsType = "solid" | "outline" | "ghost" | "link" | "disabled"
export interface ButtonProps extends DefaultPropsType<HTMLButtonElement, "color">, sharedProps {
	isLoading?: boolean
	isActive?: boolean
	containerWidth?: boolean
	loadingIcon?: React.ReactElement
	leftIcon?: React.ReactElement
	rightIcon?: React.ReactElement
	loadingText?: string
	variant?: VariantsType
}

export type MemoizedStylesReturnType = (
	props: Required<sharedProps>,
	theme: DefaultThemeType
) => React.CSSProperties
