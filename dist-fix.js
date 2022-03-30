const fs = require('fs')

let content = fs.readFileSync("./dist/index.js").toString()

fs.rmSync("./dist/index.js")

content = content.replace(/exports.default/, "module.exports")
fs.writeFileSync("./dist/index.js", content, "utf8")

