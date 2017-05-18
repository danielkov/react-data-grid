import React, { PureComponent } from 'react'
import { number, object, string, func, shape, arrayOf, array, element } from 'prop-types'

const color1 = '#f1f1f1'
const color2 = '#e9e9e9'

const defaultTableStyles = {
  width:          `100%`,
  border:         `1px solid ${color2}`,
  fontFamily:     `helvetica`,
  borderCollapse: `collapse`,
  boxShadow:      `0 10px 60px rgba(0,0,0,.1)`
}

const defaultCellStyles = {
  padding:    `15px 25px`,
  fontWeight: `normal`
}

class DataGridRow extends PureComponent {

  static propTypes = {
    data:           array.isRequired,
    cellStyle:      object,
    cellClassName:  string,
    style:          object,
    className:      string,
    onClick:        func,
    onCellClick:    func
  }

  render () {
    let {
      data,
      style,
      className,
      cellStyle,
      cellClassName,
      onClick,
      onCellClick,
      ...rest
    } = this.props

    return (
      <tr
        {...rest}
        onClick=  {onClick}
        className={className}
        style=    {style}
      >
        {data.map((dat, i) => (
          <th
            key=      {i}
            style=    {{...defaultCellStyles, ...cellStyle}}
            className={cellClassName}
            onClick={onCellClick}
          >
          { dat.component ?
              <dat.component value={dat.value}/> :
              dat.value
          }
          </th>
        ))}
      </tr>
    )
  }
}

class DataGridHeader extends PureComponent {

  static propTypes = {
    data:       arrayOf(shape({
                  name: string,
                  index: string
                })).isRequired,
    style:      object,
    cellStyle:  object
  }

  render () {
    let {
      data,
      style,
      cellStyle,
      className,
      cellClassName,
      ...rest
    } = this.props

    return (
      <thead {...rest}>
          <tr
            style=    {{background: color1, ...style}}
            className={className}
          >
            {data.map((dat, i) => (
              <th
                key=      {dat.index}
                style=    {{...defaultCellStyles, ...cellStyle}}
                className={cellClassName}
              >{dat.name}</th>
            ))}
          </tr>
      </thead>
    )
  }
}

class DataGrid extends PureComponent {

  static propTypes = {
    activeRow:          number,
    activeField:        string,
    data:               array,
    columns:            arrayOf(shape({
                          name: string,
                          index: string,
                          component: func
                        })),
    onRowClick:         func,
    onFieldClick:       func,
    headerStyle:        object,
    headerCellStyle:    object,
    rowStyle:           object,
    cellStyle:          object,
    headerClassName:    string,
    headerCellClassName:string,
    cellClassName:      string,
    rowClassName:       string
  }

  static defaultProps = {
    data: [],
    columns: []
  }

  indexes = this.props.columns.map((col, i) => col.index)

  componentWillUpdate (nextProps) {
    this.indexes = nextProps.columns.map((col, i) => col.index)
  }

  renderData () {
    let {
      data,
      columns,
      rowStyle,
      rowClassName,
      cellStyle,
      cellClassName,
      onRowClick,
      onCellClick
    } = this.props

    let {
      indexes
    } = this

    let dats = []

    data.forEach((d, i) => {
      let dat = []
      indexes.forEach((idx, i) => {
        dat[i] = {value: d[idx], component: columns[i].component}
      })
      dats.push(dat)
    })

    return dats.map((d, i) => <DataGridRow
      key=          {i}
      data=         {d}
      className=    {rowClassName}
      style=        {rowStyle}
      cellStyle=    {cellStyle}
      cellClassName={cellClassName}
      onClick=      {onRowClick}
      onCellClick=  {onCellClick}
    />)
  }

  render () {
    let {
      columns,
      style,
      className,
      rowStyle,
      rowClassName,
      headerClassName,
      headerStyle,
      headerCellClassName,
      headerCellStyle,
      cellStyle,
      cellClassName,
      onRowClick,
      onCellClick,
      ...rest
    } = this.props

    return (
      <table
        {...rest}
        style=    {{...defaultTableStyles, ...style}}
        className={className}
      >
        <DataGridHeader
          onClick=      {onRowClick}
          style=        {headerStyle}
          cellStyle=    {headerCellStyle}
          cellClassName={headerCellClassName}
          className=    {headerClassName}
          data=         {columns}
        />
        <tbody>
          {this.renderData()}
        </tbody>
      </table>
    )
  }
}

export default DataGrid
