import React, { useContext } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';

export interface MenuItemProps {
  index?: number; // 和 defaultIndex相对应 从父组件传递过来的 index值
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {

  const { index, disabled, className, style, children } = props;
  const context = useContext(MenuContext); // 取得父组件Context Provider提供的 属性
  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.index === index, // 判断父组件传递过来的index 和子组件是否一致
  })

  const handleClick = () => {
    if (context.onSelect && !disabled && (typeof index === 'number')) {
      context.onSelect(index)
    }
  }

  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  )
}

// todo: React 内置静态属性 可以帮助我们 判断 this.props.children 中每个元素的类型（可能是函数，或数组）
MenuItem.displayName = 'MenuItem'
export default MenuItem