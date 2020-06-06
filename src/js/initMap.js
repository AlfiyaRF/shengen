import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "ol/ol.css";
import { Map, View, Overlay, Feature } from "ol";
import OSM from "ol/source/OSM";
import VectorSource from "ol/source/Vector";
import { Tile, Vector } from "ol/layer";
import { fromLonLat } from "ol/proj";
import Point from "ol/geom/Point";
import { Fill, Stroke, Circle, Style } from "ol/style";

import { defOpt } from "./options.js";

var markerColor = "#aaa";

class MapDiv extends Component {
	markersSource = null;
	popup = null;
	markers = [];

	constructor(props) {
		super(props);
		this.closePopup = this.closePopup.bind(this);
	}

	componentDidMount() {
		this.ininMap();
	}

	componentDidUpdate() {
		this.filterMarkers();
	}

	filterMarkers() {
		const points = this.props.mapPoints || [];
		const chosen = this.props.optionState;
		var radius = 5;
		var width = 1.25;
		if (window.innerWidth < 981) {
			radius = 4;
			width = 0.75;
		}
		const defStyle = [
			new Style({
				image: new Circle({
					fill: new Fill({ color: "#fff" }),
					stroke: new Stroke({ color: markerColor, width: width }),
					radius: radius,
				}),
			}),
		];
		const noneStyle = [new Style({ image: null })];

		if (points.length && !this.markers.length) {
			points.forEach(marker => {
				var lon = +marker["longitude"];
				var lat = +marker["latitude"];
				var popupName =
					marker["city"] +
					", " +
					marker["address"] +
					".<br>" +
					marker["country"] +
					". " +
					marker["link"];

				marker = new Feature({
					geometry: new Point(fromLonLat([lon, lat])),
					name: popupName,
					country: marker["country"],
					city: marker["city"],
					linkName: marker["link"],
				});

				marker.setStyle(defStyle);
				this.markers.push(marker);
			});
			this.markersSource.addFeatures(this.markers);
		}

		this.markers.forEach(function(feature) {
			var featureCountry = feature.get("country");
			var featureCity = feature.get("city");
			var featureName = feature.get("linkName");

			if (
				(featureCountry === chosen["country"] ||
					chosen["country"] === defOpt["country"]) &&
				(featureCity === chosen["city"] || chosen["city"] === defOpt["city"]) &&
				(featureName.includes(chosen["link"]) ||
					chosen["link"] === defOpt["link"])
			) {
				feature.setStyle(defStyle);
			} else if (
				featureCountry !== chosen["country"] ||
				featureCity !== chosen["city"] ||
				featureName !== chosen["link"]
			) {
				feature.setStyle(noneStyle);
			}
		});
	}

	ininMap() {
		this.markersSource = new VectorSource();
		var markersLayer = new Vector({ source: this.markersSource });
		this.popup = new Overlay({ element: document.getElementById("popup") });

		var zoom = 1.8;
		if (window.innerWidth > 700) {
			zoom = 3;
		}

		var map = new Map({
			layers: [new Tile({ source: new OSM() }), markersLayer],
			overlays: [this.popup],
			target: document.getElementById("map"),
			view: new View({
				center: fromLonLat([81, 61]),
				zoom: zoom,
			}),
		});

		var content = document.getElementById("popupContent");
		var closer = document.getElementById("popupCloser");

		map.on("click", evt => {
			var feature = map.forEachFeatureAtPixel(evt.pixel, function(feature) {
				return feature;
			});

			if (feature) {
				var coordinates = feature.getGeometry().getCoordinates();
				this.popup.setPosition(coordinates);
				var featureName = feature.get("name");
				content.innerHTML = "<p>" + featureName + "</p>";
			} else {
				this.popup.setPosition(undefined);
				closer.blur();
				return false;
			}
		});

		this.filterMarkers();
	}

	closePopup() {
		var closer = document.getElementById("popupCloser");
		this.popup.setPosition(undefined);
		closer.blur();
		return false;
	}

	render() {
		return (
			<div className="row">
				<div id="map" className="mapDiv col-12 mb-5 mapDisplay">
					<div id="popup" className="olPopup">
						<a
							href="#"
							id="popupCloser"
							className="olPopupCloser"
							onClick={this.closePopup}
						></a>
						<div id="popupContent" className="mt-3"></div>
					</div>
				</div>
			</div>
		);
	}
}

MapDiv.propTypes = {
	mapPoints: PropTypes.array,
	optionState: PropTypes.object,
};

const mapStateToProps = store => {
	if (store === undefined) {
		return {};
	}
	return {
		mapPoints: store.points,
		optionState: store.sesStorage,
	};
};

export default connect(mapStateToProps)(MapDiv);
