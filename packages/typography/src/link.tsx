import { forwardRef } from "react"
import { styled } from "@linaria/react"
import { useTheme } from "@seabedui/theme"
import { ExternalLink } from "@seabedui/icons"

import { useStyles, baseStyles } from "./componentStyles"

import type { LinkPropsInterface, LinkPropsType, StyledLinkType } from "./types"
import type { DefaultThemeType } from "@seabedui/types"

export const Link: React.FC<LinkPropsType> = forwardRef<HTMLAnchorElement, LinkPropsType>(
	(props, ref) => {
		const {
			externalLink = false,
			target = "_self",
			textDecoration = "underline",
			display = "inline",
			textTransform = "none",
			textAlign = "left",
			fontFamily = "body",
			fontWeight = "body",
			lineHeight = "body",
			letterSpacing = "body",
			color = "text.primary",
			...htmlAttributes
		} = props

		const theme = useTheme() as DefaultThemeType
		const styles = useStyles(
			{ color, fontFamily, fontWeight, letterSpacing, lineHeight, fontSize: props.fontSize },
			theme
		)

		/* TODO: Make it accessible to be used with react router. */
		if (props.wrapper) {
			const Wrapper = props.wrapper
			return (
				<Wrapper>
					<StyledLink
						as="a"
						ref={ref}
						target={target}
						display={display}
						textAlign={textAlign}
						textTransform={textTransform}
						textDecoration={textDecoration}
						style={{ ...styles }}
						rel={externalLink ? "noreferrer nofollow" : undefined}
						{...htmlAttributes}
					>
						{props.children}
						{externalLink && (
							<ExternalLink role="img" aria-label="External Link Icon" height={16} width={16} />
						)}
					</StyledLink>
				</Wrapper>
			)
		}

		return (
			<StyledLink
				as="a"
				ref={ref}
				target={target}
				display={display}
				textAlign={textAlign}
				textTransform={textTransform}
				textDecoration={textDecoration}
				style={{ ...styles }}
				rel={externalLink ? "noreferrer nofollow" : undefined}
				{...htmlAttributes}
			>
				{props.children}
				{externalLink && (
					<ExternalLink role="img" aria-label="External Link Icon" height={16} width={16} />
				)}
			</StyledLink>
		)
	}
)

Link.displayName = "Link"

const StyledLink = styled.a<LinkPropsInterface>`
	/* Base */
	${baseStyles}

	/* Extra Styling */
	cursor: pointer;
	display: ${({ display }) => display};
	text-align: ${({ textAlign }) => textAlign};
	text-decoration: ${({ textDecoration }) => textDecoration};
	text-transform: ${({ textTransform }) => textTransform};
	font-style: ${({ italic }) => (italic ? "italic" : "normal")};

	&:hover {
		color: rgb(var(--hover));
	}

	&:active {
		color: rgb(var(--active));
	}

	&:visited {
		color: rgb(var(--visited));
	}
` as StyledLinkType
