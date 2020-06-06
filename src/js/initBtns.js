import React from "react";
import { useHistory } from "react-router-dom";

import Btn from "./btn.js";

export default function Btns() {
	const history = useHistory();

	function clickBtn(event) {
		let elem1 = event.target.id.replace("Btn", "");
		localStorage.setItem("view", elem1);
		history.push("/" + elem1);
	}

	return (
		<div id="btns" className="row">
			<div
				className="btn-group btn-group-toggle justify-content-center mb-4 col-12"
				data-toggle="buttons"
			>
				<Btn id={"tableBtn"} value={"Таблица"} onClick={clickBtn} />
				<Btn id={"mapBtn"} value={"Карта"} onClick={clickBtn} />
			</div>
		</div>
	);
}
