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
export async function getSocks(page: number = 1, searchParams: { id?: number | undefined, officer_id?: number | undefined }) {
	if (page < 1) page = 1;

	const pre_page = 20;
	const { id, officer_id } = searchParams
	const offset = (page - 1) * pre_page;
	const limit = !(id || officer_id)
	const query = {
		text: `SELECT socks.*,socks.manufacturing_year as year , locations.lat  , locations.lon, locations.base_name, locations.nearest_city, officers.name, officers.army_id_number, officers.email, officers.phone
        from socks
        left join locations on locations.id = socks.location_id
        left join officers on officers.id = socks.officer_id
		WHERE 1=1
         ${id ? `AND socks.id = ${id}` : ""}
         ${officer_id ? `AND officer_id = ${officer_id}` : ""}
        order by socks.id
        ${limit ? `limit ${pre_page} offset ${offset}` : ''}`,
		values: [],
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
	searchParams: { id?: number | undefined } = {}
) {
	if (page < 1) page = 1;
	const pre_page = 20;
	const { id } = searchParams
	const offset = (page - 1) * pre_page;
	const limit = !id
	const query = {
		text: `SELECT * from locations
         WHERE 1=1
        ${id ? `AND id = ${id}` : ""}
        order by id
        ${limit ? `limit ${pre_page} offset ${offset}` : ''}`,
		values: [],
	};


	try {
		return pool.query(query.text, query.values).then((res) => {

			return res.rows as any[];
		});
	} catch (e) {
		console.error(e);
	}
}


export async function getOfficers(
	page: number = 1,
	searchParams: { id?: number | undefined } = {}
) {
	if (page < 1) page = 1;
	const pre_page = 20;
	const { id } = searchParams
	const limit = !id
	const offset = (page - 1) * pre_page;
	const query = {
		text: `SELECT * from officers
         WHERE 1=1
        ${id ? `AND id = ${id}` : ""}
        order by id
        ${limit ? `limit ${pre_page} offset ${offset}` : ''}`,
		values: [],
	};


	try {
		return pool.query(query.text, query.values).then((res) => {

			return res.rows as any[];
		});
	} catch (e) {
		console.error(e);
	}
}



export async function getHistory(
	page: number = 1,
	searchParams: {
		id?: number | undefined,
		sock_id?: number | undefined
	} = {}
) {
	if (page < 1) page = 1;
	const pre_page = 20;

	const offset = (page - 1) * pre_page;
	const { id, sock_id } = searchParams
	const limit = !(id || sock_id)
	const query = {
		text: `SELECT locations_history.*, model, lon, lat from locations_history
		left join socks on socks.id = locations_history.sock_id
		left join locations on locations.id = locations_history.location_id
         WHERE 1=1
        ${id ? `AND id = ${id}` : ""}
        ${sock_id ? `AND sock_id = ${sock_id}` : ""}
        order by locations_history.id
       ${limit ? ` limit ${pre_page} offset ${offset}` : ''}
	   `,
		values: [],
	};


	try {
		return pool.query(query.text, query.values).then((res) => {

			return res.rows as any[];
		});
	} catch (e) {
		console.error(e);
	}
}


// export async function getHistory(history) {
// 	const query = {
// 		text: `SELECT * FROM socks
//         left join locations on locations.id = socks.location_id`,
// 		values: [history],
// 	};
// 	try {
// 		return pool.query(query.text, query.values).then((res: any) => res.rows);
// 	} catch (e) {
// 		console.error(e);
// 	} finally {
// 		console.log("done loading socks");
// 	}
// }

// export async function getOfficer(officer: string) {
// 	const query = {
// 		text: `SELECT * FROM socks
//         left join locations on locations.id = socks.location_id`,
// 		values: [officer],
// 	};
// 	try {
// 		return pool.query(query.text, query.values).then((res: any) => res.rows);
// 	} catch (e) {
// 		console.error(e);
// 	} finally {
// 		console.log("done loading socks");
// 	}
// }
