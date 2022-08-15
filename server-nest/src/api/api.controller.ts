import { Controller, Get, Put } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
  constructor(private apiService: ApiService) {}
  @Put('reset')
  async resetDb() {
    return this.apiService.resetDb();
  }
}
