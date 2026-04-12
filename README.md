# Sam's Pastebin

A minimal self-hosted pastebin server. No dependencies, no database — just Node.js and flat files.

## Quick Start

```bash
node server.js
```

Opens at `http://localhost:8445`

## Features

- Single `server.js` — no npm packages required (uses built-in Node.js modules)
- Pastes stored as `.txt` files in `/tmp/pastes`
- UUID-based URLs (8 characters)
- Raw text retrieval at `/:id`

## Config

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `8445` | Listen port |
| `PASTES` | `/tmp/pastes` | Paste storage directory |

## Production Use

This was built as a lightweight internal tool. For production exposure, consider:
- Adding HTTPS (put behind nginx/caddy with TLS)
- Adding paste expiration
- Adding password protection
- Switching to a real database

## Project Status

Built 2026-04-07 as a quick local pastebin for sharing code snippets.
