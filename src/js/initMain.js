import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getPointsSuccess, getOptionsSuccess } from "./actions.js";
import Btns from "./initBtns.js";
import Selectors from "./initSelectors.js";
import Table from "./initTable.js";
import MapDiv from "./initMap.js";

class Main extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		fetch("https://hfk5pz8y5i.execute-api.us-east-1.amazonaws.com/api/points")
			.then(response => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error("Something went wrong ...");
				}
			})
			.then(data => {
				this.props.getPointsSuccess(data);
			});

		fetch("https://hfk5pz8y5i.execute-api.us-east-1.amazonaws.com/api/options")
			.then(response => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error("Something went wrong ...");
				}
			})
			.then(data => {
				this.props.getOptionsSuccess(data);
			});
	}

	render() {
		return (
			<main role="main" className="container">
				<div id="description" className="m-4">
					<p className="text-center">
						На данном сайте собрана информация обо всех визовых центрах,
						консульствах и посольствах, где жители России могут получить
						шенгенскую визу. Вы можете сразу выбрать удобный формат просмотра.
					</p>
				</div>
				<Btns />
				<Selectors />
				<Switch>
					<Route path="/table">
						<Table />
					</Route>
					<Route path="/map">
						<MapDiv />
					</Route>
					<Route path="/">
						{localStorage["view"] !== "map" ? <Table /> : <MapDiv />}
					</Route>
				</Switch>
			</main>
		);
	}
}

Main.propTypes = {
	getPointsSuccess: PropTypes.func,
	getOptionsSuccess: PropTypes.func,
};

const mapDispatchToProps = {
	getPointsSuccess,
	getOptionsSuccess,
};

export default connect(null, mapDispatchToProps)(Main);
