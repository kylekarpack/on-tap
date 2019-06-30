//import Flatstick from "./src/connectors/flatstick";
import ConnectorBase from "./src/connector-base";

const test = new ConnectorBase();

(async function() {

	const results = await test.execute();
	console.log(results);

})();