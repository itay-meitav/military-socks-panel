import { query as execQuery } from "./general";
import { deleteHistoryBySockId } from "./history";

export async function getSocks(
	page: number = 1,
	searchParams: { id?: number | undefined; officer_id?: number | undefined }
) {
	if (page < 1) page = 1;

	const pre_page = 20;
	const { id, officer_id } = searchParams;
	const offset = (page - 1) * pre_page;
	const limit = !(id || officer_id);

	const query = {
		text: `SELECT socks.*,socks.manufacturing_year as year , locations.lat  , locations.lon, locations.base_name, locations.nearest_city, officers.name, officers.army_id_number, officers.email, officers.phone
        from socks
        left join locations on locations.id = socks.location_id
        left join officers on officers.id = socks.officer_id
		WHERE 1=1
         ${id ? `AND socks.id = ${id}` : ""}
         ${officer_id ? `AND officer_id = ${officer_id}` : ""}
        order by socks.id
        ${limit ? `limit ${pre_page} offset ${offset}` : ""}`,
		values: [],
	};
	return await execQuery("get", query).then((res) => res.rows);
}

export function getSocksShort() {
	interface SocksShort {
		id: number;
		model: string;
	}
	return execQuery("get", {
		text: "SELECT id, model FROM socks",
		values: [],
	}).then((res) => res.rows as SocksShort[]);
}

export function addSock(details: {
	model: string;
	quantity: number;
	size: number;
	year: string;
	locationId: number;
	officerId: number;
}) {
	const query = {
		text: `INSERT INTO socks(model, quantity, size, manufacturing_year, "location_id", "officer_id") VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
		values: [
			details.model,
			details.quantity,
			details.size,
			details.year,
			details.locationId,
			details.officerId,
		],
	};
	return execQuery("add", query).then((data) => data.rows[0].id);
}

export function editSock(
	id: number,
	values: {
		model: string;
		quantity: number;
		size: number;
		year: string;
		locationId: number;
		officerId: number;
	}
) {
	const query = {
		text: `UPDATE socks
        SET model = $1, quantity = $2, size = $3, manufacturing_year = $4, location_id = $5, officer_id = $6
        WHERE socks.id = $7;`,
		values: [
			values.model,
			values.quantity,
			values.size,
			values.year,
			values.locationId,
			values.officerId,
			id,
		],
	};
	return execQuery("edit", query);
}

export function deleteSock(id: number) {
	const query = {
		text: `DELETE FROM socks WHERE id = $1 RETURNING *;`,
		values: [id],
	};
	// await deleteHistoryBySockId(id)
	return execQuery("delete", query);
}

export async function isSockExists(sockId: number) {
	const query = "SELECT id from socks where id = $1";
	const sockExist = await execQuery("check", {
		text: query,
		values: [sockId],
	}).then((data) => !!data.rows?.length);
	return sockExist;
}
