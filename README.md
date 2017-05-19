# DataGrid Readme

### Table of Contents

- [Introduction](#introduction)
- [Usage](#usage)
- [Testing](#testing)
- [Development](#development)
- [Miscellaneous](#miscellaneous)

## Introduction

This project was bootstrapped with [`react-architect`](https://npmjs.com/package/react-architect), which is another project of mine. If you want to take the hassle out of the setup of component development environments, consider checking it out.

A simple, extendable React Component for displaying data in a grid-style manner. Because performance is key in large applications it is highly recommended to read the [performance](#performance) section.

## Usage

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

## API

If you want to get a deeper understanding of how the component works, read the source.

### Props

#### columns: `[ { name: <String>, index: <String>, component: <Function> } ]`

This prop is required for displaying anything in the grid. Due to the fact that sometimes even the columns of the grid are dynamically loaded from an outside resouce, none of these props are actually marked as required, which means that 'prop-types' will not warn you if they're left empty.

The `name` property will show up in the table header, while the `index` property will be used to sort through the data (see below).

A third, `component` property can also be assigned, which will affect the default rendering of the element. If you're using a custom render method for cells, this property will be ignored.

Example:

```js
render(
  <DataGrid
    columns={[
      {name: 'Name', index: 'name'},
      {name: 'Age', index: 'age'},
      {name: 'Job', index: 'occupation'}
    ]}
  />,
  root
)
```

Taking this further, if you're lazy to type out a name and an index, you could create a function that does it for you, like this:

```js
const createColumns = (colNames) => (
  colNames.map(name => ({
    name: name,
    index: name.toLowerCase()
  }))
)
```

Of course your names may include other characters, such as whitespace that can't be passed down as JSON from your back-end, for which case you can actually use some helper functions to turn these into JSON-compatible object keys.

#### data: `[ <Object> ]`

This prop should be an Array of objects, because this is what the grid uses to figure out what you want to display. The default render function will go through this array and sort the objects according to the `columns` prop. This means that only data that has a header will be displayed in the table and each value will fall under its designated table header.

Example:

```js
render(
  <DataGrid
    {...previous}
    data={[
      {name: 'Sam', age: 50, occupation: 'dentist'},
      {name: 'Daniel', age: 21, occupation: 'web-designer'},
      {name: 'Joe', age: 42, occupation: 'lawyer'},
    ]}
  />,
  root
)
```

Assuming that you're following this along as a getting started guide, you will have already added `columns` prop to your component. If you like copy-pasting example code, just save your props in an object, called `previous` once you understand what they do.

Say you had some other properties on one or many of the objects in your data array. The grid would just ignore those. If you want those included also, just add them to the columns by their index.

#### onRowClick: `<Function>`

This function gets called with the original event as its parameter when a row gets clicked.

This is not a fully reasonable feature as of yet. It would be desirable to bind this function to each of the `Cell` components, so that the function scope will be useful, however I did not find this to be worth the performance trade-offs for this raw component.

Example:

```js
render(
  <DataGrid
    {...previous}
    onRowClick={console.log}
  />
)
```

The above example will log the default React Synthetic event emitted by the row that was clicked.

#### onCellClick: `<Function>`

This function gets called with the original event as its parameter when a cell gets clicked

As said about the previous feature, this one is also not reasonably implemented. You can use it anyway to get information about which cell the user clicked. Note that unless you stop bubbling, each time a cell is clicked, a row click event will also be fired.

Example:

```js
render(
  <DataGrid
    {...previous}
    onCellClick={console.log}
  />
)
```

#### headerStyle: `<Object>`

This is a regular React style object that will be passed on to the table header upon rendering. Use this to add important inline styles to your table header.

#### headerCellStyle: `<Object>`

This is a regular React style object that will be passed on to each table header cell upon rendering. Use this to add important inline styles to your table header cells.

#### rowStyle: `<Object>`

This is a regular React style object that will be passed on to each row upon rendering. Use this to add important inline styles to your table rows.

#### cellStyle: `<Object>`

This is a regular React style object that will be passed on to each cell upon rendering. Use this to add important inline styles to your table cells.

#### headerClassName: `<String>`

This is a string that will be passed on to the React prop: `className` upon rendering the table header.

#### headerCellClassName: `<String>`

This is a string that will be passed on to the React prop: `className` upon rendering each table header cell.

#### cellClassName: `<String>`

This is a string that will be passed on to the React prop: `className` upon rendering each table cell.

#### rowClassName: `<String>`

This is a string that will be passed on to the React prop: `className` upon rendering each table row.

#### renderRow: `<Function ( data: <Array>, index: <Number> )>`

This is a function that can be used to take place of the default grid row rendering function. If you want to control how each row gets displayed, e.g.: only render rows conditionally (and for some reason you want to do this in the component itself, instead of doing it in the data you provide), this is the way you can do it.

Example:

```js
render(
  <DataGrid
    {...previous}
    renderRow={(data, i) => (<MyCustomRow key={i} data={data}/>)}
  />
)
```

Don't forget to add a unique key prop, otherwise React will scream at you when using development builds.

**Beware:** this will override the default cell rendering too, since that's being taken care of by a component called `<DataGridRow/>`. If you want to preserve cell rendering, but perhaps want to add a wrapper around each row, you can do so, by actually using the aforementioned component itself. Do remember though, that `<DataGrid/>` will no longer pass down props that are related to rows or cells (these all conveniently have the word 'row' or 'cell' in them), so you'll have to add those manually. Read the documentation for this component below.

Example:

```js
import DataGrid, { DataGridRow } from 'data-grid'

render(
  <DataGrid
    {...previous}
    renderRow={(data, i) => <MyWrapper><DataGridRow {...otherProps} key={i} data={data}/></MyWrapper>}
  />
)
```

#### renderCell: `<Function ( data: { value: <String|Number>, component: <Function> }, index: <Number> )>`

Example:

```js
render(
  <DataGrid
    {...previous}
    renderCell={(data, i) => (<MyCustomCell key={i}>data.value</MyCustomCell>)}
  />
)
```

Do note that if you override the default cell rendering this way, some props, like the ones that have the word 'cell' in them will no longer be considered by the component. This also includes the `component` property of the `columns` prop. If you'd like to keep those, you can always just implement them yourself, but at that point you're already rendering your own component instead of a cell anyway, so it is rather pointless.

Keep in mind also that it is only schemantically appropriate if you use table data tags (`<td>`) somewhere in your markup when rendering table data.

For performance reasons, do not forget to include the `key` prop on your custom cells, as these will get rendered in a loop.

### Exports

#### default: `<DataGrid/>`

Use example:

```js
import DataGrid from 'data-grid'
import { render } from 'react-dom'

render(<DataGrid/>, root)
```

#### `<DataGridRow/>`

Use example:

```js
import { DataGridRow } from 'data-grid'
import { render } from 'react-dom'

render(<DataGridRow/>, root)
```

#### `<DataGridHeader/>`

Use example:

```js
import { DataGridHeader } from 'data-grid'
import { render } from 'react-dom'

render(<DataGridHeader/>, root)
```

#### `defaultStyles`

Being a UX designer at heart, I couldn't write a component that looks as disappointing as the default formatting of a table. This is why I included some sane default styles that you can use for your table component if you need it for a demo, or just can't think of a way to make it look better. These are not added to the table by default, because rendering inline styles on each cell actually has some tolls on performance and painting / repainting (even with these minimal inline styles it runs about 50% slower). If you like them, turn them into CSS and use it with classes. Read more about this under [performance](#performance).

Example:

```js
import { defaultStyles as styles } from 'data-grid'

render(
  <DataGrid
    {...setup}
    style={styles.table}
    cellStyle={styles.cell}
    rowStyle={styles.row}
    headerCellStyle={styles.cell}
    headerStyle={styles.header}
  />
)
```

## Performance

In real-world applications component performance is key in delivering a smooth User Experience. This data grid is especially useful for displaying large sets of data and as such it is expected to be used in applications that manage massive amounts of data. This component uses `React.PureComponent` under the hood. If you do not understand the implications of this, make sure you read the [official documentation](https://facebook.github.io/react/docs/react-api.html#react.purecomponent) on this.

While this component aims to be a minimal API for more complex grids to be built upon it, it does have some heavy logic while rendering cell data, more specifically as it selects which properties / values it should display and where. While this may put some strain on slower computers, when trying to render data sets of 10+ columns with over 1000 rows, it really is a worthwhile trade-off, as it allows you to be more flexible with your data. To get a render of more than a second on my (super)computer it took 10 columns and around 4000 rows, which is insane and should never ideally happen in real applications.

All that said, here are my tips to increase performance of the data grid in your application:

1. When using custom rendering, make sure you always add that `key` prop.
  - React will warn you about this when running in a development environment, however I am also warning you here. React needs that internally to faster select DOM Nodes for diffing.

2. Whenever possible, for styling, use CSS - as intended, rather than inline JS-based styles.
  - CSS was invented for this kind of stuff and is faster and better at doing styles.
  - It is also cleaner if you use stylesheets. Makes it easier to debug, change in browser, etc.

3. Decouple data logic from components, e.g.: Redux, Flux, MobX (or some other X).
  - While this may not necessarily be a performance improvement (it most likely will be), but decoupling logic from the UI makes it tons easier to work on larger scale applications.
  - Some of the frameworks mentioned above take some optimization steps to make your code run faster. React does little of this. It focuses on DOM manipulation instead, which is what it should mainly be used for.

4. Use Higher Order Components (HOCs) when extending this grid.
  - HOCs are cool in that they wrap existing elements while keeping their API in-tact and also adding extra functionality.

5. Avoid renders whenever possible.
  - The grid extends `PureComponent`, which already compares props before doing a re-render, however it can't dive into your data, instead it does shallow comparison. E.g.: `[] !== []`, since objects (and so arrays too) are passed by reference, not value.
  - Implement some comparing logic of your own, in your logic layer to avoid unnecessary re-renders. If the data does not change, do not pass it again as props.
  - Also note that mutating the prop and passing the same one again, will not trigger a re-render, which may be bad for you if you did want a re-render. To stop that from happening, you could always pass in new data in your props, rather than mutating the previous one.

## Testing

To test DataGrid locate the root folder and run tests with:

```sh
npm test
```

Test output and coverage will be shown in standard output.

If you change something that **should** affect the appearance of your component (e.g.: in the beginning of development), run `npm test` with flags to override snapshots.

```sh
npm test -- -u
```

This will update the snapshot. Make sure you do this when you need the component to change appearance and behavior.

## Development

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
