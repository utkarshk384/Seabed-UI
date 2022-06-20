const fs = require("fs")
const os = require('os')
const glob = require("glob") 
const ParseCSS = require("@seabedui/utils").ParseCSS

/* Remove compiled folder */
const REMOVE_COMPILED_FOLDER = true;


/* Template for typescript declaration types */
const DECLARATION_TYPE = `
declare module "@seabedui/components" {
	import type { CSSType } from "@seabedui/types"
	const styles = {
		base: CSSType,
		components: CSSType,
		reset: CSSType,
		utilities: CSSTyped
	}

	export default styles
}

`
/* Template for ./dist/index.js  */
const INDEX_JS = `
const componentStyles = require('./components.json')
const baseStyles = require('./base.json')
const resetStyles = require('./reset.json')
const utilsStyles = require('./utils.json')

module.exports = {
    components: componentStyles,
    base: baseStyles,
    reset: resetStyles,
    utilities: utilsStyles
}`


/* Variables */
const cssFiles = glob.sync(`./src/compiled/**/*.css`)

const tempDir = os.tmpdir() + "/json-seabedui"

/* Functions */

/* 
	A function that takes a `path` that has 'n' number of .json files and creates a single .json file from all the files and stores it in the `filePath` directory.
*/
function writeStyles(path, filePath){
	let styles = {}
	const jsonComponents = glob.sync(path)

	jsonComponents.forEach((file) => {
		const content = fs.readFileSync(file, "utf-8")
		styles = { ...styles, ...JSON.parse(content) }
	})
	
	fs.writeFileSync(filePath, JSON.stringify(styles))
}

/* A function that creates a folder if it doesn't exist and replaces a folder if it exists. */
function makeFolder(path, delFolder = false){
	if(delFolder){
		if(fs.existsSync(path)){
			fs.rmSync(path, { recursive: true, force: true })
			fs.mkdirSync(path)
		} else fs.mkdirSync(path)
	} else fs.mkdirSync(path)
	
}

/* Create dist folder */
makeFolder("./dist", true)

/* Create temporary folder for storing all the json files */
makeFolder(tempDir, true)


/* Create ./dist/index.js */
fs.writeFile('./dist/index.js', INDEX_JS, function(err){
	if(err)
		console.log(`Couldn't create index.js file: ${err}`)
})


/* Create types folder and ./index.d.ts */
makeFolder('./dist/types', true)
fs.writeFile('./dist/types/index.d.ts', DECLARATION_TYPE, function(err){
	if(err)
		console.log(`Couldn't create index.d.ts file: ${err}`)
})

cssFiles.forEach((currFilePath) => {

	/* Get current file name  */
	const fileName = currFilePath.match(/[\w-]+(?=.css)/)[0];

	/* Path to temporarily store parsed css that is conveted to JSON. */
	let path = currFilePath.replace("./src/compiled/", `${tempDir}/`);
	
	/* Remove the filename entierly from the path */
	path = path.replace(`/${fileName}.css`, "")

	const css = ParseCSS({ file: currFilePath })
	const filePath = `${path}/${fileName}.json`;

	if(!fs.existsSync(path))
		fs.mkdirSync(path, { recursive: true })
		
	fs.writeFileSync(filePath, JSON.stringify(css), { encoding: "utf8" })
})

writeStyles(`${tempDir}/utilities/**/*.json`, "./dist/utils.json") // Write custom utilities Styles
writeStyles(`${tempDir}/components/**/*json`, "./dist/components.json") // Write Components Styles
writeStyles(`${tempDir}/base/**/*json`, "./dist/base.json") // Write Base Styles
writeStyles(`${tempDir}/reset/**/*json`, "./dist/reset.json") // Write Reset Styles

fs.rmSync(tempDir, { force: true, recursive: true })

if(REMOVE_COMPILED_FOLDER)
	fs.rmSync("./src/compiled", { force: true, recursive: true })