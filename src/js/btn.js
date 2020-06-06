import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Btn extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let btnClass = "btn btn-outline-primary col-4 col-lg-2";
		if (this.props.id === localStorage["view"] + "Btn") {
			btnClass = "btn btn-outline-primary col-4 col-lg-2 btn-active";
		}
		return (
			<button
				id={this.props.id}
				className={btnClass}
				type="radio"
				name="options"
				autoComplete="off"
				onClick={this.props.onClick}
			>
				{this.props.value}
			</button>
		);
	}
}

Btn.propTypes = {
	id: PropTypes.string,
	value: PropTypes.string,
	onClick: PropTypes.func,
};
