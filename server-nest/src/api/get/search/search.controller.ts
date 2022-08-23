import { Controller, Get } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('api/get/search-options')
export class SearchController {
  constructor(private readonly service: SearchService) {}

  @Get('socks')
  getSocksOptions() {
    console.log('api get search socks');

    return this.service.getSocksOptions();
  }

  @Get('locations')
  getLocationsOptions() {
    return this.service.getLocationsOptions();
  }

  @Get('officers')
  getOfficersOptions() {
    return this.service.getOfficersOptions();
  }
}
