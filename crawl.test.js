const { test, expect } = require('@jest/globals')
const { normalizeURL, getURLsFromHTML } = require('./crawl.js')

test('normalizeurl strip protocol', () => {
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toBe(expected)
})

test('normalizeurl strip trailing slash', () => {
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toBe(expected)
})

test('normalizeurl strip Capitalize', () => {
    const input = 'https://BLOG.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toBe(expected)
})

test('normalizeurl strip http', () => {
    const input = 'http://BLOG.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toBe(expected)
})

test('getURLsFromHTML absolute', () => {
    const htmlBody = `
    <html>
    <body>
        <a href="https://blog.boot.dev/path/"><span>Go to Boot.dev</span></a>
    </body>
    </html>
    `
    const baseURL = 'https://blog.boot.dev/path'
    const actual = getURLsFromHTML(htmlBody, baseURL)
    const expected = ['https://blog.boot.dev/path/']
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative', () => {
    const htmlBody = `
    <html>
    <body>
        <a href="/path/"><span>Go to Boot.dev</span></a>
    </body>
    </html>
    `
    const baseURL = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(htmlBody, baseURL)
    const expected = ['https://blog.boot.dev/path/']
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML both', () => {
    const htmlBody = `
    <html>
    <body>
        <a href="https://blog.boot.dev/path1/"><span>Go to Boot.dev path1</span></a>
        <a href="/path2/"><span>Go to Boot.dev path2</span></a>
    </body>
    </html>
    `
    const baseURL = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(htmlBody, baseURL)
    const expected = ['https://blog.boot.dev/path1/', 'https://blog.boot.dev/path2/']
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML invalid', () => {
    const htmlBody = `
    <html>
    <body>
        <a href="invalid"><span>Go to Boot.dev</span></a>

    </body>
    </html>
    `
    const baseURL = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(htmlBody, baseURL)
    const expected = []
    expect(actual).toEqual(expected)
})