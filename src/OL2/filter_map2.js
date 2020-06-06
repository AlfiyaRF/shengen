import { checker } from "./index.js";
import { def_opt } from "./options.js";
import { markers_layer, markers } from "./init_map2.js";

export function filter_map2() {
	if (checker.map2) {
		//set visible markers om the map
		//if any content of marker doesn't equal selected value, marker doesn't display
		markers.forEach(function(feature) {
			var feature_country = feature.attributes.country;
			var feature_city = feature.attributes.city;
			var feature_name = feature.attributes.link_name;

			if (
				(feature_country == sessionStorage["country"] ||
					sessionStorage["country"] == def_opt["country"]) &&
				(feature_city == sessionStorage["city"] ||
					sessionStorage["city"] == def_opt["city"]) &&
				(feature_name.includes(sessionStorage["link"]) ||
					sessionStorage["link"] == def_opt["link"])
			) {
				feature.style.display = "auto";
			} else if (
				feature_country != sessionStorage["country"] ||
				feature_city != sessionStorage["city"] ||
				feature_name != sessionStorage["link"]
			) {
				feature.style.display = "none";
			}
			markers_layer.redraw();
		});
	}
}
