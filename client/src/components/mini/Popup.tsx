import React, { useRef, useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

interface IPopupProps {
	children: React.ReactElement | React.ReactElement[];
}

function Popup(props: IPopupProps) {
	const [show, setShow] = useState(false);
	const popup = useRef<HTMLDivElement>(null);
	return (
		<div
			ref={popup}
			className={"toggler" + (show ? " popup-open" : " bubble")}
			onBlur={(e) => {
				if (!e.currentTarget.contains(e.relatedTarget)) {
					setShow(false);
				}
			}}
			tabIndex={1}
		>
			{!show ? (
				<div className="popup" onClick={() => setShow(true)}>
					<span className="popup-dots">...</span>
				</div>
			) : (
				<div className="">{props.children}</div>
			)}
		</div>
	);
}

export default Popup;
