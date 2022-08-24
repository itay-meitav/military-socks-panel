import React, { useEffect, useState } from "react";
import "./css/App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SocksPage from "./components/index/SocksPage";
import Template from "./components/Template";
import OfficersPage from "./components/index/OfficersPage";
import LocationsPage from "./components/index/LocationsPage";
import HistoryPage from "./components/index/HistoryPage";
import AddOfficer from "./components/add/AddOfficer";
import AddSock from "./components/add/AddSock";
import AddLocation from "./components/add/AddLocation";
import AddHistory from "./components/add/AddHistory";
import EditHistory from "./components/edit/EditHistory";
import EditLocation from "./components/edit/EditLocation";
import EditOfficer from "./components/edit/EditOfficer";
import EditSock from "./components/edit/EditSock";

export const PageContext = React.createContext<[string, Function]>([
	"history",
	() => {},
]);

function App() {
	const [currPage, setCurrPage] = useState("history");

	function SetPage(page: string) {
		useEffect(() => {
			if (currPage !== page) setCurrPage(page);
		}, []);
	}

	return (
		<Router>
			<PageContext.Provider value={[currPage, SetPage]}>
				<Template>
					<Routes>
						<Route
							index
							element={
								<>
									<SocksPage setPage={SetPage} />
								</>
							}
						/>
						<Route path="socks">
							<Route
								path="add"
								element={
									<>
										<AddSock setPage={SetPage} />
									</>
								}
							/>
							<Route
								path="edit/:id"
								element={
									<>
										<EditSock setPage={SetPage} />
									</>
								}
							/>
							<Route
								index
								element={
									<>
										<SocksPage setPage={SetPage} />
									</>
								}
							/>
						</Route>
						<Route path="officers">
							<Route
								path="add"
								element={
									<>
										<AddOfficer setPage={SetPage} />
									</>
								}
							/>
							<Route
								path="edit/:id"
								element={
									<>
										<EditOfficer setPage={SetPage} />
									</>
								}
							/>
							<Route
								index
								element={
									<>
										<OfficersPage setPage={SetPage} />
									</>
								}
							/>
						</Route>
						<Route path="locations">
							<Route
								path="add"
								element={
									<>
										<AddLocation setPage={SetPage} />
									</>
								}
							/>
							<Route
								path="edit/:id"
								element={
									<>
										<EditLocation setPage={SetPage} />
									</>
								}
							/>
							<Route
								index
								element={
									<>
										<LocationsPage setPage={SetPage} />
									</>
								}
							/>
						</Route>
						<Route path="history">
							<Route
								path="add"
								element={
									<>
										<AddHistory setPage={SetPage} />
									</>
								}
							/>
							<Route
								path="edit/:id"
								element={
									<>
										<EditHistory setPage={SetPage} />
									</>
								}
							/>
							<Route
								index
								element={
									<>
										<HistoryPage setPage={SetPage} />
									</>
								}
							/>
						</Route>
					</Routes>
				</Template>
			</PageContext.Provider>
		</Router>
	);
}

export default App;
