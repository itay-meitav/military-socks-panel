import { Controller, Get, Param } from '@nestjs/common';
import { GetService } from '../get.service';
import { EditService } from './edit.service';

@Controller('api/get/edit')
export class EditController {
  constructor(private editService: EditService) {}

  @Get('sock/:id')
  async sock(@Param('id') id: string) {
    const [sock, locations, officers] = await Promise.all([
      this.editService.getSocks(2, 0, { id: Number(id) }),
      this.editService.getLocationsShort(),
      this.editService.getOfficersShort(),
    ]);
    if (sock?.length)
      return { sock: sock[0], locations, officers, success: true };
    else
      return {
        success: false,
        message: "could'nt find a sock with that id",
      };
  }

  @Get('officer/:id')
  async officer(@Param('id') id: string) {
    const officer = await this.editService.getOfficers(2, 0, {
      id: Number(id),
    });
    if (officer?.length) return { officer: officer[0], success: true };
    else
      return {
        success: false,
        message: "could'nt find an officer with that id",
      };
  }

  @Get('location/:id')
  async location(@Param('id') id: string) {
    const location = await this.editService.getLocations(2, 0, {
      id: Number(id),
    });
    if (location?.length) return { location: location[0], success: true };
    else
      return {
        success: false,
        message: "could'nt find a location with that id",
      };
  }

  @Get('history/:id')
  async history(@Param('id') id: string) {
    const [history, locations, socks] = await Promise.all([
      this.editService.getHistory(2, 0, { id: Number(id) }),
      this.editService.getLocationsShort(),
      this.editService.getSocksShort(),
    ]);
    if (history?.length)
      return { history: history[0], locations, socks, success: true };
    else
      return {
        success: false,
        message: "could'nt find a location history with that id",
      };
  }
}
