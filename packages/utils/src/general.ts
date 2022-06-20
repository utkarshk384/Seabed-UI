import { Dict } from "@seabedui/types"

export function replaceAll(str: string, expr: string | RegExp, replace: string): string {
	while (str.search(expr) != -1) str = str.replace(expr, replace)

	return str
}

export function flattenObject<T>(obj: Dict<unknown>): Dict<T> {
	return _flattenObject(obj)
}

export function _flattenObject<T>(
	obj: Dict<unknown>,
	parent?: string,
	res: Dict<unknown> = {}
): Dict<T> {
	for (const key in obj) {
		const propName = parent ? parent + "-" + key : key
		if (typeof obj[key] == "object" && !Array.isArray(obj[key])) {
			_flattenObject<T>(obj[key] as Dict<unknown>, propName, res)
		} else {
			res[propName] = obj[key]
		}
	}
	return res as Dict<T>
}
