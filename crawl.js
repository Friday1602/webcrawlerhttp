function getURLsFromHTML(htmlBody, baseURL) {
    const urls = []
    const { JSDOM } = require('jsdom')
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for (const linkElement of linkElements) {
        if (linkElement.href.slice(0, 1) === '/') {
            // relative url
            try {
                const urlObj = new URL(`${baseURL}${linkElement.href}`)
                urls.push(urlObj.href)
            } catch (err) {
                console.log(`error with relative url: ${err.message}`)
            }
            
        } else {
            // absolute url
            try {
                const urlObj = new URL(linkElement.href)
                urls.push(urlObj.href)
            } catch (err) {
                console.log(`error with relative url: ${err.message}`)
            }
            
        }
            

    }
    return urls
}

function normalizeURL(url) {
    const urlObj = new URL(url)
    let urlPath = `${urlObj.hostname}${urlObj.pathname}`
    if (urlPath.length > 0 && urlPath.slice(-1) === '/') {
        return urlPath.slice(0,-1)
    }
    return urlPath
}

module.exports = {
    normalizeURL,
    getURLsFromHTML
  }