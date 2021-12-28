import { ColorsCSSVar } from "./helpers"

import core from "@seabedui/core"

const colors = ColorsCSSVar(["primary", "secondary", "accent"])

export default {
	theme: {
		extend: {
			colors: {
				...colors,
			},
		},
	},
	plugins: [core],
}
