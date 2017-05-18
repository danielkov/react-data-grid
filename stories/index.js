import React from 'react'
import { storiesOf, action } from '@kadira/storybook'

import DataGrid from '../src/DataGrid'

const prop = 'DataGrid'

const buttonStyles = {
  background: '#f1f1f1',
  border: '1px solid #e9e9e9',
  padding: '12px 20px',
  borderRadius: '3px',
  boxShadow: '0 2px 8px rgba(0,0,0,.1)',
  margin: '0 10px'
}

const cols = [
  {name: 'Annual', index: 'annual'},
  {name: 'Sales', index: 'sales'},
  {name: 'Turnover', index: 'turnover'},
  {name: 'Remote', index: 'remote'},
  {name: 'Failure', index: 'failure'}
]

const CustomElement = ({value}) => <span style={{
  display: 'inline-block',
  width: '100%',
  lineHeight: '100%',
  color: value === 'true' ? 'mediumseagreen' : 'indianred'
}}>{value}</span>


const colsWithComponent = cols.map(col => {
  if (col.name === 'Remote') return {...col, component: CustomElement}
  return col
})
const uselessData = [
  {nonUsedIndex: 'should not appear', another: 'should not appear', thirdOne: 'can\'t see this'},
  {nonUsedIndex: 'should not appear', another: 'should not appear', andAnother: 'can\'t see this'}
]

const data = [
  {annual: 200, sales: 52, turnover: 'yes', remote: 'true', failure: 'total'},
  {annual: 180, sales: 43, turnover: 'maybe', remote: 'false', failure: 'fatal'},
  {annual: 320, sales: 26, turnover: 'no', remote: 'true', failure: 'gigantic'},
  {annual: 990, sales: 58, turnover: 'nope', remote: 'false', failure: 'enormous'},
  {annual: 100, sales: 32, turnover: 'yes', remote: 'false', failure: 'insane'},
  {annual: 404, sales: 90, turnover: 'no', remote: 'true', failure: 'incredible'},
]

const mixedData = [
  {annual: 111, turnover: 'nope', sales: 31, failure: 'fatal'},
  {annual: 222, turnover: 'nope', sales: 31, failure: 'incredible', nonRelevant: 'something', remote: 'true'},
]

const randomNumber = (from, to) => Math.floor(from + Math.random() * (to - from))

const randomOf = (arr) => () => arr[Math.floor(Math.random() * arr.length)]

class AddData extends React.Component {
  state = {
    data
  }

  addData = (e) => {
    let newData = this.state.data.slice()
    newData.push({
      annual: randomNumber(100,500),
      sales: randomNumber(0,100),
      turnover: randomOf(['yes', 'no'])(),
      remote: randomOf(['false', 'true'])(),
      failure: randomOf(['awesome', 'amazing', 'breathtaking', 'fatal', 'irreversible', 'incredible', 'gigantic', 'enormous'])()
    })
    this.setState({
      data: newData
    })
  }

  removeData = (e) => {
    let newData = this.state.data.slice()
    newData.pop()
    this.setState({
      data: newData
    })
  }

  render () {
    return (
      <div>
        <DataGrid columns={cols} data={this.state.data} />
        <div style={{textAlign: 'center', marginTop: '20px'}}>
          <button style={buttonStyles} onClick={this.addData}>Add data</button>
          <button style={buttonStyles} onClick={this.removeData}>Remove data</button>
        </div>
      </div>
    )
  }
}

class AddCols extends React.Component {
  state = {
    visibleCols: cols.length - 1
  }

  addCol = (e) => {
    this.setState({
      visibleCols: this.state.visibleCols < cols.length ? this.state.visibleCols + 1 : this.state.visibleCols
    })
  }

  removeCol = (e) => {
    this.setState({
      visibleCols: this.state.visibleCols - 1 || 1
    })
  }

  render () {
    return (
      <div>
        <DataGrid data={data} columns={cols.slice(0, this.state.visibleCols)} />
        <div style={{textAlign: 'center', marginTop: '20px'}}>
          <button style={buttonStyles} onClick={this.addCol}>Add column</button>
          <button style={buttonStyles} onClick={this.removeCol}>Remove column</button>
        </div>
      </div>
    )
  }
}

