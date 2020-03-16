
const express = require("express")
const app = express()
const port = process.env.PORT || 3000;

class Server {

	constructor() {
		this.init();
	}

	init() {
		app.get('/', (req, res) => {
			res.send('Hello World')
		});

		app.get("/test", (req, res) => {
			res.json({ test: 1 })
		})
		app.listen(port);
	}
}

module.exports = Server;