const http = require('http');
const fs = require('fs');
const path = require('path');
const { randomUUID } = require('crypto');

const PORT = 8445;
const PASTES = '/tmp/pastes';
fs.mkdirSync(PASTES, { recursive: true });

const HTML = `<!DOCTYPE html><html><head><title>Sam's Pastebin</title></head>
<body><h2>Sam's Pastebin</h2>
<form method="POST"><textarea name="content" rows=20 cols=100></textarea><br>
<button type="submit">Paste</button></form></body></html>`;

http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost:' + PORT);

  if (req.method === 'GET' && url.pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(HTML);
  } else if (req.method === 'POST' && url.pathname === '/') {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', () => {
      const params = new URLSearchParams(body);
      const id = randomUUID().slice(0, 8);
      fs.writeFileSync(path.join(PASTES, id + '.txt'), params.get('content') || '');
      res.writeHead(303, { Location: '/' + id });
      res.end();
    });
  } else if (req.method === 'GET' && url.pathname.startsWith('/')) {
    const id = url.pathname.slice(1);
    const file = path.join(PASTES, id + '.txt');
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8');
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(content);
    } else {
      res.writeHead(404); res.end('Not found');
    }
  } else {
    res.writeHead(404); res.end();
  }
}).listen(PORT, '0.0.0.0', () => console.log('Pastebin running on port ' + PORT));
