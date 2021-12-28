const fs = require("fs")
const os = require('os')
const glob = require("glob") 
const ParseCSS = require("@seabedui/utils").ParseCSS


/* Variables */
const cssFiles = glob.sync(`./src/compiled/**/*.css`)

const jsonPath = os.tmpdir() + "/json-seabedui"

/* Functions */
function writeStyles(path, filePath){
	let styles = {}
	const jsonComponents = glob.sync(path)
	jsonComponents.forEach((file) => {
		const content = fs.readFileSync(file, "utf-8")
		styles = { ...styles, ...JSON.parse(content) }
	})
	
	fs.writeFileSync(filePath, JSON.stringify(styles))
}

function makeFolder(path, delFolder = false){
	if(delFolder){
		if(fs.existsSync(path)){
			fs.rmSync(path, { recursive: true, force: true })
			fs.mkdirSync(path)
		} else fs.mkdirSync(path)
	} else fs.mkdirSync(path)
	
}

makeFolder("./dist", true)
makeFolder(jsonPath, true)

cssFiles.forEach((file) => {
	const fileName = file.match(/[\w-]+(?=.css)/)[0];

	let path = file.replace("./src/compiled/", `${jsonPath}/`);
	path = path.replace(`/${fileName}.css`, "")

	const css = ParseCSS({ file })
	const filePath = `${path}/${fileName}.json`;

	if(!fs.existsSync(path))
		fs.mkdirSync(path, { recursive: true })
		
	fs.writeFileSync(filePath, JSON.stringify(css), { encoding: "utf8" })
})

writeStyles(`${jsonPath}/utilities/**/*.json`, "./dist/utils.json") // Write custom utilities Styles
writeStyles(`${jsonPath}/components/**/*json`, "./dist/components.json") // Write Components Styles
writeStyles(`${jsonPath}/base/**/*json`, "./dist/base.json") // Write Base Styles
writeStyles(`${jsonPath}/reset/**/*json`, "./dist/reset.json") // Write Reset Styles

fs.rmSync(jsonPath, { force: true, recursive: true })