import React from "react";
import Sos from "../Sos/Sos";
import Weather from "../Weather/Weather";

import "./Body.css";

const Body = () => {
	return (
		<div className="body">
			<Sos />
			<Weather />
		</div>
	);
};

export default Body;
