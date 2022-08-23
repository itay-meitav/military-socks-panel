import { Injectable } from '@nestjs/common';
import query from 'src/db';

@Injectable()
export class SearchService {
  getSocksOptions() {
    return query('SELECT distinct model as label, id from socks').then(
      (res) => res.rows,
    );
  }

  getOfficersOptions() {
    return query('SELECT distinct name as label, id from officers').then(
      (res) => res.rows,
    );
  }
  getLocationsOptions() {
    return query('SELECT distinct base_name as label, id from locations').then(
      (res) => res.rows,
    );
  }
}
