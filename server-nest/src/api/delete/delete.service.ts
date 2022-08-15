import { Injectable } from '@nestjs/common';
import query from 'src/db';

@Injectable()
export class DeleteService {
  async deleteLocation(id: number) {
    const queryStr = `DELETE FROM locations WHERE id = $1;`,
      queryParams = [id];
    return query(queryStr, queryParams).then((res) => res.rows);
  }
  async deleteSock(id: number) {
    const queryStr = `DELETE FROM socks WHERE id = $1 RETURNING *;`,
      queryParams = [id];
    return query(queryStr, queryParams).then((res) => res.rows);
  }
  async deleteHistory(id: number) {
    const queryStr = `DELETE FROM history_locations WHERE id = $1;`,
      queryParams = [id];
    return query(queryStr, queryParams).then((res) => res.rows);
  }
  async deleteOfficer(id: number) {
    const queryStr = `DELETE FROM officers WHERE id = $1;`,
      queryParams = [id];
    return query(queryStr, queryParams).then((res) => res.rows);
  }
}
