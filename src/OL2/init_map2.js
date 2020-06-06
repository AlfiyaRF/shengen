/* global OpenLayers */
import { checker } from "./index.js";
import { def_opt } from "./options.js";
import { points } from "./sorted_points.js";
import { filter_map2 } from "./filter_map2.js";
import marker_img from "../image/marker.png";

import "script-loader!@visallo/openlayers2/build/OpenLayers.js";
import "@visallo/openlayers2/theme/default/style.css";

/* eslint-disable */
const ol2ImgContext = require.context(
	"!!file-loader?name=img/[name].[ext]!@visallo/openlayers2/img/",
	true,
	/cloud-popup-relative.png$/,
);
ol2ImgContext.keys().forEach(ol2ImgContext);
/* eslint-enable */

export var markers_layer;
export var markers = [];

export function init_map2() {
	localStorage.setItem("view", "map2");
	if (checker.table) {
		document.getElementById("tbody_id").style.display = "none";
	}
	document.getElementById("map").style.display = "none";
	document.getElementById("map2").style.display = "block";

	function onPopupClose() {
		//'this' is the popup.
		var feature = this.feature;
		if (feature.markers_layer) {
			// The feature is not destroyed
			selector.unselect(feature);
		} else {
			// After "moveend" or "refresh" events on POIs layer all
			//features have been destroyed by the Strategy.BBOX
			this.destroy();
		}
	}

	function onFeatureSelect(evt) {
		var feature = evt.feature;
		var popup = new OpenLayers.Popup.FramedCloud(
			"popup2",
			feature.geometry.getBounds().getCenterLonLat(),
			new OpenLayers.Size(50, 50),
			"<div id='popup2'>" + feature.attributes.name + "</div>",
			null,
			true,
			onPopupClose,
		);
		feature.popup = popup;
		popup.feature = feature;
		map.addPopup(popup, true);
	}

	function onFeatureUnselect(evt) {
		var feature = evt.feature;
		if (feature.popup) {
			map.removePopup(feature.popup);
			//feature.popup.destroy();
			feature.popup = null;
		}
	}

	//if map wasn't init
	if (checker.map2 === false) {
		checker.map2 = true;

		var epsg4326 = new OpenLayers.Projection("EPSG:4326");

		var map = new OpenLayers.Map({
			div: document.getElementById("map2"),
			displayProjection: epsg4326,
			theme: null,
		});

		var osm = new OpenLayers.Layer.OSM("OSM");
		map.addLayer(osm);

		var get_projection = map.getProjectionObject(); //get map's projection and with method 'transform' transform it to epsg4326

		var zoom = 3;
		var center = new OpenLayers.LonLat(104.41406, 64.04336);
		if (window.innerWidth < 981) {
			zoom = 1.8;
			center = new OpenLayers.LonLat(81, 65);
		}
		map.setCenter(center.transform(epsg4326, get_projection), zoom);

		markers_layer = new OpenLayers.Layer.Vector("Markers");
		map.addLayer(markers_layer);

		var selector = new OpenLayers.Control.SelectFeature(markers_layer);
		map.addControl(selector);
		selector.activate();

		//put popup on the map
		markers_layer.events.on({
			featureselected: onFeatureSelect,
			featureunselected: onFeatureUnselect,
		});

		//create markers
		points.forEach(function(marker) {
			//from sorted_markers.json
			var lon = +marker["longitude"]; //+ makes str number
			var lat = +marker["latitude"];
			var popup_name =
				marker["city"] +
				", " +
				marker["address"] +
				".<br>" +
				marker["country"] +
				". " +
				marker["link"];

			var size = 12;
			if (window.innerWidth < 981) {
				size = 8;
			}

			marker = new OpenLayers.Feature.Vector(
				new OpenLayers.Geometry.Point(lon, lat).transform(
					epsg4326,
					get_projection,
				),
				{
					name: popup_name,
					country: marker["country"],
					city: marker["city"],
					link_name: marker["link"],
				},
				{
					externalGraphic: marker_img,
					graphicWidth: size,
					graphicHeight: size, //size of image
					graphicXOffset: -(size / 2),
					graphicYOffset: -size,
				},
			);
			markers.push(marker);
		});
		markers_layer.addFeatures(markers);
		if (
			sessionStorage["country"] != def_opt["country"] ||
			sessionStorage["city"] != def_opt["city"] ||
			sessionStorage["link"] != def_opt["link"]
		) {
			filter_map2();
		}
	}
}
