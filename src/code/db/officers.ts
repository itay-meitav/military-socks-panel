import { query as execQuery } from './general'


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
        ${id ? `AND officers.id = ${id}` : ""}
        order by id
        ${limit ? `limit ${pre_page} offset ${offset}` : ""}`,
        values: [],
    };
    return execQuery("get", query).then(res => res.rows);
}

export function getOfficersShort() {
    interface OfficersShort {
        id: number,
        name: string
    }
    return execQuery('get', { text: 'SELECT id, name FROM officers', values: [] }).then(res => res.rows as OfficersShort[])
}

export function addOfficer(details: {
    name: string,
    armyIdNumber: string,
    email: string,
    phone: string
}) {
    const query = {
        text: `INSERT INTO officers(name, army_id_number, email, phone) VALUES ($1, $2, $3, $4) RETURNING id`,
        values: [
            details.name,
            details.armyIdNumber,
            details.email,
            details.phone,
        ],
    };
    return execQuery("add", query).then(data => data.rows[0].id);
}

export function editOfficer(id: number, values: {
    name: string,
    armyIdNumber: string,
    email: string,
    phone: string
}) {
    const query = {
        text: `UPDATE officers
        SET name = $1, army_id_number = $2, email = $3, phone = $4
        WHERE officers.id = $5 RETURNING *;`,
        values: [
            values.name,
            values.armyIdNumber,
            values.email,
            values.phone,
            id,
        ],
    };
    return execQuery("edit", query);
}


export function removeOfficer(id: number) {
    const query = {
        text: `DELETE FROM officers WHERE id = $1;`,
        values: [id],
    };
    return execQuery("delete", query);
}


export function isArmyIdExists(armyId: string) {
    const query = 'SELECT * from officers where army_id_number = $1'
    return execQuery('check', { text: query, values: [armyId] }).then(data => !!data.rows?.length)
}


export async function isOfficerExists(officerId: number) {
    const query = 'SELECT id from officers where id = $1'
    const officerExist = await execQuery('check', { text: query, values: [officerId] }).then(data => !!data.rows?.length)
    return officerExist
}