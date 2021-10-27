import { styled } from "@linaria/react"

import { ReactNode, useMemo } from "react"
import { DefaultProps } from "@seabedui/theme-utils"

import type { DefaultPropsInterface, DefaultSpacingType } from "@seabedui/types"

type PropsType = DefaultSpacingType & {
	style?: React.CSSProperties
	className?: string
	sx?: React.CSSProperties
	cx?: string
}

export const SeabedFactory: React.FC<PropsType> = (props) => {
	const { children } = useMemo(
		() => DefaultProps<DefaultPropsInterface & { children?: ReactNode }>(props),
		[props]
	)

	return <StyledBase {...props}>{children}</StyledBase>
}

const StyledBase = styled.p<DefaultSpacingType & { children?: ReactNode }>`
	font-size: 1rem;
`
