import React from "react"
import { styled } from "@linaria/react"

import { DefaultProps } from "@seabedui/theme-utils"

import { useStyles, useClasses } from "./style"

import type { ButtonGroupProps } from "../types"

const ButtonGroup: React.FC<ButtonGroupProps> = (props) => {
	const { direction = "row", gap = "10", ...htmlAttributes } = DefaultProps(props)

	const styles = useStyles({ gap })
	const classNames = useClasses(props.className as string)

	return (
		<StyledButtonGroup
			className={classNames}
			style={styles}
			direction={direction}
			gap={gap}
			{...htmlAttributes}
		>
			{props.children}
		</StyledButtonGroup>
	)
}

const StyledButtonGroup = styled.div<ButtonGroupProps>`
	display: flex;
	flex-direction: ${(props) => props.direction as string};
	margin: ${(props) => props.m as string};
	margin-top: ${(props) => props.mt as string};
	margin-right: ${(props) => props.mr as string};
	margin-bottom: ${(props) => props.mb as string};
	margin-left: ${(props) => props.ml as string};
	padding: ${(props) => props.p as string};
	padding-top: ${(props) => props.pt as string};
	padding-right: ${(props) => props.pr as string};
	padding-bottom: ${(props) => props.pb as string};
	padding-left: ${(props) => props.pl as string};

	& > * {
		margin-right: ${(props) => props.gap as string};
	}
	&:last-child {
		margin-right: 0;
	}
`

export { ButtonGroup }
