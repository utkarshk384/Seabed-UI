import type {
	DefaultPropsType,
	FontType,
	FontSizeType,
	SchemeType,
	CSSProperties,
	StyledComponent,
} from "@seabedui/types"

export type SharedStyledProps = {
	italic?: boolean
	display: CSSProperties.Display
	textAlign: CSSProperties.TextAlign
	textTransform: CSSProperties.TextTransform
	textDecoration: CSSProperties.TextDecorationLine | CSSProperties.TextDecorationStyle
}

export type SharedStylesProps = {
	color: SchemeType
	fontWeight: FontType
	fontFamily: FontType
	lineHeight: FontType | number
	fontSize?: FontSizeType | number
	letterSpacing: FontType | number
}

export type TextPropsInterface = {
	as?:
		| "blockquote"
		| "h1"
		| "h2"
		| "h3"
		| "h4"
		| "h5"
		| "h6"
		| "p"
		| "span"
		| "b"
		| "i"
		| "u"
		| "sub"
		| "sup"
		| "mark"
		| "small"

	lineClamp?: number
} & SharedStyledProps

export type TextPropsType = DefaultPropsType<HTMLHeadingElement> &
	Partial<SharedStylesProps> &
	Partial<TextPropsInterface>

export type LinkPropsInterface = {
	target?: "_blank" | "_parent" | "_self"
	externalLink?: boolean
	wrapper?: React.FC
} & SharedStyledProps

export type LinkPropsType = DefaultPropsType<HTMLAnchorElement> &
	Partial<SharedStylesProps> &
	Partial<LinkPropsInterface> & { href: string }

export type StyledLinkType = StyledComponent<
	React.ClassAttributes<HTMLAnchorElement> &
		React.AnchorHTMLAttributes<HTMLAnchorElement> &
		LinkPropsInterface
>
