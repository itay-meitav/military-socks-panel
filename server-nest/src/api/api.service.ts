import { Injectable } from '@nestjs/common';

import resetDb from '../db/reset';

@Injectable()
export class ApiService {
  async resetDb() {
    try {
      await resetDb();
      return { success: true };
    } catch (error) {
      console.log(error);

      return { success: false, message: 'an error occurred', error };
    }
  }
}
