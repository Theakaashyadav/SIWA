import {createReadStream} from 'node:fs';
import {stat} from 'node:fs/promises';
import {createServer} from 'node:http';
import {dirname, extname, join, normalize, sep} from 'node:path';
import {fileURLToPath} from 'node:url';

const exportDirectory = join(dirname(fileURLToPath(import.meta.url)), 'out');
const host = process.env.HOST ?? '0.0.0.0';
const port = Number.parseInt(process.env.PORT ?? '3000', 10);

const contentTypes = new Map([
  ['.avif', 'image/avif'],
  ['.css', 'text/css; charset=utf-8'],
  ['.gif', 'image/gif'],
  ['.html', 'text/html; charset=utf-8'],
  ['.ico', 'image/x-icon'],
  ['.jpeg', 'image/jpeg'],
  ['.jpg', 'image/jpeg'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.map', 'application/json; charset=utf-8'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.webp', 'image/webp'],
  ['.woff', 'font/woff'],
  ['.woff2', 'font/woff2'],
  ['.xml', 'application/xml; charset=utf-8'],
]);

function setSecurityHeaders(response) {
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('X-Frame-Options', 'DENY');
  response.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
}

function sendStatus(response, statusCode, message) {
  response.writeHead(statusCode, {'Content-Type': 'text/plain; charset=utf-8'});
  response.end(message);
}

const server = createServer(async (request, response) => {
  setSecurityHeaders(response);

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.setHeader('Allow', 'GET, HEAD');
    sendStatus(response, 405, 'Method Not Allowed');
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url ?? '/', 'http://localhost').pathname);
  } catch {
    sendStatus(response, 400, 'Bad Request');
    return;
  }

  const relativePath = pathname.replace(/^\/+/, '');
  const requestedPath = normalize(join(exportDirectory, relativePath));
  const normalizedRoot = normalize(exportDirectory);
  const requestedPathLower = requestedPath.toLowerCase();
  const allowedPrefix = `${normalizedRoot}${sep}`.toLowerCase();

  if (requestedPathLower !== normalizedRoot.toLowerCase() && !requestedPathLower.startsWith(allowedPrefix)) {
    sendStatus(response, 403, 'Forbidden');
    return;
  }

  let filePath = requestedPath;

  try {
    const details = await stat(filePath);
    if (details.isDirectory()) {
      filePath = join(filePath, 'index.html');
    }
  } catch {
    if (!extname(filePath)) {
      filePath = `${filePath}.html`;
    }
  }

  let details;
  try {
    details = await stat(filePath);
    if (!details.isFile()) {
      throw new Error('Not a file');
    }
  } catch {
    sendStatus(response, 404, 'Not Found');
    return;
  }

  response.writeHead(200, {
    'Content-Length': details.size,
    'Content-Type': contentTypes.get(extname(filePath).toLowerCase()) ?? 'application/octet-stream',
  });

  if (request.method === 'HEAD') {
    response.end();
    return;
  }

  createReadStream(filePath).pipe(response);
});

server.listen(port, host, () => {
  console.log(`Static SIWA site available at http://localhost:${port}`);
});
