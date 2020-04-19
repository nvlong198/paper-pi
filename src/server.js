const http = require('http')
const fs = require('fs')
const path = require('path')
const generate = require('./generate')
const port = process.env.PORT || 8080

const requestHandler = async (req, response) => {
  generate.start().then(() => {
    const content = fs.readFileSync(path.join(__dirname, '../build/monocolor.bmp'))
    response.writeHead(200, { 'Content-Type': 'image/bmp' })
    response.end(content, 'utf-8')

  }).catch(() => {
    response.end('Error')
  })
}

const requestTest = async (re, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' })
  response.end("Hello World")
}

const server = http.createServer(requestHandler)

server.listen(port, err => {
  console.log(`Server running at http://localhost:${port}/`);
  if (err) {
    return console.log('Something went wrong', err)
  }
})
