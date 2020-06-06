import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { setSessionStorage } from "./actions.js";
import { defOpt } from "./options.js";

class Selectors extends Component {
	constructor(props) {
		super(props);
		this.initOptions = this.initOptions.bind(this);
		this.props.setSessionStorage(sessionStorage);
	}

	filter(selectId) {
		const chosenOpt = document.getElementById(selectId);
		const chosenValue = chosenOpt.options[chosenOpt.selectedIndex].text;
		const chosenStr =
			chosenValue === defOpt["link"] ? chosenValue : chosenValue.slice(1, -1);

		if (selectId === "link") {
			sessionStorage.setItem(selectId, chosenStr);
		} else {
			sessionStorage.setItem(selectId, chosenValue);
		}

		this.props.setSessionStorage(sessionStorage);
	}

	initOptions(options, item) {
		var selectClass = "col-12 col-md-6 col-lg-3";
		var defVal = sessionStorage[options[item][0]];
		if (item === "optionCountry") {
			selectClass = "col-12 col-md-6 col-lg-2";
		}
		if (item === "optionAddress") {
			selectClass = "col-12 col-md-6 col-lg-4";
		}
		if (item === "optionName") {
			for (let i in options["optionName"]) {
				if (
					options["optionName"][i].includes(
						sessionStorage[options["optionName"][0]],
					)
				) {
					defVal = options["optionName"][i];
				}
			}
		}

		return (
			<div className={selectClass} key={item}>
				<select
					className="form-control"
					id={options[item][0]}
					defaultValue={defVal}
					onChange={this.filter.bind(this, options[item][0])}
				>
					{item === "optionAddress" ? (
						<option>{options[item].slice(1)}</option>
					) : (
						options[item].slice(1).map(opt => <option key={opt}>{opt}</option>)
					)}
				</select>
			</div>
		);
	}

	render() {
		const options = this.props.options || {};
		const items = Object.keys(options);

		return (
			<div id="selectors" className="row mb-4">
				{items.map(item => this.initOptions(options, item))}
			</div>
		);
	}
}

Selectors.propTypes = {
	chosenSelector: PropTypes.func,
	setSessionStorage: PropTypes.func,
	options: PropTypes.object,
};

const mapDispatchToProps = { setSessionStorage };

const mapStateToProps = function(store) {
	if (store === undefined) {
		return {};
	}
	return {
		options: store.options,
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Selectors);
