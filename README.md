# DataGrid Readme

### Table of Contents

- [Introduction](#introduction)
- [Usage](#usage)
- [Testing](#testing)
- [Development](#development)
- [Miscellaneous](#miscellaneous)

# Introduction

DataGrid is a React Component.

# Usage

To use DataGrid install it with `npm`:

```sh
npm install --save data-grid
```

Then include it in the project with:

```js
import DataGrid from 'data-grid'
```

To render it to the DOM:

```js
ReactDOM.render(<DataGrid/>)
```

# Testing

To test DataGrid locate the root folder and run tests with:

```sh
npm test
```

Test output and coverage will be shown in standard output.

If you try it after initialization, you will notice that the component has 100% coverage. This will change as you start adding your own code, so make sure you keep up with tests. The predefined tests should give you a good idea of how to write tests.

If you change something that **should** affect the appearance of your component (e.g.: in the beginning of development), run `npm test` with flags to override snapshots.

```sh
npm test -- -u
```

This will update the snapshot. Make sure you do this when you need the component to change appearance and behavior.

# Development

To begin development, first install dependencies with:

```sh
npm install
```

**NOTE:** if tests fail due to not found dependencies (`cannot resolve...`) run the install again with:

```sh
npm install --dev-only
```

To start the development environment, type in your shell:

```sh
npm start
```

This will initialize Storybook, which is a great tool for developing and proof-testing your components on the go.

Make sure you update this `README`, the `CHANGELOG` with important changes you've made.

To publish the package update `package.json` with the desired new version. Packages use [semver](http://semver.org/).

A quick way to update the `package.json` is using [`npm`](https://docs.npmjs.com/cli/version).

Then switch to using private repository (if not already):

```sh
npm set registry <url of registry>
```

Now you can publish with:

```sh
npm publish
```

# Miscellaneous

Any other info you have not yet mentioned about DataGrid.
