import { Colors } from "../colors"

import type { DefaultThemeType } from "@seabedUI/types"

export const Theme: DefaultThemeType = {
	colorMode: "both",
	colors: {
		light: {
			primary: Colors.blue[200],
			secondary: Colors.gray[800],
			muted: Colors.white,
			accent: Colors.indigo[500],
		},
		dark: {
			primary: Colors.green[100],
			secondary: Colors.gray[800],
			muted: Colors.white,
			accent: Colors.indigo[500],
		},
	},
	breakpoints: {
		xs: 420,
		sm: 640,
		md: 768,
		lg: 1024,
		xl: 1280,
		"2xl": 1560,
	},
	States: {
		enabled: "",
		selected: "",
		focused: "",
		draggered: "",
		pressed: "",
		hover: "",
		muted: "",
	},
	borderRadius: 10,
	typography: {
		fontFamily: "'Ubuntu', sans-serif",
		fontSize: {
			xs: "0.5rem",
			sm: "0.75rem",
			md: "1rem",
			lg: "1.25rem",
			xl: "1.5rem",
			"2xl": "1.75rem",
			"3xl": "2rem",
			"4xl": "2.5rem",
			"5xl": "3rem",
			"6xl": "4rem",
			"7xl": "6rem",
			"8xl": "8rem",
			"9xl": "10rem",
		},
		fontWeight: {
			heading: 700,
			body: 400,
			code: 400,
		},
		letterSpacings: {
			heading: "0.05rem",
			body: "0.015rem",
			code: "0.05rem",
		},
		lineHeight: {
			heading: "2rem",
			body: 1.75,
			code: "2rem",
		},
	},
}
