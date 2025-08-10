# Local Port Detector (lcd)

[![NPM Version](https://img.shields.io/npm/v/local-port-detector.svg)](https://www.npmjs.com/package/local-port-detector)
[![License](https://img.shields.io/npm/l/local-port-detector.svg)](https://github.com/your-username/local-port-detector/blob/main/LICENSE)

A command-line tool to detect open local ports, accompanied by a Chrome extension to quickly access them.

## Features

- **Scan for Open Ports**: Scans a customizable list of local ports to find running services.
- **Web UI**: A handy web interface that lists all detected open ports for quick access.
- **Customizable**: Easily configure the ports you want to scan directly from the web UI.
- **Exportable Extension**: Build the extension files with a single command, ready to be loaded into Chrome.

## Installation

Install the `lcd` tool globally using npm:

```bash
npm install -g local-port-detector
```

## Usage

There are two main commands available: `serve` and `build`.

### `serve`

Starts the local server that provides the web UI and the API for scanning ports.
```bash
lcd serve
```

By default, the server runs on port `9999`. You can specify a different port using the `-p` or `--port` option:

```bash
lcd serve -p 8888
```

### `build`

Builds the extension and web UI.
```bash
lcd build
```

By default, the extension is exported to a directory named `local-port-detector-extension` in your current working directory. You can specify a different output path using the `-o` or `--out` option:

```bash
lcd build -o ./my-chrome-extensions
```

After building, you can use the `serve` command to start the web UI.
## API Endpoint

The `lcd` server provides the following API endpoint:

- **`POST /api/open-ports`**: Scans the ports provided in the request body and returns a list of open URLs.

  **Request Body**:
  ```json
  {
    "ports": [3000, 8080, "9000-9010"]
  }
