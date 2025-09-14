const http = require('http');
const fs = require('fs');

const PORT = process.env.PORT || 3000;

function serveFile(res, filepath, contentType, status = 200) {
  fs.readFile(filepath, (err, data) => {
    if (err) {
      console.error('fs.readFile error:', filepath, err.message);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.end('<h1>500 Internal Server Error</h1>');
    }
    res.statusCode = status;
    res.setHeader('Content-Type', contentType);
    res.end(data);
  });
}

const server = http.createServer((req, res) => {

  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);

  const path = req.url.split('?')[0].split('#')[0];

  if (path === '/' || path === '/index.html') {
    return serveFile(res, __dirname + '/index.html', 'text/html; charset=utf-8');
  }
  if (path === '/about' || path === '/about.html') {
    return serveFile(res, __dirname + '/about.html', 'text/html; charset=utf-8');
  }
  if (path === '/contact' || path === '/contact.html') {
    return serveFile(res, __dirname + '/contact.html', 'text/html; charset=utf-8');
  }
  if (path === '/style.css') {
    return serveFile(res, __dirname + '/style.css', 'text/css; charset=utf-8');
  }

  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end(`<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><title>404</title></head>
<body>
  <h1>404 - Page Not Found</h1>
  <p>No route for <code>${path}</code></p>
  <p><a href="/">Back to Home</a></p>
</body></html>`);
});

server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});