class StressTest extends React.Component {
  state = {
    data,
    num: 0,
    sort: 1
  }

  addData = (e) => {
    let newData = this.state.data.slice()
    for (var i = 0; i < this.state.num; i++) {
      newData.push({
        annual: randomNumber(100,500),
        sales: randomNumber(0,100),
        turnover: randomOf(['yes', 'no'])(),
        remote: randomOf(['false', 'true'])(),
        failure: randomOf(['awesome', 'amazing', 'breathtaking', 'fatal', 'irreversible', 'incredible', 'gigantic', 'enormous'])()
      })
    }
    this.setState({
      data: newData
    })
  }

  removeData = (e) => {
    let newData = this.state.data.slice(0, this.state.data.length - this.state.num)
    this.setState({
      data: newData
    })
  }

  handleChange = (e) => {
    let newNum = parseInt(e.target.value)
    if (!isNaN(newNum)) this.setState({num: newNum})
  }

  randomizeData = (e) => {
    let newData = this.state.data.slice()
    newData.map(d => d.annual += randomNumber(-100, 100))
    this.setState({
      data: newData
    })
  }

  sortData = (e) => {
    let newData = this.state.data.slice()
    newData.sort((d, nd) => d.annual === nd.annual ? 0 : d.annual > nd.annual ? 1 * this.state.sort : -1 * this.state.sort)
    this.setState({
      data: newData,
      sort: this.state.sort * -1
    })
  }

  render () {
    return (
      <div>
        <DataGrid columns={cols} data={this.state.data} />
        <div style={{textAlign: 'center', marginTop: '20px'}}>
          <input type="number" value={this.state.num} onChange={this.handleChange} style={buttonStyles} />
          <button style={buttonStyles} onClick={this.addData}>Add data</button>
          <button style={buttonStyles} onClick={this.removeData}>Remove data</button>
          <button style={buttonStyles} onClick={this.randomizeData}>Randomize data</button>
          <button style={buttonStyles} onClick={this.sortData}>Sort data</button>
        </div>
      </div>
    )
  }
}

storiesOf('DataGrid', module)
  .add('without props', () => (
    <DataGrid/>
  ))
  .add('with column headers', () => (
    <DataGrid
      columns={cols}
    />
  ))
  .add('with data', () => (
    <DataGrid columns={cols} data={data}/>
  ))
  .add('with useless data', () => (
    <DataGrid columns={cols} data={[...data, ...uselessData]}/>
  ))
  .add('with useless data only', () => (
    <DataGrid columns={cols} data={uselessData}/>
  ))
  .add('with mixed data', () => (
    <DataGrid columns={cols} data={[...data, ...mixedData]}/>
  ))
  .add('with custom component as cell', () => (
    <DataGrid columns={colsWithComponent} data={[...data, ...mixedData]}/>
  ))
  .add('adding dynamic data', () => (
    <AddData />
  ))
  .add('adding columns dynamically', () => (
    <AddCols />
  ))
  .add('stress test', () => (
    <StressTest />
  ))
  .add('custom styles', () => (
    <DataGrid
      columns={cols}
      data={data}
      style={{border: '1px solid lightblue', boxShadow: 'none', borderRadius: '8px', overflow: 'hidden'}}
      headerStyle={{color: 'steelblue', background: 'lightblue'}}
      headerCellStyle={{color: 'steelblue', padding: '30px 40px', fontSize: '20px'}}
      rowStyle={{color: 'steelblue', border: '1px solid lightblue'}}
      cellStyle={{color: 'steelblue', padding: '20px 40px'}}
      headerClassName={'custom class'}
      headerCellClassName={'custom class'}
      cellClassName={'custom class'}
      rowClassName={'custom class'}
    />
  ))
  .add('event handlers', () => (
    <DataGrid
      onClick={(e) => {
        e.persist()
        console.log(e)
      }}
      columns={cols}
      data={data}
      onRowClick={action('row-click')}
      onCellClick={action('cell-click')}
      cellStyle={{border: '1px solid #e9e9e9'}}
    />
  ))
