import { query as execQuery } from "./general";

interface ISearchParams {
  id?: number | undefined;
  orderBy?: string | undefined;
}

export function getOfficers(
  limit: number = 1,
  offset: number = 1,
  searchParams: ISearchParams = {}
) {
  const { id, orderBy } = searchParams;

  let index = 3;

  const queryStr = `SELECT * from officers
        WHERE 1=1
        ${id ? `AND officers.id = $${index++}` : ""}
        order by ${orderBy || "id"}
        ${limit ? `limit $1 offset $2` : ""}`;

  const queryParams = [limit, offset];
  id && queryParams.push(id);

  const query = {
    text: queryStr,
    values: queryParams,
  };
  console.log(queryParams);
  console.log(queryStr);
  return execQuery("get", query).then((res) => res.rows);
}

export function getOfficersShort() {
  interface OfficersShort {
    id: number;
    name: string;
  }
  return execQuery("get", {
    text: "SELECT id, name FROM officers",
    values: [],
  }).then((res) => res.rows as OfficersShort[]);
}

export function addOfficer(details: {
  name: string;
  armyIdNumber: string;
  email: string;
  phone: string;
}) {
  const query = {
    text: `INSERT INTO officers(name, army_id_number, email, phone) VALUES ($1, $2, $3, $4) RETURNING id`,
    values: [details.name, details.armyIdNumber, details.email, details.phone],
  };
  return execQuery("add", query).then((data) => data.rows[0].id);
}

export function editOfficer(
  id: number,
  values: {
    name: string;
    armyIdNumber: string;
    email: string;
    phone: string;
  }
) {
  const query = {
    text: `UPDATE officers
        SET name = $1, army_id_number = $2, email = $3, phone = $4
        WHERE officers.id = $5 RETURNING *;`,
    values: [values.name, values.armyIdNumber, values.email, values.phone, id],
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
  const query = "SELECT * from officers where army_id_number = $1";
  return execQuery("check", { text: query, values: [armyId] }).then(
    (data) => !!data.rows?.length
  );
}

export async function isOfficerExists(officerId: number) {
  const query = "SELECT id from officers where id = $1";
  const officerExist = await execQuery("check", {
    text: query,
    values: [officerId],
  }).then((data) => !!data.rows?.length);
  return officerExist;
}
