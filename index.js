//import Flatstick from "./src/connectors/flatstick";
//const Flatstick = require("./src/connectors/flatstick");
const Server = require("./src/server");

const test = new Flatstick();

(async function() {

	const server = new Server();
	server.init();

	// const results = await test.execute();
	// console.log(results);

})();