import { useState } from "react";
import { Navbar } from "./components/Navbar.tsx";
import "./App.css";
import "./App.scss";

import Home from "./components/Home.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import BookDetails from "./components/BookDetails.tsx";

function App() {
	const [isDarkTheme, setIsDarkTheme] = useState(true);

	const toggleTheme = () => {
		setIsDarkTheme((prevTheme) => !prevTheme);
		console.log(isDarkTheme);
	};
	return (
		<Router>
			<div className={`app ${isDarkTheme ? "dark-theme" : "light-theme"}  `}>
				<Navbar toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/books/:id" element={<BookDetails />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
