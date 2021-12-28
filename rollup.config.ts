import path from "path"

import commonjs from "@rollup/plugin-commonjs"
import nodeResolve from "@rollup/plugin-node-resolve"
import typescript from "@rollup/plugin-typescript"
import css from "rollup-plugin-import-css"


/* 
	******
	Consts
	******
*/

// eslint-disable-next-line @typescript-eslint/no-var-requires
const PACKAGE_ROOT_PATH = process.cwd() //Current package root
const pkgJSON = require(path.join(PACKAGE_ROOT_PATH, "./package.json")) // `package.json` of current package
const ENV = process.env.BUILD //Current environment 


/* 
	*******
	Helpers
	*******
*/


/* External Dependencies from `package.json` */
const pkgDep = [];

if(pkgJSON.devDependencies) Object.keys(pkgJSON.devDependencies).forEach(key => pkgDep.push(key))
if(pkgJSON.dependencies) Object.keys(pkgJSON.dependencies).forEach(key => pkgDep.push(key))

/* Extensions */
const extensions = [".ts", ".tsx"]


/* 
	*************
	Config Options
	*************
*/

/* Output */
const output = [
	{
		dir: `${PACKAGE_ROOT_PATH}/dist`,
		name: pkgJSON.name,
		format: "commonjs",
		sourcemap: true,
		preserveModules: true,
		preserveModulesRoot: "src",		
	}
]


/* Plugins */
const plugins = [
	typescript({ tsconfig: "./tsconfig.json" }),
	nodeResolve({
		mainFields: ["main"],
		dedupe: ["@seabedui/core"],
		exportConditions: ["require", "node"],
		moduleDirectories: ["node_modules", "../**"],
		extensions,
	}),
	css({minify: true, output: "normalize.css"}),
	commonjs({ requireReturnsDefault : true}),
]


/* External Dependencies */
const external = [
	//For avoiding node_modules folder in the final built bundle for `assets` package
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
	"@testing-library/react",
	"jest",
	"react-dom/test-utils",
	"ansi-styles",
	"ansi-regex" 		
]

/* 
	Main Config
*/
const config = {
	input: path.join(PACKAGE_ROOT_PATH, "./src/index.ts"),
	output,
	plugins,
	external,
}


/* 
	ENV: Production
*/
if(ENV === "production")
	config.external = [...config.external, ...pkgDep]



export default config
