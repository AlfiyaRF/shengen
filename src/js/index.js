import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store.js";
import { defOpt } from "./options.js";
import Index from "./initIndex.js";

import "../scss/index.scss";

if (!sessionStorage["country"]) {
	sessionStorage.setItem("country", defOpt["country"]);
}
if (!sessionStorage["city"]) {
	sessionStorage.setItem("city", defOpt["city"]);
}
if (!sessionStorage["link"]) {
	sessionStorage.setItem("link", defOpt["link"]);
}

if (!localStorage["view"]) {
	localStorage.setItem("view", "table");
}

ReactDOM.render(
	<Router>
		<Provider store={store}>
			<Index />
		</Provider>
	</Router>,
	document.getElementById("root"),
);
