/** @type {import('file-watchr/dist/types/types').IConfig}*/ 
const  baseConfig = require("../../watcher.config")

module.exports = {
    ...baseConfig,
    exclude: ["./src/compiled/**/*.css", "./src/build.css"],
}