import React from 'react';
import classNames from 'classnames';

export enum AlertType {
  Success = "success",
  Default = "default",
  Danger = "danger",
  Warning = "warning"
}  

interface BaseAlertProps {
  className?: string;
  type?: AlertType;
  message?: string;
  alertState?: boolean;
}

type NativeAlertProps = BaseAlertProps & React.BaseHTMLAttributes<HTMLElement>;
export type AlertProps = Partial<NativeAlertProps>;

const Alert: React.FC<AlertProps> = (props) => {
  const { type, className, message, alertState, ...restProps } = props;
  const [state, setState] = React.useState({isShow: alertState});
  const classes = classNames("alert", className, {
    [`alert-${type}`]: type
  })
  return (
    <div>
      {state.isShow ?
       <div className={classes} {...restProps}>
        {message}
        <span className="close" {...restProps} onClick={() => {setState({isShow: false})}}>close</span>
      </div>
      : null}
    </div>
  )
}

Alert.defaultProps = {
  message: "this is alert!",
  type: AlertType.Success,
}

export default Alert