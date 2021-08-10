import path from "path"
import commonjs from "@rollup/plugin-commonjs"
import nodeResolve from "@rollup/plugin-node-resolve"
import typescript from "@rollup/plugin-typescript"
import css from "rollup-plugin-import-css";

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

/* Get dir for current folder */
const dir = {
	module: pkgJSON.module.split("/"),
	main: pkgJSON.main.split("/"),
}

for (const key in dir) {
	dir[key].pop()
	dir[key][0] = "./dist"
	dir[key] = dir[key].join("/")
}

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
		dir: dir.main,
		name: pkgJSON.name,
		format: "cjs",
		exports: "named",
		sourcemap: true,
		preserveModules: true,
		preserveModulesRoot: "src",		

	},
	{
		dir: dir.module,
		name: pkgJSON.name,
		format: "esm",
		exports: "named",
		sourcemap: true,
		preserveModules: true,
		preserveModulesRoot: "src",		
	}
]


/* Plugins */
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
]


/* Watch */
const watch = {
	include: "./src"
}


/* 
	Main Config
*/
const config = {
	input: path.join(PACKAGE_ROOT_PATH, "./src/index.ts"),
	output,
	plugins,
	external,
	watch,
}


/* 
	ENV: Development
*/

if(ENV === "development"){
	console.log("Hit")
	config.output[0].dir = path.join(PACKAGE_ROOT_PATH, "../../.build/cjs")
	config.output[1].dir = path.join(PACKAGE_ROOT_PATH, "../../.build/esm")
}


/* 
	ENV: Production
*/
if(ENV === "production"){
	delete config.watch
	config.external = [...config.external, ...pkgDep]
}


export default config
