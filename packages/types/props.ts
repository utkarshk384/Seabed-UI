import React from "react"
import { SchemeType } from "./colors"

type OmitItems = "color" | "translate"

export type DefaultPropsType = Omit<React.CSSProperties, OmitItems> & {
	bg?: SchemeType
}
