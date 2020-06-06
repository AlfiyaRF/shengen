import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { defOpt } from "./options.js";

class Table extends Component {
	constructor() {
		super();
		this.filterTable = this.filterTable.bind(this);
	}

	filterTable(point, chosen) {
		if (
			(point.country === chosen["country"] ||
				chosen["country"] === defOpt["country"]) &&
			(point.city === chosen["city"] || chosen["city"] === defOpt["city"]) &&
			(point.link.includes(chosen["link"]) || chosen["link"] === defOpt["link"])
		) {
			return (
				<tr className="tbodyTr trDisplay" key={point.id}>
					<td className="align-middle tdCountry">{point.country}</td>
					<td className="align-middle tdCity ">{point.city}</td>
					<td className="align-middle tdLink">
						<a href={point.href}>{point.link}</a>
					</td>
					<td className="align-middle tdAddress">{point.address}</td>
				</tr>
			);
		}
	}

	render() {
		const defaultTable = [
			{
				country: "Страна",
				city: "Город",
				link: "Название",
				address: "Адрес",
				id: -1,
			},
		];
		const points = this.props.tablePoints || defaultTable;
		const chosen = this.props.optionState;

		return (
			<table className="table table-bordered table-hover table-sm">
				<tbody id="tbodyId" className="tbody tableDisplay">
					{points.map(point => this.filterTable(point, chosen))}
				</tbody>
			</table>
		);
	}
}

Table.propTypes = {
	tablePoints: PropTypes.array,
	optionState: PropTypes.object,
};

const mapStateToProps = function(store) {
	if (store === undefined) {
		return {};
	}
	return {
		tablePoints: store.points,
		optionState: store.sesStorage,
	};
};

export default connect(mapStateToProps)(Table);
