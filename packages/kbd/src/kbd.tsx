import React from "react"
import { styled } from "@linaria/react"
import {} from "@seabedui/typography" // This causes styled to not work

import type { Dict } from "@seabedui/types"

type Props = Dict

export const Kbd: React.FC<Props> = React.forwardRef<HTMLElement, Props>((props, ref) => {
	return <StyledKbd ref={ref}>{props.children}</StyledKbd>
})

Kbd.displayName = "Kbd"

const StyledKbd = styled.kbd``
