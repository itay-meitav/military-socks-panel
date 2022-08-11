import { query as execQuery } from "./general";

interface ISearchParams {
	id?: number | undefined;
	sock_id?: number | undefined;
	location_id?: number | undefined;
	orderBy?: string | undefined;
}

export async function getHistory(
	limit: number = 1,
	offset: number = 1,
	searchParams: ISearchParams = {}
) {
	const { id, sock_id, location_id, orderBy } = searchParams;
	let index = 3;
	const queryStr = `SELECT locations_history.*, model, lon, lat, base_name from locations_history
            left join socks on socks.id = locations_history.sock_id
            left join locations on locations.id = locations_history.location_id
            WHERE 1=1
            ${id ? `AND locations_history.id = $${index++}` : ""}
            ${sock_id ? `AND sock_id = $${index++}` : ""}
            ${
					location_id
						? `AND locations_history.location_id = $${index++}`
						: ""
				}
            order by ${orderBy || "locations_history.id"}
            limit $1 offset $2
            `;

	const queryParams = [limit, offset];

	id && queryParams.push(id);
	sock_id && queryParams.push(sock_id);
	location_id && queryParams.push(location_id);

	const query = {
		text: queryStr,
		values: queryParams,
	};

	const result = await execQuery("get", query).then((res) => res.rows);

	return result;
}

export function addHistory(details: {
	arrivalDate: Date;
	departureDate: Date;
	locationId: number;
	sockId: number;
}) {
	const query = {
		text: `INSERT INTO locations_history(arrival_date, departure_date, location_id, sock_id) VALUES($1, $2, $3, $4) RETURNING id`,
		values: [
			details.arrivalDate,
			details.departureDate,
			details.locationId,
			details.sockId,
		],
	};
	return execQuery("add", query).then((data) => data.rows[0].id);
}

export function editHistory(
	id: number,
	values: {
		arrivalDate: Date;
		departureDate: Date;
		locationId: number;
		sockId: number;
	}
) {
	const query = {
		text: `UPDATE locations_history
			SET arrival_date = $1, departure_date = $2, location_id = $3, sock_id = $4
			WHERE locations_history.id = $5 RETURNING *;`,
		values: [
			values.arrivalDate,
			values.departureDate,
			values.locationId,
			values.sockId,
			id,
		],
	};
	return execQuery("edit", query);
}

export function deleteHistory(id: number) {
	const query = {
		text: `DELETE FROM locations_history WHERE id = $1;`,
		values: [id],
	};
	return execQuery("delete", query);
}

export function deleteHistoryBySockId(sockId: number) {
	return execQuery("delete", {
		text: "delete from locations_history where sock_id = $1",
		values: [sockId],
	});
}

export async function isHistoryExists(id: number) {
	const query = "SELECT id from locations_history where id = $1";
	const historyExists = await execQuery("check", {
		text: query,
		values: [id],
	}).then((data) => !!data.rows?.length);
	return historyExists;
}
