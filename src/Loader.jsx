import React from "react";
import SkeletonLoader from "tiny-skeleton-loader-react";
import { images } from "./constants/index";

import "./Loader.css";
console.log(images);
const Loader = () => {
	return (
		<div className="loader">
			<div className="loader__components">
				<img className="loader__logo" src={images.SidebarLogo} alt="" />
				<SkeletonLoader background={"#D3ECFF"} className="loader__animation" />
			</div>
		</div>
	);
};

export default Loader;
