import { Controller, Get, Query, Param, Delete } from '@nestjs/common';
import { DeleteService } from './delete.service';

@Controller('api/delete')
export class DeleteController {
  constructor(private deleteService: DeleteService) {}
  @Delete('sock/:id')
  async sock(@Param('id') id: number) {
    try {
      await this.deleteService.deleteSock(id);
      return { success: true };
    } catch {
      return { success: false };
    }
  }

  @Delete('officer/:id')
  async officer(@Param('id') id: number) {
    try {
      await this.deleteService.deleteOfficer(id);

      return { success: true };
    } catch {
      return { success: false };
    }
  }
  @Delete('history/:id')
  async history(@Param('id') id: number) {
    try {
      await this.deleteService.deleteHistory(id);

      return { success: true };
    } catch {
      return { success: false };
    }
  }
  @Delete('location/:id')
  async location(@Param('id') id: number) {
    try {
      await this.deleteService.deleteLocation(id);

      return { success: true };
    } catch {
      return { success: false };
    }
  }
}
