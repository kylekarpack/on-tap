import { useEffect, useState } from "react";

export default function useApi(url) {
	const [data, setData] = useState();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();
	const [refreshIndex, setRefreshIndex] = useState(0);

	const refresh = () => {
		setRefreshIndex(refreshIndex + 1);
	};

	useEffect(() => {
		let cancelled = false;
		setLoading(true);
		setError(false);
		fetch(url)
			.then(
				(r) => {
					if (!cancelled) {
						r.json().then(
							(d) => {
								setData(d);
								setLoading(false);
							},
							(err) => {
								setError(err);
							}
						);
					}
				},
				(err) => {
					setError(err);
				}
			)
			.finally(() => setLoading(false));
		return () => {
			cancelled = true;
		};
	}, [url, refreshIndex]);

	return {
		data,
		loading,
		error,
		refresh,
	};
}
