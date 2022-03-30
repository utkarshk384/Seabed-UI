const fs = require('fs')

let content = fs.readFileSync("./dist/index.js").toString()

fs.rmSync("./dist/index.js")

// Replace exports because it doesn't seem to be supported
content = content.replace(/exports.default/, "module.exports")
fs.writeFileSync("./dist/index.js", content, "utf8")

