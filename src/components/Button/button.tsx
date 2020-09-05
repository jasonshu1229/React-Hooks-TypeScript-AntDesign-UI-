import React from 'react';
import classNames from 'classnames';

export enum ButtonSize {
  Large = "lg",
  Small = "sm"
}

export enum ButtonType {
  Primary = "primary",
  Default = 'default',
  Danger = 'danger',
  Link = 'link'
} 

interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  children: React.ReactNode,
  href?: string
}

// 定义一个 交叉类型的别名 目的：获取到 react button原生组件的一些属性 和 自定义的 BaseButtonProps
// 注意 不能定义 联合类型 因为只能返回其中一个类型
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>

// Partial 把其包裹的属性 变成 可选属性
export type ButtonProps = Partial<NativeButtonProps> & Partial<AnchorButtonProps>
// <BaseButtonProps> 限制 props的类型
const Button: React.FC<ButtonProps> = (props) => {
  const {
    btnType,
    className, // 用户自定义的 className
    disabled,
    size,
    children,
    href,
    ...restProps // 剩余的属性
  } = props

  // 定制不同btn 的 class
  // btn, btn-lg, btn-primary
  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    'disabled': (btnType === ButtonType.Link && disabled)
  })
  if (btnType === ButtonType.Link && href) {
    return (
      <a
        className = {classes}
        href = {href}
        {...restProps}
      >
        {children}
      </a>
    )
  } else {
    return (
      <button
        className={classes}
        disabled={disabled}
        {...restProps}
      >
        {children}
      </button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: ButtonType.Default
}

export default Button