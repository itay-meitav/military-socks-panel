import { Controller, Get, Header, HttpCode, Param, Res } from '@nestjs/common';
import { AddService } from './add.service';

@Controller('api/get/add')
export class AddController {
  constructor(private addService: AddService) {}
  @Get('sock')
  async sock() {
    const [locations, officers] = await Promise.all([
      this.addService.getLocationsShort(),
      this.addService.getOfficersShort(),
    ]);
    return { locations, officers };
  }
  @Get('history')
  async history() {
    const [locations, socks] = await Promise.all([
      this.addService.getLocationsShort(),
      this.addService.getSocksShort(),
    ]);
    return { locations, socks };
  }
}
