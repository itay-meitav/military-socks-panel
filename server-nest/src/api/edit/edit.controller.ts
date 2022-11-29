import { Body, Controller, Param, Post } from '@nestjs/common';
import { EditService } from './edit.service';

@Controller('api/edit')
export class EditController {
  constructor(private readonly editService: EditService) {}

  @Post('sock/:id')
  async editSock(@Body() body: any, @Param() params: any) {
    const { model, officerId, quantity, size, year, locationId } = body;
    console.log(body);

    const id = Number(params.id);
    console.log('edit sock');

    if (model && officerId && quantity && size && year && locationId) {
      const isExists = await this.editService.isSockExists(id);
      if (isExists) {
        return this.editService
          .editSock(id, {
            model,
            officerId,
            quantity,
            size,
            year,
            locationId,
          })
          .then((data) => {
            return { success: true, sock: data.rows[0] };
            // return({ success: false, message: "this is an error message" });
            // .redirect("/edit/sock/" + id);
          });
      } else {
        return { success: false, message: "this sock does'nt exists" };
      }
    } else {
      return {
        message:
          'make sure to send all the necessary fields' +
          JSON.stringify({
            model,
            officerId,
            quantity,
            size,
            year,
            locationId,
          }),
        success: false,
      };
    }
  }

  @Post('location/:id')
  async editLocation(@Body() body: any, @Param() params: any) {
    const { city, base, lon, lat } = body;
    const id = Number(params.id);

    if (city && base && lon && lat) {
      const isExists = await this.editService.isLocationExists(id);
      if (isExists) {
        return this.editService
          .editLocation(id, {
            nearestCity: city,
            baseName: base,
            lon,
            lat,
          })
          .then((data) => {
            // return({ success: false, message: "this sock does'nt exists" });
            return { success: true, location: data.rows[0] };
            // .redirect("/edit/location/" + id);
          });
      } else {
        return { success: false, message: "this location does'nt exists" };
      }
    } else {
      return {
        message: 'make sure you have all the necessary fields',
        success: false,
      };
    }
  }

  @Post('history/:id')
  async editHistory(@Body() body: any, @Param() params: any) {
    const { arrivalDate, departureDate, locationId, sockId } = body;
    const id = Number(params.id);

    if (arrivalDate && departureDate && locationId && sockId && id) {
      const [isExist, isSExists, isLExists] = await Promise.all([
        this.editService.isHistoryExists(id),
        this.editService.isSockExists(sockId),
        this.editService.isLocationExists(locationId),
      ]);

      if (isExist && isSExists && isLExists) {
        return this.editService
          .editHistory(id, {
            arrivalDate,
            departureDate,
            locationId,
            sockId,
          })
          .then((data) => {
            return { success: true, history: data.rows[0] };
            // .redirect("/edit/history/" + id);
          });
      } else {
        return {
          message: 'history/location/sock do not exist',
          success: false,
        };
      }
    } else {
      return {
        message: 'make sure to fill all the necessary fields',
        success: false,
      };
    }
  }

  @Post('officer/:id')
  async editOfficer(@Body() body: any, @Param() params: any) {
    const { email, name, phone, armyIdNumber } = body;
    const id = Number(params.id);

    if (email && name && phone && armyIdNumber) {
      const details = {
        email,
        name,
        phone,
        armyIdNumber,
      };
      const isExists = await this.editService.isOfficerExists(id);
      if (isExists) {
        return this.editService
          .editOfficer(id, {
            email,
            name,
            phone,
            armyIdNumber,
          })
          .then((data) => {
            // return ({ success: false, message: "this is an error message" });
            return { success: true, officer: data.rows[0] };
            // .redirect("/edit/officer/" + id);
          });
      } else {
        return { message: 'this officer does not exists', success: false };
      }
    } else {
      return {
        message: 'make sure you have all the fields needed',
        success: false,
      };
    }
  }
}
