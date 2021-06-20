import Chucks from "../../util/connectors/chucks"

export default async (req, res) => {
	const client = new Chucks();
	let data = await client.execute();
	res.status(200).json(data);
};
