const { execSync }  = require('child_process')

module.exports = {
    actions: {
        change: async (_, package) => {

            execSync(`cd ../${package}/ && yarn build`, (err, stdout, stderr) => {
                if(stderr) {
                    console.log(stderr)
                    console.log("\n")
                    return
                }
                else if(err) {
                    console.log("Error Occured");
                    console.log("\n")
                    return
                }
                
                console.log(stdout)
                console.log("\n")
            })
        }
    }
}