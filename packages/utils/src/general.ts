export function replaceAll(str: string, expr: string | string[] | RegExp): string {
	if (Array.isArray(expr)) {
		expr.forEach((itm) => {
			while (str.search(itm) != -1) str = str.replace(itm, "")
		})
	} else while (str.search(expr) != -1) str = str.replace(expr, "")

	return str
}
