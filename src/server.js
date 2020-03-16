
const express = require("express");
const Flatstick = require("./connectors/flatstick");

const app = express()
const port = process.env.PORT || 3000;

class Server {

	async get(Client, res) {
		const client = new Client();
		let data = await client.execute();
		res.json(data);
	}

	init() {
		app.get('/', (req, res) => {
			res.sendFile(__dirname + '/templates/index.html');
		});

		app.get("/flatstick", async (req, res) => {
			this.get(Flatstick, res);
		})

		app.listen(port);
	}
}

module.exports = Server;