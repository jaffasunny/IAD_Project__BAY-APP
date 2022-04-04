import React from "react";

import "./Sos.css";

const Sos = () => {
	const toggleButton = (btn) => {
		btn.classList.toggle("sos__buttonAfter");
		btn.classList.toggle("sos__button");
	};

	return (
		<div className="sos">
			<button
				className="sos__button"
				onMouseDownCapture={(e) => {
					toggleButton(e.target);
				}}
				onMouseDown={(e) => {
					toggleButton(e.target);
				}}
			/>
		</div>
	);
};

export default Sos;
