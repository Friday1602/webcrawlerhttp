const { crawlPage } = require('./crawl.js')

function main() {
    if (process.argv.length < 3) {
        console.log("no website provided")
        process.exit(1)
    }
    if (process.argv.length > 3) {
        console.log("more than one website provided")
        process.exit(1)
    }

    const baseURL = process.argv[2]
    console.log(`start crawling from ${baseURL}`)
    crawlPage(baseURL)
}

main()