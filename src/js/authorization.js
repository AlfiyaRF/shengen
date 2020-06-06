import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { logIn } from "./actions.js";

class Authorization extends Component {
	constructor(props) {
		super(props);
		this.state = {
			login: "",
			password: "",
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	handleSubmit(event) {
		fetch("https://hfk5pz8y5i.execute-api.us-east-1.amazonaws.com/api/admin", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(this.state),
		})
			.then(response => {
				return response.json();
			})
			.then(data => {
				this.props.logIn(data);
			});
		event.preventDefault();
	}

	render() {
		return (
			<form className="form-group mt-5" onSubmit={this.handleSubmit}>
				<div className="form-group row justify-content-center">
					<label className="col-form-label col-sm-2" htmlFor="login">
						Login:
					</label>
					<input
						className="form-control col-sm-4"
						name="login"
						id="login"
						type="text"
						placeholder="Enter login"
						value={this.state.login}
						onChange={this.handleChange}
					/>
				</div>
				<div className="form-group row justify-content-center">
					<label className="col-form-label col-sm-2" htmlFor="password">
						Password:
					</label>
					<input
						className="form-control col-sm-4"
						name="password"
						id="password"
						type="password"
						placeholder="Enter password"
						value={this.state.password}
						onChange={this.handleChange}
					/>
				</div>
				<div className="form-group row justify-content-center">
					<button type="submit" className="btn btn-primary col-sm-3">
						Sign in
					</button>
				</div>
			</form>
		);
	}
}

Authorization.propTypes = { logIn: PropTypes.func };

const mapDispatchToProps = { logIn };

export default connect(null, mapDispatchToProps)(Authorization);
