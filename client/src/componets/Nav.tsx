function Nav() {
	return (
		<>
			<nav
				role="navigation"
				className="navbar navbar-inverse navbar-fixed-top"
			>
				<div className="container">
					<div className="navbar-header">
						<button
							role="button"
							className="navbar-toggle"
							data-toggle="collapse"
							data-target=".navbar-collapse"
						>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
						<div
							className="logoSite"
							style={{
								display: "flex",
								flexDirection: "row-reverse",
								gap: "10px",
							}}
						>
							<a href="/" className="navbar-brand">
								Socks Control Panel
							</a>
							<img
								src="/assets/logo.png"
								style={{
									width: "19px",
									height: "28px",
									marginTop: "10px",
								}}
							></img>
						</div>
					</div>

					<div className="navbar-collapse collapse">
						<ul className="nav navbar-nav navbar-right">
							<li>
								<a href="#">
									<span className="glyphicon glyphicon-lock"></span>{" "}
									Logout
								</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
}

export default Nav;
