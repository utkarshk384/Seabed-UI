export type SizeType = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "full" | number

export type VariantsType = "solid" | "outline" | "ghost" | "link" | "disabled"

// https://stackoverflow.com/a/53050575/10973712

export type IndexObject<T = string> = Record<string, T>
