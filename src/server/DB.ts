import { Pool } from "pg";
import { stringify } from "querystring";
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false,
	},
});
connect();

async function connect() {
	try {
		await pool.connect();
		console.log("Connected to database");
	} catch (error) {
		console.log("Could not connect to database");
		console.log(error);
	}
}

// socks location, officer,
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
	return await executeQuery("get", query);
}

export async function countRows(
	table: "socks" | "locations" | "officers" | "locations_history"
) {
	try {
		return await pool
			.query("select count(*) as count from " + table)
			.then((res) => res.rows[0].count);
	} catch (e) {
		console.error(e);
	}
}

export function getLocations(
	page: number = 1,
	searchParams: { id?: number | undefined } = {}
) {
	if (page < 1) page = 1;
	const pre_page = 20;
	const { id } = searchParams;
	const offset = (page - 1) * pre_page;
	const limit = !id;
	const query = {
		text: `SELECT * from locations
         WHERE 1=1
        ${id ? `AND id = ${id}` : ""}
        ORDER BY id
        ${limit ? `limit ${pre_page} offset ${offset}` : ""}`,
		values: [],
	};
	return executeQuery("get", query);
}

export function getOfficers(
	page: number = 1,
	searchParams: { id?: number | undefined } = {}
) {
	if (page < 1) page = 1;
	const pre_page = 20;
	const { id } = searchParams;
	const limit = !id;
	const offset = (page - 1) * pre_page;
	const query = {
		text: `SELECT * from officers
         WHERE 1=1
        ${id ? `AND id = ${id}` : ""}
        order by id
        ${limit ? `limit ${pre_page} offset ${offset}` : ""}`,
		values: [],
	};
	return executeQuery("get", query);
}

export function getHistory(
	page: number = 1,
	searchParams: {
		id?: number | undefined;
		sock_id?: number | undefined;
	} = {}
) {
	if (page < 1) page = 1;
	const pre_page = 20;

	const offset = (page - 1) * pre_page;
	const { id, sock_id } = searchParams;
	const limit = !(id || sock_id);
	const query = {
		text: `SELECT locations_history.*, model, lon, lat from locations_history
		left join socks on socks.id = locations_history.sock_id
		left join locations on locations.id = locations_history.location_id
         WHERE 1=1
        ${id ? `AND id = ${id}` : ""}
        ${sock_id ? `AND sock_id = ${sock_id}` : ""}
        order by locations_history.id
       ${limit ? ` limit ${pre_page} offset ${offset}` : ""}
	   `,
		values: [],
	};
	return executeQuery("get", query);
}

export function addItem(type: string, details) {
	if (type == "sock") {
		const query = {
			text: `INSERT INTO socks(model, quantity, size, manufacturing_year, "location_id", "officer_id") VALUES ($1, $2, $3, $4, $5 $6)`,
			values: [
				details.model,
				details.quantity,
				details.size,
				details.year,
				details.location_id,
				details.officer_id,
			],
		};
		return executeQuery("add", query);
	} else if (type == "officer") {
		const query = {
			text: `INSERT INTO officers(name, army_id_number, email, phone) VALUES ($1, $2, $3, $4)`,
			values: [
				details.name,
				details.army_id_number,
				details.email,
				details.phone,
			],
		};
		return executeQuery("add", query);
	} else if (type == "location") {
		const query = {
			text: `INSERT INTO locations(nearest_city, base_name, lon,lat) VALUES($1, $2, $3, $4)`,
			values: [
				details.nearest_city,
				details.base_name,
				details.lon,
				details.lat,
			],
		};
		return executeQuery("add", query);
	} else if (type == "history") {
		const query = {
			text: `INSERT INTO locations_history(arrival_date, departure_date, location_id, sock_id) VALUES($1, $2, $3, $4)`,
			values: [
				details.arrival_date,
				details.departure_date,
				details.location_id,
				details.sock_id,
			],
		};
		return executeQuery("add", query);
	} else {
		console.log("Unknown item type");
	}
}

export async function editItem(type: string, itemId: number, details) {
	if (type == "sock") {
		const query = {
			text: `UPDATE socks
			SET model = $1, quantity = $2, size = $3, manufacturing_year = $4, location_id = $5, officer_id = $6
			WHERE socks.id = $7;`,
			values: [
				details.model,
				details.quantity,
				details.size,
				details.manufacturing_year,
				details.location_id,
				details.officer_id,
				itemId,
			],
		};
		await executeQuery("edit", query);
	} else if (type == "officer") {
		const query = {
			text: `UPDATE officers
			SET name = $1, army_id_number = $2, email = $3, phone = $4
			WHERE officers.id = $5;`,
			values: [
				details.name,
				details.army_id_number,
				details.email,
				details.phone,
				itemId,
			],
		};
		await executeQuery("edit", query);
	} else if (type == "location") {
		const query = {
			text: `UPDATE locations
			SET nearest_city = $1, base_name = $2, lon = $3, lat = $4
			WHERE locations.id = $5;`,
			values: [
				details.nearest_city,
				details.base_name,
				details.lon,
				details.lat,
				itemId,
			],
		};
		await executeQuery("edit", query);
	} else if (type == "history") {
		const query = {
			text: `UPDATE locations_history
			SET arrival_date = $1, departure_date = $2, location_id = $3, sock_id = $4
			WHERE locations_history.id = $5;`,
			values: [
				details.arrival_date,
				details.departure_date,
				details.location_id,
				details.sock_id,
				itemId,
			],
		};
		await executeQuery("edit", query);
	} else {
		console.log("Unknown item type");
	}
}

export async function removeItem(type: string, itemId: number) {
	if (type == "sock") {
		const query = {
			text: `DELETE FROM socks WHERE socks.id = $1;`,
			values: [itemId],
		};
		await executeQuery("delete", query);
	} else if (type == "officer") {
		const query = {
			text: `DELETE FROM officers WHERE officers.id = $1;`,
			values: [itemId],
		};
		await executeQuery("delete", query);
	} else if (type == "location") {
		const query = {
			text: `DELETE FROM locations WHERE locations.id = $1;`,
			values: [itemId],
		};
		await executeQuery("delete", query);
	} else if (type == "history") {
		const query = {
			text: `DELETE FROM locations_history WHERE locations_history.id = $1;`,
			values: [itemId],
		};
		await executeQuery("delete", query);
	}
}

async function executeQuery(
	type: string,
	query: { text: string; values: any[] }
) {
	if (["add", "edit", "delete"].includes(type)) {
		try {
			return await pool.query(query.text, query.values).then(() => {
				console.log(
					type[0].toUpperCase() + type.substring(1) + "ed Successfully"
				);
			});
		} catch (e) {
			console.error(e);
		}
	} else {
		try {
			return await pool.query(query.text, query.values).then((res) => {
				return res.rows;
			});
		} catch (e) {
			console.error(e);
		}
	}
}
