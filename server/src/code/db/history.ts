import { query as execQuery } from './general'


export async function getHistory(
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
        ${id ? `AND locations_history.id = ${id}` : ""}
        ${sock_id ? `AND sock_id = ${sock_id}` : ""}
        order by locations_history.id
       ${limit ? ` limit ${pre_page} offset ${offset}` : ""}
	   `,
        values: [],
    };
    const result = await execQuery("get", query).then(res => res.rows);

    return result
}

export function addHistory(details: {
    arrivalDate: Date,
    departureDate: Date,
    locationId: number,
    sockId: number
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
    return execQuery("add", query).then(data => data.rows[0].id);
}

export function editHistory(id: number, values: {
    arrivalDate: Date,
    departureDate: Date,
    locationId: number,
    sockId: number
}) {

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
    return execQuery('delete', {
        text: 'delete from locations_history where sock_id = $1',
        values: [sockId]
    })
}

export async function isHistoryExists(id: number) {
    const query = 'SELECT id from locations_history where id = $1'
    const historyExists = await execQuery('check', { text: query, values: [id] }).then(data => !!data.rows?.length)
    return historyExists
}