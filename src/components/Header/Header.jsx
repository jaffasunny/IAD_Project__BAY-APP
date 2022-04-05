import React from "react";

import Sidebar from "../Sidebar/Sidebar";

import "./Header.css";

const Header = () => {
	return (
		<div className="header">
			<Sidebar />
			<div>
				<h3 className="header__title noselect">Bay app</h3>
			</div>
		</div>
	);
};

export default Header;
