import React from "react";
import "./css/App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SocksPage from "./components/SocksPage";
import Render from "./components/Render";
import Template from "./components/Template";
import OfficersPage from "./components/OfficersPage";
import LocationsPage from "./components/LocationsPage";
import HistoryPage from "./components/HistoryPage";
import AddOfficer from "./components/add/AddOfficer";
import AddSock from "./components/add/AddSock";
import AddLocation from "./components/add/AddLocation";
import AddHistory from "./components/add/AddHistory";
import EditHistory from "./components/edit/EditHistory";
import EditLocation from "./components/edit/EditLocation";
import EditOfficer from "./components/edit/EditOfficer";
import EditSock from "./components/edit/EditSock";

function App() {
	return (
		<Router>
			<Template>
				<Routes>
					<Route index element={<SocksPage />} />
					<Route path="socks">
						{/* <Route path=":id" element={<Render text="socks with id" />} /> */}
						<Route path="add" element={<AddSock />} />
						<Route path="edit/:id" element={<EditSock />} />
						<Route index element={<SocksPage />} />
					</Route>
					<Route path="officers">
						{/* <Route
							path=":id"
							element={<Render text="officers with id" />}
						/> */}
						<Route path="add" element={<AddOfficer />} />
						<Route path="edit/:id" element={<EditOfficer />} />
						<Route index element={<OfficersPage />} />
					</Route>
					<Route path="locations">
						{/* <Route
							path=":id"
							element={<Render text="locations with id" />}
						/> */}
						<Route path="add" element={<AddLocation />} />
						<Route path="edit/:id" element={<EditLocation />} />
						<Route index element={<LocationsPage />} />
					</Route>
					<Route path="history">
						{/* <Route
							path=":id"
							element={<Render text="history with id" />}
						/> */}
						<Route path="add" element={<AddHistory />} />
						<Route path="edit/:id" element={<EditHistory />} />
						<Route index element={<HistoryPage />} />
					</Route>
				</Routes>
			</Template>
		</Router>
	);
}

export default App;
