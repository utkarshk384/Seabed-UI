import path from "path"

import commonjs from "@rollup/plugin-commonjs"
import nodeResolve from "@rollup/plugin-node-resolve"
import typescript from "@rollup/plugin-typescript"
import css from "rollup-plugin-import-css";

/* 
	Consts
*/

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const PACKAGE_ROOT_PATH = process.cwd() //Current package root
export const pkgJSON = require(path.join(PACKAGE_ROOT_PATH, "./package.json")) // `package.json` of current package
export const ENV = process.env.BUILD //Current environment 

/* 
	Base
*/

/* Output */
export const BaseOutput = {
	cjs: {
		preserveModules: true,
		preserveModulesRoot: "src",		
		sourcemap: true,
		format: "cjs",
		exports: "named",
		name: pkgJSON.name,

	},
	esm: {
		preserveModules: true,
		preserveModulesRoot: "src",		
		sourcemap: true,
		format: "esm",
		exports: "named",
		name: pkgJSON.name,

	}
}

/* External */
//For avoiding node_modules folder in the final built bundle for `assets` package
export const BaseExternal = [
    "react", 					
	"react-dom",				
	"@linaria/core",			
	"@linaria/react",			
	"tslib",					
	"@emotion/is-prop-valid",	
	"@emotion/memoize",			
	"lodash",					
	"walkjs",					
	"react/jsx-runtime", 		
]



/* 
	Final
*/

/* Extensions */
export const extensions = [".ts", ".tsx"]

/* Plugins */
export const plugins = [
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


