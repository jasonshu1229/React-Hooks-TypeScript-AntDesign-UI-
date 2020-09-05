import React from 'react';
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react';

import Menu, { MenuProps } from './menu';
import MenuItem from './menuItem';

const testProps: MenuProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  className: 'test',
}

const testVerProps: MenuProps = {
  defaultIndex: 0,
  mode: 'vertical',
}

// 测试生成组件
const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>
        active
      </MenuItem>
      <MenuItem disabled>
        disabled
      </MenuItem>
      <MenuItem>
        xyz
      </MenuItem>
    </Menu>
  )
}

// 定义下面几个 case中 都会用到的变量
let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement

describe('test Menu and MenuItem component', () => {

  // 定义在下面几个case 执行时都会执行的 公共方法，让它们先提前执行
  beforeEach(() => {
    wrapper = render(generateMenu(testProps)) // 渲染的dom结构
    menuElement = wrapper.getByTestId('test-menu') // 取得dom结构中的 menu节点
    activeElement = wrapper.getByText('active')
    console.log('activeElement', activeElement)
    disabledElement = wrapper.getByText('disabled')
  })

  it('should render correct menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('jason-menu test')
    expect(menuElement.getElementsByTagName('li').length).toEqual(3)
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  })
  it('click item should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('xyz')
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith(2)
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith(1)
  })
  it('should render vertical mode when mode is set to vertical', () => {
    cleanup() // 手动清除 beforeEach 中 创建的 wrapper
    const wrapper = render(generateMenu(testVerProps))
    const menuElement = wrapper.getByTestId('test-menu')
    expect(menuElement).toHaveClass('jason-menu menu-vertical')
  })
  // 在不同的 case 之间，每个case执行完之后，会 cleanUp 一下清干净
})