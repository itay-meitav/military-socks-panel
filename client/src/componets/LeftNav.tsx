function LeftNav() {
	return (
		<>
			<div className="col-md-3 left-nav">
				<p className="pad-top-15 text-muted">
					<span className="glyphicon glyphicon-user"></span> Hello,
					<strong>Admin</strong>!
				</p>

				<div className="panel-group">
					<div className="panel panel-default">
						<div className="panel-heading">data</div>
						<div className="panel-body list-group">
							<a href="/socks" className="list-group-item">
								<span className="glyphicon glyphicon-search"></span>
								Socks
							</a>
							<a href="/locations" className="list-group-item">
								<span className="glyphicon glyphicon-pushpin"></span>
								Locations
							</a>
							<a href="/history" className="list-group-item">
								<span className="glyphicon glyphicon-list-alt"></span>
								History
							</a>
							<a href="/officers" className="list-group-item">
								<span className="glyphicon glyphicon-user"></span>
								Officers
							</a>
						</div>
					</div>
					<div className="panel panel-default">
						<div className="panel-heading">Tools</div>
						<div className="panel-body list-group">
							<a
								href="/add/<%= info.pageName%>"
								className="list-group-item"
							>
								<span className="glyphicon glyphicon-pencil"></span>
								Add new item
							</a>
							<span
								onClick={() => {}}
								className="list-group-item"
								style={{ cursor: "pointer" }}
							>
								<span className="glyphicon glyphicon-refresh"></span>
								Reset data
							</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default LeftNav;
