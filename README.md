# Local Port Detector (lcd)

[![NPM Version](https://img.shields.io/npm/v/local-port-detector.svg)](https://www.npmjs.com/package/local-port-detector)
[![License](https://img.shields.io/npm/l/local-port-detector.svg)](https://github.com/your-username/local-port-detector/blob/main/LICENSE)

A command-line tool to detect open local ports, accompanied by a Chrome extension to quickly access them.

## Features

- **Scan for Open Ports**: Scans a customizable list of local ports to find running services.
- **Chrome Extension UI**: A handy browser extension that lists all detected open ports for quick access.
- **Customizable**: Easily configure the ports you want to scan directly from the extension.
- **Exportable Extension**: Export the extension files with a single command, ready to be loaded into Chrome.

## Installation

Install the `lcd` tool globally using npm:

```bash
npm install -g @tencent/lcd
```

## Usage

There are two main commands available: `start` and `export`.

### `start`

Starts the local server that scans for open ports and serves the results to the Chrome extension.

```bash
lcd start
```

By default, the server runs on port `9999`. You can specify a different port using the `-p` or `--port` option:

```bash
lcd start -p 8888
```

### `export`

Builds and exports the Chrome extension to a local directory. This is useful for installing the extension manually.

```bash
lcd export
```

By default, the extension is exported to a directory named `local-port-detector-extension` in your current working directory. You can specify a different output path using the `-o` or `--out` option:

```bash
lcd export -o ./my-chrome-extensions
```

After exporting, follow the instructions printed in the terminal to load the extension into Chrome.

## API Endpoint

The `lcd` server provides the following API endpoint:

- **`POST /api/open-ports`**: Scans the ports provided in the request body and returns a list of open URLs.

  **Request Body**:
  ```json
  {
    "ports": [3000, 8080, "9000-9010"]
  }
  ```

  **Example with `curl`**:
  ```bash
  curl -X POST -H "Content-Type: application/json" -d '{"ports": [3000, 8080]}' http://localhost:9999/api/open-ports
  ```

## Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to contribute to this project.

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.
