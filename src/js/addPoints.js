import React, { Component } from "react";

import geocoder from "./geocoder.js";

export default class AddPoints extends Component {
	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		const formData = {};
		const elements = event.target.elements;
		var filledInputs = 0;
		for (let i = 0; i < elements.length - 1; i++) {
			let name = elements[i].name;
			let value = elements[i].value;
			formData[name] = value;
			if (value.length) {
				filledInputs++;
			}
		}

		if (filledInputs === 5) {
			geocoder(formData);
		}
	}

	render() {
		return (
			<form
				id="addForm"
				className="form-group mt-5 pl-5"
				onSubmit={this.handleSubmit}
			>
				<div className="form-group row">
					<label className="col-form-label col-sm-2" htmlFor="linkLabel">
						Название:
					</label>
					<input
						className="form-control col-8"
						name="linkLabel"
						id="linkLabel"
						type="text"
					/>
				</div>
				<div className="form-group row">
					<label className="col-form-label col-sm-2" htmlFor="countryLabel">
						Страна:
					</label>
					<input
						className="form-control col-8"
						name="countryLabel"
						id="countryLabel"
						type="text"
					/>
				</div>
				<div className="form-group row">
					<label className="col-form-label col-sm-2" htmlFor="cityLabel">
						Город:
					</label>
					<input
						className="form-control col-8"
						name="cityLabel"
						id="cityLabel"
						type="text"
					/>
				</div>
				<div className="form-group row">
					<label className="col-form-label col-sm-2" htmlFor="addressLabel">
						Адрес:
					</label>
					<input
						className="form-control col-8"
						name="addressLabel"
						id="addressLabel"
						type="text"
					/>
				</div>
				<div className="form-group row">
					<label className="col-form-label col-sm-2" htmlFor="hrefLabel">
						Ссылка:
					</label>
					<input
						className="form-control col-8"
						name="hrefLabel"
						id="hrefLabel"
						type="url"
					/>
				</div>
				<div className="form-group row justify-content-center">
					<button
						id="addBtn"
						type="submit"
						className="btn btn-primary col-sm-3 mx-auto"
					>
						Добавить
					</button>
				</div>
			</form>
		);
	}
}
