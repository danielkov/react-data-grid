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
    onCellClick:    func,
    renderCell:     func
  }

  componentWillMount () {
    this._renderFunc = this.props.renderCell || this._renderCell
  }

  _renderCells = () => {
    let {
      renderCell,
      data
    } = this.props

    let {
      _renderFunc
    } = this

    return data.map(_renderFunc)
  }

  _renderCell = (d, i) => {
    let {
      cellStyle,
      cellClassName,
      onCellClick,
    } = this.props

    return (
      <td
        key=      {i}
        style=    {{...defaultCellStyles, ...cellStyle}}
        className={cellClassName}
        onClick=  {onCellClick}
      >
        { d.component ?
            <dat.component value={d.value}/> :
            d.value
        }
      </td>
    )
  }

  render () {
    let {
      style,
      className,
      onClick,
      cellStyle,
      cellClassName,
      onCellClick,
      ...rest
    } = this.props

    let {
      _renderCells
    } = this

    return (
      <tr
        {...rest}
        onClick=  {onClick}
        className={className}
        style=    {style}
      >
        {_renderCells()}
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
              >
                {dat.name}
              </th>
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
    rowClassName:       string,
    renderRow:          func,
    renderCell:         func
  }

  static defaultProps = {
    data: [],
    columns: []
  }

  indexes = this.props.columns.map((col, i) => col.index)

  componentWillMount () {
    this._renderFunc = this.props.renderRow || this._renderRow
  }

  componentWillUpdate (nextProps) {
    this.indexes = nextProps.columns.map((col, i) => col.index)
  }

  _renderRows = () => {
    let {
      data,
      columns,
      renderRow
    } = this.props

    let {
      indexes,
      _renderFunc
    } = this

    let dats = []

    data.forEach((d, i) => {
      let dat = []
      indexes.forEach((idx, i) => {
        dat[i] = {value: d[idx], component: columns[i].component}
      })
      dats.push(dat)
    })

    return dats.map(_renderFunc)
  }

  _renderRow = (d, i) => {
    let {
      rowStyle,
      rowClassName,
      cellStyle,
      cellClassName,
      onRowClick,
      onCellClick,
      renderRow
    } = this.props

    return <DataGridRow
      key=          {i}
      data=         {d}
      className=    {rowClassName}
      style=        {rowStyle}
      cellStyle=    {cellStyle}
      cellClassName={cellClassName}
      onClick=      {onRowClick}
      onCellClick=  {onCellClick}
    />
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
          {this._renderRows()}
        </tbody>
      </table>
    )
  }
}

export default DataGrid

export {
  DataGridRow,
  DataGridHeader
}
