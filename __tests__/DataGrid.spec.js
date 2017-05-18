import React from 'react'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'
import { render } from 'react-dom'

import DataGrid from '../src/DataGrid'

test('<DataGrid/> crash test.', () => {
  const divRoot = document.createElement('div')

  render(<DataGrid/>, divRoot)
})

test('<DataGrid/> snapshot test.', () => {
  const component = renderer.create(
    <DataGrid/>
  )

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('<DataGrid/> accepts a prop', () => {
  let prop = 'prop'

  const component = mount(
    <DataGrid prop={prop}/>
  )

  expect(component.text()).toBe(`Hello, ${prop}!`)
})
