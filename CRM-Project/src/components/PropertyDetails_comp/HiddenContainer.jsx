// HiddenContainer.js
import React from "react";
import ReactDOM from "react-dom";

const HiddenContainer = ({ children }) => {
  return ReactDOM.createPortal(
    <div style={{ position: "absolute", top: "-9999px", left: "-9999px" }}>
      {children}
    </div>,
    document.body
  );
};

export default HiddenContainer;
