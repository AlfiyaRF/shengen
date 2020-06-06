import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Authorization from "./authorization.js";
import AddPoints from "./addPoints.js";

class Admin extends Component {
	render() {
		return (
			<div id="adminForm">
				{this.props.login ? <AddPoints /> : <Authorization />}
			</div>
		);
	}
}

Admin.propTypes = { login: PropTypes.bool };

const mapStateToProps = function(store) {
	if (store === undefined) {
		return {};
	}
	return { login: store.login };
};

export default connect(mapStateToProps)(Admin);
