import React, { useState, createContext } from 'react';
import classNames from 'classnames';
import { MenuItemProps } from './menuItem'; // 取出 子组件中被传递的属性

// 定义字符串字面量： 类型用来约束取值只能是某几个字符串中的一个
type MenuMode = 'horizontal' | 'vertical'; // ts的 字符串字面量  两个中取一个
// 给常用变量定义 类型别名 可复用
type SelectCallback = (selectedIndex: number) => void;

// 定义 菜单属性
export interface MenuProps {
  defaultIndex?: number; // 从App组件传递来的 默认索引
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties; // React 中内置的样式
  onSelect?: SelectCallback; // 用户的自定义回调 点击子菜单某一项时触发的 回调函数
}

interface IMenuContext {
  index: number; 
  onSelect?: SelectCallback;
}

// 父组件 createContext 导出给子组件用 子组件 可以通过 useContext(MenuContext)， 直接获取 Provider上提供的 value 值
export const MenuContext = createContext<IMenuContext>({index: 0})

const Menu: React.FC<MenuProps> = (props) => {
  const { className, mode, style, children, defaultIndex, onSelect } = props;
  console.log('children', children)
  const [ currentActive, setActive ] = useState(defaultIndex); // 设置menuItem 高亮的index
  const classes = classNames("jason-menu ", className, {
    'menu-vertical': mode === 'vertical' ,
    // 'menu-vertical': mode === 'vertical' ,
  })

  const handleClick = (index: number) => {
    // 先更新点击 索引值
    setActive(index);
    // 再执行用户自己的 onSelect逻辑
    if (onSelect) {
      onSelect(index);
    }
  }

  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : 0,
    onSelect: handleClick
  }

  // todo：渲染渲染子组件
  // displayName 是在子组件中 定义的类型别名，目的：用来判断 children中的每个元素
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MeunItem') {
        // return React.cloneElement(child)
        // 修改子组件，并把 index 属性 给childElement 传递过去，将组件与props(index) 合并
        return React.cloneElement(childElement, {
          index
        })
      } else {
        console.error("Warning: Menu has a child which is not a MenuItem Component")
      }
    })
  }
  renderChildren()

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {/* 相当于 类组件中的 路由容器 this.props.children */}
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'vertical',
}

export default Menu