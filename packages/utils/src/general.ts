import { Dict } from "@seabedui/types"

export function replaceAll(str: string, expr: string | string[] | RegExp): string {
	if (Array.isArray(expr)) {
		expr.forEach((itm) => {
			while (str.search(itm) != -1) str = str.replace(itm, "")
		})
	} else while (str.search(expr) != -1) str = str.replace(expr, "")

	return str
}

export function flattenObject<T>(
	obj: Dict<unknown>,
	parent?: string,
	res: Dict<unknown> = {}
): Dict<T> {
	for (const key in obj) {
		const propName = parent ? parent + "-" + key : key
		if (typeof obj[key] == "object") {
			flattenObject<T>(obj[key] as Dict<unknown>, propName, res)
		} else {
			res[propName] = obj[key]
		}
	}
	return res as Dict<T>
}
