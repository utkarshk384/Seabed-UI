import { Colors, PREFIX } from "@seabedui/utils"

import type { DefaultThemeType } from "@seabedui/types"

export const Theme: DefaultThemeType = {
	colorScheme: "both",
	__prefix: PREFIX,
	__colors: {
		background: {
			primary: Colors.green[100],
			secondary: Colors.gray[800],
		},
		text: {
			primary: Colors.green[100],
			secondary: Colors.gray[800],
		},
		states: {
			enabled: "accent",
			selected: "accent",
			focused: "accent",
			draggered: "accent",
			active: "accent",
			visited: "accent",
			hover: "accent",
			disabled: "accent",
		},
		muted: Colors.white,
		accent: Colors.indigo[500],
	},
	colors: {
		light: {
			background: {
				primary: Colors.white,
				secondary: Colors.gray[200],
			},
			text: {
				primary: Colors.gray[900],
				secondary: Colors.gray[800],
			},
			states: {
				enabled: "accent",
				selected: "accent",
				focused: "accent",
				draggered: "accent",
				active: "accent",
				hover: "accent",
				disabled: "accent",
				visited: "accent",
			},
			accent: Colors.blue[500],
			muted: Colors.gray[400],
		},
		dark: {
			background: {
				primary: Colors.gray[800],
				secondary: Colors.gray[900],
			},
			text: {
				primary: Colors.white,
				secondary: Colors.gray[200],
			},
			states: {
				enabled: "accent",
				selected: "accent",
				focused: "accent",
				draggered: "accent",
				active: "accent",
				hover: "accent",
				disabled: "accent",
				visited: "accent",
			},
			accent: Colors.blue[500],
			muted: Colors.gray[400],
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
		letterSpacingTypes: {
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
