<img src="media/logo.png" width="100" ></img>

# create-electron-react

> 🔆 A CLI for Electron & React.js quick start boilerplate.

[![NPM](https://img.shields.io/npm/v/create-electron-react.svg)](https://www.npmjs.com/package/create-electron-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Features

- Easy-to-use CLI
- Handles all modern JS features
- Support for TypeScript
- Basic project structure with a **single** `package.json` setup
- Ability to easily package your electron app using [electron-builder](https://github.com/electron-userland/electron-builder)
- Installed [react-devtools](https://github.com/facebook/react-devtools) and [devtron](https://github.com/electron/devtron) tools for development
- `appveyor.yml` and `.travis.yml` configurations for automated deployments with [electron-builder](https://github.com/electron-userland/electron-builder)
- Ability to produce web output for browsers
- Handy [NPM scripts](https://simulatedgreg.gitbooks.io/electron-vue/content/en/npm_scripts.html)
- Use of [webpack](https://github.com/webpack/webpack) and [react-hot-loader](https://github.com/gaearon/react-hot-loader) with Hot Module Replacement
- Process restarting when working in main process
- ESLint \(with support for [`standard`](https://github.com/feross/standard) and [`airbnb-base`](https://github.com/airbnb/javascript)\)\*
- Unit Testing with [Jest](https://facebook.github.io/jest/)
- E2E Testing with [Jest](https://facebook.github.io/jest/) + [spectron](https://github.com/electron/spectron#readme)
- Base on the latest version ([React](https://github.com/facebook/react/) v16.9.0 && [Electron](https://github.com/electron/electron) v6.0.8)

## Preview

<img width="600" src="./media/preview.gif">

## Install globally

This package requires `node >= 4`, but we recommend `node >= 8`.

```bash
npm install -g create-electron-react
```

## Usage with npx

```bash
npx create-electron-react
```

_([npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) comes with npm 5.2+ and higher, see [instructions for older npm versions](https://gist.github.com/gaearon/4064d3c23a77c74a3614c498a8bb1c5f))_

## Creating a Electron React App

```bash
create-electron-react
```

## Next Features

- [ ] with Redux
- [ ] with Next

## Thanks

- [electron-vue](https://github.com/SimulatedGREG/electron-vue)
- [transitive-bullshit/create-react-library](https://github.com/transitive-bullshit/create-react-library)
- and so on

## License

MIT © [zenghongtu](https://github.com/zenghongtu)
