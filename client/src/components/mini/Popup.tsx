import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

interface IPopupProps {
  children: React.ReactElement | React.ReactElement[];
}

function Popup(props: IPopupProps) {
  const [show, setShow] = useState(false);
  return (
    <div
      className="toggler"
      onBlur={(e) => {
        setTimeout(() => {
          //   if (!e.currentTarget.contains(document.activeElement))
          setShow(false);
        }, 100);
      }}
      tabIndex={1}
    >
      {!show ? (
        <div className="popup" onClick={() => setShow(true)}>
          <span className="popup-dots bubble">...</span>
        </div>
      ) : (
        <div className="popup-open">{props.children}</div>
      )}
    </div>
  );
}

export default Popup;
