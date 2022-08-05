import { Pool } from "pg";
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
export async function getSocks(page: number = 1) {
	if (page < 1) page = 1;
	const pre_page = 20;
	const offset = (page - 1) * pre_page;
	const query = {
		text: `SELECT socks.*,socks.manufacturing_year as year , locations.lat  , locations.lon, locations.base_name, locations.nearest_city, officers.name, officers.army_id_number, officers.email, officers.phone
        from socks
        left join locations on locations.id = socks.location_id
        left join officers on officers.id = socks.officer_id
        order by socks.id
        limit ${pre_page} offset $1`,
		values: [offset],
	};
	try {
		return await pool
			.query(query.text, query.values)
			.then((res: any) => res.rows);
	} catch (e) {
		console.error(e);
	}
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

export async function getLocations(
	page: number = 1,
	id: number | undefined = undefined
) {
	if (page < 1) page = 1;
	const pre_page = 20;

	const offset = (page - 1) * pre_page;
	const query = {
		text: `SELECT * from locations
         WHERE 1=1
        ${id ? `AND id = ${id}` : ""}
        order by id
        limit ${pre_page} offset $1`,
		values: [offset],
	};
	console.log(query.text);

	try {
		return pool.query(query.text, query.values).then((res) => {
			console.log(res);

			return res.rows as any[];
		});
	} catch (e) {
		console.error(e);
	}
}

export async function getHistory(history) {
	const query = {
		text: `SELECT * FROM socks
        left join locations on locations.id = socks.location_id`,
		values: [history],
	};
	try {
		return pool.query(query.text, query.values).then((res: any) => res.rows);
	} catch (e) {
		console.error(e);
	} finally {
		console.log("done loading socks");
	}
}

export async function getOfficer(officer: string) {
	const query = {
		text: `SELECT * FROM socks
        left join locations on locations.id = socks.location_id`,
		values: [officer],
	};
	try {
		return pool.query(query.text, query.values).then((res: any) => res.rows);
	} catch (e) {
		console.error(e);
	} finally {
		console.log("done loading socks");
	}
}
