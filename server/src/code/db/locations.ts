
import { query as execQuery } from './general'

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
        ${id ? `AND locations.id = ${id}` : ""}
        ORDER BY id
        ${limit ? `limit ${pre_page} offset ${offset}` : ""}`,
        values: [],
    };
    return execQuery("get", query).then(res => res.rows);
}

export function getLocationsShort() {
    interface LocationsShort {
        id: number,
        base_name: string
    }
    return execQuery('get', { text: 'SELECT id, base_name FROM locations', values: [] }).then(res => res.rows as LocationsShort[])
}

export function addLocation(details: {
    nearestCity: string,
    baseName: string,
    lon: string,
    lat: string
}) {
    const query = {
        text: `INSERT INTO locations(nearest_city, base_name, lon,lat) VALUES($1, $2, $3, $4) RETURNING id`,
        values: [
            details.nearestCity,
            details.baseName,
            details.lon,
            details.lat,
        ],
    };
    return execQuery("add", query).then(data => data.rows[0].id);
}

export function editLocation(id: number, values: {
    nearestCity: string,
    baseName: string,
    lon: string,
    lat: string
}) {
    const query = {
        text: `UPDATE locations
			SET nearest_city = $1, base_name = $2, lon = $3, lat = $4
			WHERE locations.id = $5 RETURNING *;`,
        values: [
            values.nearestCity,
            values.baseName,
            values.lon,
            values.lat,
            id,
        ],
    };
    return execQuery("edit", query);
}


export function removeLocation(id: number) {
    const query = {
        text: `DELETE FROM locations WHERE id = $1;`,
        values: [id],
    };
    return execQuery("delete", query);
}


export function isBaseExists(baseName: string) {
    const query = 'SELECT * from locations where base_name = $1'
    return execQuery('check', { text: query, values: [baseName] }).then(data => !!data.rows?.length)
}




export async function isLocationExists(locationId: number) {
    const query = 'SELECT id from locations where id = $1'
    const locationExist = await execQuery('check', { text: query, values: [locationId] }).then(data => !!data.rows?.length)
    return locationExist
}