import Header from "./components/Header/Header";

import Loader from "./Loader";
import "./App.css";
import Body from "./components/Body/Body";
import { useEffect, useState } from "react";

const App = () => {
	const [time, setTime] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setTime(true);
		}, 3000);
		return () => clearTimeout(timer);
	}, []);

	return (
		<div className="app">
			{time === true ? (
				<>
					<Header />
					<Body />
				</>
			) : (
				<Loader />
			)}
		</div>
	);
};

export default App;
