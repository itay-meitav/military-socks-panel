import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SocksPage from "./componets/SocksPage";
import Render from "./componets/Render";

function App() {
	const [theme, setTheme] = React.useState("light");
	return (
		<div className={theme}>
			<h1>it is now in {theme} mode</h1>
			<button
				onClick={() => {
					setTheme((pre) => (pre == "light" ? "dark" : "light"));
				}}
			>
				change to {theme == "light" ? "dark" : "light"} mode
			</button>
		</div>
		// <Router>
		// 	<Routes>
		// 		<Route index={true} element={<Render text="index" />} />
		// 		<Route path="socks">
		// 			<Route path=":id" element={<Render text="socks with id" />} />
		// 			<Route path="add" element={<Render text="socks add" />} />
		// 			<Route index element={<Render text="socks index" />} />
		// 		</Route>
		// 	</Routes>
		// </Router>
	);
}

export default App;
