import Chucks from "./src/connectors/chucks";

const test = new Chucks();

(async function() {

	const results = await test.execute();
	console.log(results);

})();