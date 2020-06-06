export default function geocoder(formData) {
	let itemCity = formData["cityLabel"];
	let fullAddress = formData["addressLabel"];

	let streetType = /(ул|пр|наб)\./;
	let streetNumber = /2-ой /;
	let streetAndHouse = fullAddress
		.replace(streetType, "")
		.replace(streetNumber, "")
		.split(" д.");

	let itemStreet = streetAndHouse[0];
	let fullHouse = streetAndHouse[1].split(" ");
	let itemHouse = fullHouse[0];

	let requestURL =
		"https://nominatim.openstreetmap.org/search?&street=" +
		itemStreet +
		" " +
		itemHouse +
		"&city=" +
		itemCity +
		"&country=Россия&format=json&limit=1";

	fetch(requestURL)
		.then(response => {
			return response.json();
		})
		.then(data => {
			formData["longitude"] = data[0]["lon"];
			formData["latitude"] = data[0]["lat"];
			return formData;
		})
		.then(formData => {
			fetch("https://hfk5pz8y5i.execute-api.us-east-1.amazonaws.com/api/new", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			}).then(document.getElementById("addForm").reset());
		});
}
