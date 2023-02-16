import React from "react";
import "../Styles/Components/Modal.css";

export default function Modal(props) {
  return <div className="component-modal">{props.children}</div>;
}
