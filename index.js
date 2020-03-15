//import Flatstick from "./src/connectors/flatstick";
const Flatstick = require("./src/connectors/flatstick");

const test = new Flatstick();

(async function() {

	const results = await test.execute();
	console.log(results);

})();