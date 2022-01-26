import React from "react";
import classNames from "classnames";

import "./Button.scss";

export default function Button(props) {
  const buttonClass = classNames('button', {
    // Confirm button style
    ' button--confirm': props.confirm,
    // Cancel button style
    ' button--danger': props.danger,
    // Delete button style
    ' button--delete':props.delete
  });

  return (
    <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
