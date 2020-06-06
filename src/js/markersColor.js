import markers from "./initMap.js";

export var markersColor;

export function setColor() {
	var set = [];
	markers.forEach(element => set.push(element));
	return set;
}

markers.forEach(function(marker) {
	markersColor = countryColor[marker["country"]];
});

export var countryColor = {
	Австрия: "#CD5C5C",
	Бельгия: "#2E8B57",
	Венгрия: "#1E90FF",
};
