import path from "path"
import commonjs from "@rollup/plugin-commonjs"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import typescript from "@rollup/plugin-typescript"
import css from "rollup-plugin-import-css";

const PACKAGE_ROOT_PATH = process.cwd()

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkgJSON = require(path.join(PACKAGE_ROOT_PATH, "./package.json"))

const dir = {
	module: pkgJSON.module.split("/"),
	main: pkgJSON.main.split("/"),
}

const dep = [];
const devDep = []

if(pkgJSON.devDependencies) Object.keys(pkgJSON.devDependencies).forEach(key => dep.push(key))
if(pkgJSON.dependencies) Object.keys(pkgJSON.dependencies).forEach(key => dep.push(key))

for (const key in dir) {
	dir[key].pop()
	dir[key][0] = "./dist"
	dir[key] = dir[key].join("/")
}

const output = [
	{
		dir: dir.main,
		preserveModules: true,
		preserveModulesRoot: "src",
		format: "cjs",
		sourcemap: true,
		exports: "named",
		name: pkgJSON.name,
	},
	{
		dir: dir.module,
		preserveModules: true,
		preserveModulesRoot: "src",
		format: "esm",
		sourcemap: true,
		exports: "named",
		name: pkgJSON.name,
	},
]

const watch = {
	include: "../**"
}

const extensions = [".ts", ".tsx"]

const plugins = [
	typescript({ tsconfig: "./tsconfig.json" }),
	nodeResolve({
		mainFields: ["module", "main"],
		dedupe: ["@seabedui/core"],
		exportConditions: ["require", "node"],
		moduleDirectories: ["node_modules"],
		extensions,
	}),
	css({minify: true, output: "normalize.css"}),
	commonjs(),
]

const external = [
	...dep,
	...devDep,
	"react", 					//		 For 
	"react-dom",				//		 avoiding 
	"@linaria/core",			//		 node_modules 
	"@linaria/react",			//		 folder 
	"tslib",					//		 in 
	"@emotion/is-prop-valid",	//		 the
	"@emotion/memoize",			//		 final
	"lodash",					//		 built	
	"walkjs",					//		 bundle
	"react/jsx-runtime", 		//		 For `assets` package
]

const config = {
	input: path.join(PACKAGE_ROOT_PATH, "./src/index.ts"),
	output,
	plugins,
	watch,
	external,
}

export default config
