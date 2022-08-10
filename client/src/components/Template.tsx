import React from "react";
import LeftNav from "./LeftNav";
import Nav from "./Nav";

function Template(props: any) {
	return (
		<div>
			<div className="">
				<LeftNav></LeftNav>
			</div>
			<div className="right-content">
				{/* <div className="top">
					<Nav></Nav>
				</div> */}
				<div id="content">{props.children}</div>
			</div>
		</div>
	);
}

export default Template;
