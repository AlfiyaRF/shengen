export const SET_SESSION_STORAGE = "SET_SESSION_STORAGE";
export const GET_POINTS = "GET_POINTS";
export const GET_OPTIONS = "GET_OPTIONS";
export const LOG_IN = "LOG_IN";

export function setSessionStorage(storage) {
	return {
		type: SET_SESSION_STORAGE,
		sesStorage: {
			country: storage["country"],
			city: storage["city"],
			link: storage["link"],
		},
	};
}

export function getPointsSuccess(data) {
	return { type: GET_POINTS, points: data };
}

export function getOptionsSuccess(data) {
	return { type: GET_OPTIONS, options: data };
}

export function logIn(login) {
	return { type: LOG_IN, login: login };
}
