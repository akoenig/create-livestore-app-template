# [LiveStore](https://github.com/livestorejs) Application

This repository contains a newly scaffolded LiveStore application.

## Development

LiveStore persists data in SQLite on the user's device in the [OPFS](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API/Origin_private_file_system) (Origin private file system). OPFS is only available in secure contexts via HTTPS which makes it mandatory that, even during development, you have a valid HTTPS certificate.

That said, a reverse proxy is required. We use [Caddy](https://caddyserver.com/) for that. The following describes the steps you have to perform in order to start the application locally.

You can utilize [Devbox](https://www.jetify.com/devbox) – a tool for creating isolated development environments:

```sh
devbox run dev
```

This does the following:

1. Creates an isolated development environment with all required tools set up: [Node.js](https://nodejs.org/en), [pnpm](https://pnpm.io/) and [Caddy](https://caddyserver.com/).
2. Installs all required dependencies via `pnpm`.
3. Performs a `caddy trust` which installs the Caddy CA to your local keychain (so that your browsers won't complain about the self-signed certificate). This will ask for your password. No worries, this is required for writing the CA into your local keychain.
4. Start the reverse proxy in the background.
5. Starts the LiveStore app via `pnpm run dev`.

Now point your browser to https://localhost and interact with your application.

### The manual approach (without Devbox)

If you don't want to use Devbox you have to make sure to install the following tools on your own:

- Node.js (version: `^22`)
- pnpm
- Caddy

When all the tools are installed you have to perform the following steps:

```sh
# Install all the dependencies
pnpm install

# Add the Caddy CA to your keychain
caddy trust

# Start Caddy
caddy run -c Caddyfile
```

In another shell session:

```sh
pnpm run dev
```

Now everything is running, and you can point your browser to https://localhost
