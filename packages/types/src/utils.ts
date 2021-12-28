import { CSSType } from "./general"

export type Styled = (css: TemplateStringsArray, ...args: string[]) => CSSType

export type sourceType = {
	file?: string
	code?: string
	dir?: string
}

export type ParseCSS = (source: sourceType) => CSSType
