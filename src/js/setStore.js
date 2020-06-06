import {
	SET_SESSION_STORAGE,
	GET_POINTS,
	GET_OPTIONS,
	LOG_IN,
} from "./actions.js";

export default function setStore(previousState, action) {
	switch (action.type) {
		case SET_SESSION_STORAGE:
			return Object.assign({}, previousState, {
				sesStorage: action.sesStorage,
			});
		case GET_POINTS:
			return Object.assign({}, previousState, {
				points: action.points,
			});
		case GET_OPTIONS:
			return Object.assign({}, previousState, {
				options: action.options,
			});
		case LOG_IN:
			return Object.assign({}, previousState, {
				login: action.login,
			});
		default:
			return previousState;
	}
}
