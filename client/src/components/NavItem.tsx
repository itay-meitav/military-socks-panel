import React, { ReactNode } from "react";
import Button from "@mui/material/Button/Button";
import { Link } from "react-router-dom";
import { JsxElement } from "typescript";
interface IProp {
	icon?: ReactNode;
	path: string;
	text: string;
}
function NavItem(props: IProp) {
	return (
		<Link to={props.path} className="nav-item">
			<Button
				variant={"text"}
				style={{ color: "white" }}
				startIcon={props.icon || null}
			>
				{props.text}
			</Button>
		</Link>
	);
}

export default NavItem;