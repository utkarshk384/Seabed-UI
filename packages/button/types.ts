import { DefaultPropsType, SchemeType } from "@seabedUI/types"
import { SizeType, VariantsType } from "@seabedUI/types"

type sharedProps = {
	isLoading?: boolean
	isActive?: boolean
	containerWidth?: boolean
}

type htmlAttributes = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">

export interface ButtonProps extends htmlAttributes, sharedProps, DefaultPropsType {
	loadingIcon?: React.ReactElement
	leftIcon?: React.ReactElement
	rightIcon?: React.ReactElement
	loadingText?: string
	color?: Omit<SchemeType, "muted">
	size?: Exclude<SizeType, number>
	variant?: VariantsType
}

export type Config = Required<sharedProps> & {
	size: string
	variant: string
}
