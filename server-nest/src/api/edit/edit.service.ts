import { Injectable } from '@nestjs/common';
import query from 'src/db';
import { AddService } from '../add/add.service';

@Injectable()
export class EditService extends AddService {
  editSock(
    id: number,
    values: {
      model: string;
      quantity: number;
      size: number;
      year: string;
      locationId: number;
      officerId: number;
    },
  ) {
    const queryStr = `UPDATE socks
              SET model = $1, quantity = $2, size = $3, manufacturing_year = $4, location_id = $5, officer_id = $6
              WHERE socks.id = $7;`,
      queryParams = [
        values.model,
        values.quantity,
        values.size,
        values.year,
        values.locationId,
        values.officerId,
        id,
      ];

    return query(queryStr, queryParams);
  }

  editLocation(
    id: number,
    values: {
      nearestCity: string;
      baseName: string;
      lon: string;
      lat: string;
    },
  ) {
    const queryStr = `UPDATE locations
              SET nearest_city = $1, base_name = $2, lon = $3, lat = $4
              WHERE locations.id = $5 RETURNING *;`,
      queryParams = [
        values.nearestCity,
        values.baseName,
        values.lon,
        values.lat,
        id,
      ];

    return query(queryStr, queryParams);
  }

  editHistory(
    id: number,
    values: {
      arrivalDate: Date;
      departureDate: Date;
      locationId: number;
      sockId: number;
    },
  ) {
    const queryStr = `UPDATE locations_history
			SET arrival_date = $1, departure_date = $2, location_id = $3, sock_id = $4
			WHERE locations_history.id = $5 RETURNING *;`,
      queryParams = [
        values.arrivalDate,
        values.departureDate,
        values.locationId,
        values.sockId,
        id,
      ];
    return query(queryStr, queryParams);
  }

  editOfficer(
    id: number,
    values: {
      name: string;
      armyIdNumber: string;
      email: string;
      phone: string;
    },
  ) {
    const queryStr = `UPDATE officers
          SET name = $1, army_id_number = $2, email = $3, phone = $4
          WHERE officers.id = $5 RETURNING *;`,
      queryParams = [
        values.name,
        values.armyIdNumber,
        values.email,
        values.phone,
        id,
      ];
    return query(queryStr, queryParams);
  }

  async isHistoryExists(id: number) {
    const queryStr = 'SELECT id from locations_history where id = $1';
    const historyExists = await query(queryStr, [id]).then(
      (data) => !!data.rows?.length,
    );
    return historyExists;
  }
}
