import Flatstick from "../../util/connectors/flatstick"

export default async (req, res) => {
	const client = new Flatstick();
	let data = await client.execute();
	res.status(200).json(data);
};
