import { Body, Controller, Post } from '@nestjs/common';
import { AddService } from './add.service';

@Controller('api/add')
export class AddController {
  constructor(private readonly addService: AddService) {}

  @Post('sock')
  async addSock(@Body() sockOTD: any) {
    console.log(sockOTD);

    const { model, officerId, quantity, size, year, locationId } = sockOTD;

    if (model && officerId && quantity && size && year && locationId) {
      const isExists = (
        await Promise.all([
          this.addService.isLocationExists(Number(locationId)),
          this.addService.isOfficerExists(Number(officerId)),
        ])
      ).every(Boolean);
      console.log(isExists);

      if (isExists) {
        const id = await this.addService.addSock({
          model,
          officerId,
          quantity,
          size,
          year,
          locationId,
        });
        console.log(id);

        if (id) return { id, success: true };
        else
          return {
            message: 'something went wrong please try again later',
            success: false,
          };
      } else {
        return {
          message: "don't play with our api, you'll get yourself banned",
          success: false,
        };
      }
    } else {
      return {
        message: 'make sure to send all the necessary fields',
        success: false,
      };
    }
  }

  @Post('location')
  async addLocation(@Body() locationOTD: any) {
    const { city, base, lon, lat } = locationOTD;

    if (city && base && lon && lat) {
      const isExist = await this.addService.isBaseExists(base);

      if (isExist) {
        return { message: 'this base already exists', success: false };
      } else {
        const id = await this.addService.addLocation({
          nearestCity: city,
          baseName: base,
          lon,
          lat,
        });
        return { id, success: true };
      }
    } else {
      return {
        message: 'make sure you have all the necessary fields',
        success: false,
      };
    }
  }

  @Post('history')
  async addHistory(@Body() historyOTD: any) {
    const { arrivalDate, departureDate, locationId, sockId } = historyOTD;

    if (arrivalDate && departureDate && locationId && sockId) {
      const isExists = (
        await Promise.all([
          this.addService.isLocationExists(Number(locationId)),
          this.addService.isSockExists(Number(sockId)),
        ])
      ).every(Boolean);

      if (isExists) {
        const id = await this.addService.addHistory({
          arrivalDate,
          departureDate,
          locationId,
          sockId,
        });
        return { id, success: true };
      } else {
        return {
          message: "don't play with our api. it's not a playground",
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

  @Post('officer')
  async addOfficer(@Body() officerOTD: any) {
    const { email, name, phone, armyIdNumber } = officerOTD;

    if (email && name && phone && armyIdNumber) {
      const details = {
        email,
        name,
        phone,
        armyIdNumber,
      };
      const isExists = await this.addService.isArmyIdExists(armyIdNumber);
      if (isExists)
        return { message: 'army id already exists', success: false };
      else {
        const id = await this.addService.addOfficer(details);
        return {
          id,
          success: !!id,
          message: id
            ? undefined
            : 'something went wrong while trying to save the officer',
        };
      }
    } else {
      return {
        message: 'make sure you have all the fields needed',
        success: false,
      };
    }
  }
}
