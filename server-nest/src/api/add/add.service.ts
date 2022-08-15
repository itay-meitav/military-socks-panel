import { Injectable } from '@nestjs/common';
import query from 'src/db';

@Injectable()
export class AddService {
  async addLocation(details: {
    nearestCity: string;
    baseName: string;
    lon: string;
    lat: string;
  }) {
    const queryStr = `INSERT INTO locations(nearest_city, base_name, lon,lat) VALUES($1, $2, $3, $4) RETURNING id`;
    const queryParams = [
      details.nearestCity,
      details.baseName,
      details.lon,
      details.lat,
    ];

    return query(queryStr, queryParams).then((data) => data.rows[0].id);
  }

  async addSock(details: {
    model: string;
    quantity: number;
    size: number;
    year: string;
    locationId: number;
    officerId: number;
  }) {
    const queryStr = `INSERT INTO socks(model, quantity, size, manufacturing_year, "location_id", "officer_id") VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`;
    const queryParams = [
      details.model,
      details.quantity,
      details.size,
      details.year,
      details.locationId,
      details.officerId,
    ];

    return query(queryStr, queryParams).then((data) => data.rows[0].id);
  }

  async addHistory(details: {
    arrivalDate: Date;
    departureDate: Date;
    locationId: number;
    sockId: number;
  }) {
    const queryStr = `INSERT INTO locations_history(arrival_date, departure_date, location_id, sock_id) VALUES($1, $2, $3, $4) RETURNING id`,
      queryParams = [
        details.arrivalDate,
        details.departureDate,
        details.locationId,
        details.sockId,
      ];

    return query(queryStr, queryParams).then((data) => data.rows[0].id);
  }

  async addOfficer(details: {
    name: string;
    armyIdNumber: string;
    email: string;
    phone: string;
  }) {
    const queryStr = `INSERT INTO officers(name, army_id_number, email, phone) VALUES ($1, $2, $3, $4) RETURNING id`,
      queryParams = [
        details.name,
        details.armyIdNumber,
        details.email,
        details.phone,
      ];
    return query(queryStr, queryParams).then((data) => data.rows[0].id);
  }

  async isOfficerExists(officerId: number) {
    const queryStr = 'SELECT id from officers where id = $1';
    const officerExist = await query(queryStr, [officerId]).then(
      (data) => !!data.rows?.length,
    );
    return officerExist;
  }

  async isLocationExists(locationId: number) {
    const queryStr = 'SELECT id from locations where id = $1';
    const locationExist = await query(queryStr, [locationId]).then(
      (data) => !!data.rows?.length,
    );
    return locationExist;
  }

  async isBaseExists(baseName: string) {
    const queryStr = 'SELECT * from locations where base_name = $1';
    return query(queryStr, [baseName]).then((data) => !!data.rows?.length);
  }

  async isSockExists(sockId: number) {
    const queryStr = 'SELECT id from socks where id = $1';
    const sockExist = await query(queryStr, [sockId]).then(
      (data) => !!data.rows?.length,
    );
    return sockExist;
  }

  async isArmyIdExists(armyId: string) {
    const queryStr = 'SELECT * from officers where army_id_number = $1';
    return query(queryStr, [armyId]).then((data) => !!data.rows?.length);
  }
}
