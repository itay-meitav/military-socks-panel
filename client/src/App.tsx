import React from "react";
import "./css/App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SocksPage from "./components/SocksPage";
import Render from "./components/Render";
import Template from "./components/Template";
import OfficersPage from "./components/OfficersPage";
import LocationsPage from "./components/LocationsPage";
import HistoryPage from "./components/HistoryPage";

function App() {
	return (
		<Router>
			<Template>
				<Routes>
					<Route index={true} element={<SocksPage />} />
					<Route path="socks">
						<Route path=":id" element={<Render text="socks with id" />} />
						<Route path="add" element={<Render text="socks add" />} />
						<Route path="edit" element={<Render text="socks edit" />} />
						<Route index element={<SocksPage />} />
					</Route>
					<Route path="officers">
						<Route
							path=":id"
							element={<Render text="officers with id" />}
						/>
						<Route path="add" element={<Render text="officers add" />} />
						<Route
							path="edit"
							element={<Render text="officers edit" />}
						/>
						<Route index element={<OfficersPage />} />
					</Route>
					<Route path="locations">
						<Route
							path=":id"
							element={<Render text="locations with id" />}
						/>
						<Route path="add" element={<Render text="locations add" />} />
						<Route
							path="edit"
							element={<Render text="locations edit" />}
						/>
						<Route index element={<LocationsPage />} />
					</Route>
					<Route path="history">
						<Route
							path=":id"
							element={<Render text="history with id" />}
						/>
						<Route path="add" element={<Render text="history add" />} />
						<Route path="edit" element={<Render text="history edit" />} />
						<Route index element={<HistoryPage />} />
					</Route>
				</Routes>
			</Template>
		</Router>
	);
}

export default App;
