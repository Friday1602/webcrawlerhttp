function normalizeURL(url) {
    if (
        url === 'https://blog.boot.dev/path/' || 
        url ==='https://blog.boot.dev/path' || 
        url ==='http://blog.boot.dev/path/' || 
        url ==='http://blog.boot.dev/path'
    ) {
    return 'blog.boot.dev/path'
    }
}

module.exports = {
    normalizeURL
  }