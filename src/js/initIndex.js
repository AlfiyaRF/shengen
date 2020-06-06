import React from "react";
import { Switch, Route } from "react-router-dom";
import { useHistory } from "react-router-dom";

import Main from "./initMain.js";
import Admin from "./admin.js";

export default function Index() {
	const history = useHistory();

	function userClick(event) {
		history.push("/" + event.target.id);
	}

	return (
		<React.Fragment>
			<nav className="navbar navbar-expand-md navbar-dark bg-primary sticky-top justify-content-between">
				<a id="guest" className="navbar-brand" href="" onClick={userClick}>
					Шенген
				</a>
				<a id="admin" className="nav-item nav-link" href="" onClick={userClick}>
					Admin
				</a>
			</nav>
			<Switch>
				<Route path="/admin">
					<Admin />
				</Route>
				<Route path="/">
					<Main />
				</Route>
			</Switch>
		</React.Fragment>
	);
}
