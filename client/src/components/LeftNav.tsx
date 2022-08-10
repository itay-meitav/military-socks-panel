import { Link, useLocation } from "react-router-dom";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SearchIcon from "@mui/icons-material/Search";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import ModeIcon from "@mui/icons-material/Mode";
import Button from "@mui/material/Button/Button";
import logo from "../assets/logo.png";
import { useState } from "react";
import NavItem from "./NavItem";

function LeftNav() {
	const [showNav, setShowNav] = useState(false);
	const [spinIcon, setSpinIcon] = useState(false);

	const loc = useLocation();
	return (
		<>
			<div className={"left-nav" + (showNav ? " show" : "")}>
				<div className="page-name">
					<div className="title">
						<img src={logo} alt="russian socks logo" />
						<span className=""></span> {"page name".toUpperCase()}
					</div>
					<Button
						variant={"text"}
						id="close-logo"
						style={{ color: "white" }}
						onClick={() => {
							setShowNav(false);
						}}
					>
						<CloseIcon />
					</Button>
					<Button
						variant={"text"}
						id="open-menu"
						style={{ color: "white" }}
						onClick={() => {
							setShowNav(true);
						}}
					>
						<MenuIcon></MenuIcon>
					</Button>
				</div>

				<div className="nav-panel">
					<div className="nav-items">
						<span className="title">Menu</span>

						<NavItem
							path="/socks"
							text="Socks"
							icon={<SearchIcon />}
							key={0}
						/>
						<NavItem
							path="/locations"
							text="Locations"
							icon={<LocationOnIcon />}
							key={1}
						/>
						<NavItem
							path="/history"
							text="history"
							icon={<ListAltIcon />}
							key={2}
						/>
						<NavItem
							path="/officers"
							text="officers"
							icon={<AccountBoxIcon />}
							key={3}
						/>
						{/* <div> */}
						<span className="title">Tools</span>

						<NavItem
							path={`/${
								loc.pathname.replace(/^\//g, "").split("/")[0] ||
								"socks"
							}/add`}
							text="Add new item"
							icon={<ModeIcon />}
							key={4}
						/>
						<div
							className="nav-item"
							onClick={(e) => {
								setSpinIcon(true);
								fetch("/api/reset", {
									method: "put",
								})
									.then((res) => {
										if (res.ok) return res.json();
									})
									.then((res) => {
										setSpinIcon(false);
									})
									.catch(() => {
										setSpinIcon(false);
										// e.target
										// 	.querySelector("span")
										// 	.classList.remove("spin");
									});
							}}
						>
							<Button
								variant={"text"}
								style={{ color: "white" }}
								startIcon={
									<RestartAltIcon className={spinIcon ? "spin" : ""} />
								}
							>
								Reset data
							</Button>
						</div>
					</div>
					{/* </div> */}
				</div>
			</div>
		</>
	);
}

export default LeftNav;
