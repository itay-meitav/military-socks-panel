import { query as execQuery } from "./general";
// socks location, officer,
export * from "./socks";
export * from "./locations";
export * from "./history";
export * from "./officers";

export async function countRows(
	table: "socks" | "locations" | "officers" | "locations_history"
) {
	try {
		return await execQuery("count", {
			text: "select count(*) as count from " + table,
			values: [],
		}).then((res) => res.rows[0]?.count || 0);
	} catch (e) {
		console.error(e);
	}
}
