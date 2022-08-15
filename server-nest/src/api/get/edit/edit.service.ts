import { Injectable } from '@nestjs/common';
import query from 'src/db';
import { GetService } from '../get.service';

@Injectable()
export class EditService extends GetService {
  constructor() {
    super();
  }
  getLocationsShort() {
    return query('SELECT id, base_name FROM locations', []).then(
      (res) => res.rows as any[],
    );
  }

  getOfficersShort() {
    return query('SELECT id, name FROM officers', []).then(
      (res) => res.rows as any[],
    );
  }

  getSocksShort() {
    return query('SELECT id, model FROM socks', []).then(
      (res) => res.rows as any[],
    );
  }
}
