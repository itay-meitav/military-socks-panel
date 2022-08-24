import { Injectable } from '@nestjs/common';
import query from '../../db';

@Injectable()
export class GetService {
  async getSocks(
    limit: number = 20,
    offset: number = 0,
    filters: ISocksFilters,
  ) {
    const { id, officer_id, location_id, orderBy, search } = filters;

    let index = 3;
    const queryStr = `SELECT socks.*,socks.manufacturing_year as year , locations.lat  , locations.lon, locations.base_name, locations.nearest_city, officers.name, officers.army_id_number, officers.email, officers.phone
          from socks
          left join locations on locations.id = socks.location_id
          left join officers on officers.id = socks.officer_id
          WHERE 1=1
          ${id ? `AND socks.id = $${index++}` : ''}
          ${officer_id ? `AND officer_id = $${index++}` : ''}
          ${location_id ? `AND location_id = $${index++}` : ''}
          ${
            search
              ? `AND LOWER(model) LIKE '%'  || LOWER($${index++}) || '%'`
              : ''
          }
          order by ${orderBy || 'socks.id'}
          limit $1 offset $2	`;

    const queryParams: any[] = [limit, offset];

    id && queryParams.push(id);
    officer_id && queryParams.push(officer_id);
    location_id && queryParams.push(location_id);
    search && queryParams.push(search);
    return query(queryStr, queryParams).then((res) => res.rows);
  }

  async getLocations(
    limit: number = 1,
    offset: number = 1,
    searchParams: ILocationsFilters = {},
  ) {
    const { id, orderBy, search } = searchParams;
    let index = 3;
    const queryString = `SELECT * from locations
          WHERE 1=1
          ${id ? `AND locations.id = $${index++}` : ''}
          ${
            search
              ? `AND LOWER(locations.base_name) LIKE '%'  || LOWER($${index++}) || '%'`
              : ''
          }
          ORDER BY ${orderBy || 'id'}
          limit $1 offset $2`;

    const queryParams: any[] = [limit, offset];
    id && queryParams.push(id);
    search && queryParams.push(search);

    return query(queryString, queryParams).then((res) => res.rows);
  }

  async getHistory(
    limit: number = 1,
    offset: number = 1,
    searchParams: IHistoryFilters = {},
  ) {
    const { id, sock_id, location_id, orderBy, search } = searchParams;
    let index = 3;
    const queryStr = `SELECT locations_history.*, model, lon, lat, base_name from locations_history
              left join socks on socks.id = locations_history.sock_id
              left join locations on locations.id = locations_history.location_id
              WHERE 1=1
              ${id ? `AND locations_history.id = $${index++}` : ''}
              ${sock_id ? `AND sock_id = $${index++}` : ''}
              ${
                location_id
                  ? `AND locations_history.location_id = $${index++}`
                  : ''
              }
              ${
                search && false
                  ? `AND LOWER(something) LIKE '%'  || LOWER($${index++}) || '%'`
                  : ''
              }
              order by ${orderBy || 'locations_history.id'}
              limit $1 offset $2
              `;

    const queryParams: any[] = [limit, offset];

    id && queryParams.push(id);
    sock_id && queryParams.push(sock_id);
    location_id && queryParams.push(location_id);
    // search && queryParams.push(search);

    const result = await query(queryStr, queryParams).then((res) => res.rows);

    return result;
  }

  async getOfficers(
    limit: number = 1,
    offset: number = 1,
    searchParams: IOfficersFilters = {},
  ) {
    const { id, orderBy, search } = searchParams;

    let index = 3;

    const queryStr = `SELECT * from officers
          WHERE 1=1
          ${id ? `AND officers.id = $${index++}` : ''}
          ${
            search
              ? `AND LOWER(officers.name) LIKE '%'  || LOWER($${index++}) || '%'`
              : ''
          }
          order by ${orderBy || 'id'}
          ${limit ? `limit $1 offset $2` : ''}`;

    const queryParams: any[] = [limit, offset];
    id && queryParams.push(id);
    search && queryParams.push(search);
    return query(queryStr, queryParams).then((res) => res.rows);
  }
}

interface ISocksFilters {
  id?: number | undefined;
  officer_id?: number | undefined;
  location_id?: number | undefined;
  orderBy?: string;
  search?: string | undefined;
}

interface ILocationsFilters {
  id?: number | undefined;
  orderBy?: string | undefined;
  search?: string | undefined;
}

interface IHistoryFilters {
  id?: number | undefined;
  sock_id?: number | undefined;
  location_id?: number | undefined;
  search?: string | undefined;
  orderBy?: string | undefined;
}

interface IOfficersFilters {
  id?: number | undefined;
  orderBy?: string | undefined;
  search?: string | undefined;
}
