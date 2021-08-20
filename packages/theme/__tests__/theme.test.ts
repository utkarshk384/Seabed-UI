import { Dict, PaletteType } from "@seabedui/types"
import { ExtendTheme } from "../src"

it("Should extend and merge with the default theme", () => {
	const colorExtend: PaletteType = {
		accent: "Green",
		background: {
			primary: "",
			secondary: "",
		},
		text: {
			primary: "",
			secondary: "",
		},
		muted: "",
		states: {
			draggered: "accent",
			enabled: "accent",
			muted: "accent",
			hover: "accent",
			focused: "accent",
			pressed: "accent",
			selected: "accent",
		},
	}

	expect(
		(
			ExtendTheme({
				colorScheme: "dark",
				colors: {
					dark: colorExtend,
				},
			}) as Dict<Dict<string>>
		).colors.dark
	).toEqual(colorExtend)
})
