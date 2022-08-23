import { Controller, Get, Query } from '@nestjs/common';
import { countRows } from 'src/db/general';
import { GetService } from './get.service';

@Controller('api/get')
export class GetController {
  constructor(private readonly getService: GetService) {}

  @Get('socks')
  async socks(@Query() query: any) {
    const limit = Number(query.limit) || 20;
    const offset = Number(query.offset) || 0;
    const id = Number(query.id) || undefined;
    const officer_id = Number(query.officer_id) || undefined;
    const location_id = Number(query.location_id) || undefined;
    const search = query.search || undefined;
    const orderBy = query.orderBy
      ? (query.orderBy + '')?.split(' ')[0].replace(/\-/g, '')
      : undefined;

    const [socks, count] = await Promise.all([
      this.getService.getSocks(limit, offset, {
        id,
        officer_id,
        location_id,
        orderBy,
        search,
      }),
      countRows('socks'),
    ]);

    const pages = Math.ceil(count / limit);

    return {
      socks,
      pages,
      success: true,
    };
  }

  @Get('locations')
  async locations(@Query() query: any) {
    const limit = Number(query.limit) || 20;
    const offset = Number(query.offset) || 0;
    const id = Number(query.id) || undefined;
    const search = query.search || undefined;
    const orderBy = query.orderBy
      ? (query.orderBy + '')?.split(' ')[0].replace(/\-/g, '')
      : undefined;
    const [locations, count] = await Promise.all([
      this.getService.getLocations(limit, offset, { id, orderBy, search }),
      countRows('locations'),
    ]);

    let pages = Math.ceil(count / limit);
    return {
      locations,
      pages,
      success: true,
    };
  }

  @Get('officers')
  async officers(@Query() query: any) {
    const limit = Number(query.limit) || 20;
    const offset = Number(query.offset) || 0;
    const id = Number(query.id) || undefined;
    const search = query.search || undefined;
    const orderBy = query.orderBy
      ? (query.orderBy + '')?.split(' ')[0].replace(/\-/g, '')
      : undefined;
    const [officers, count] = await Promise.all([
      this.getService.getOfficers(limit, offset, { id, orderBy, search }),
      countRows('officers'),
    ]);

    let pages = Math.ceil(count / 20);
    return {
      officers,
      pages,
      success: true,
    };
  }

  @Get('history')
  async history(@Query() query: any) {
    const limit = Number(query.limit) || 20;
    const offset = Number(query.offset) || 0;
    const id = Number(query.id) || undefined;
    const sock_id = Number(query.sock_id) || undefined;
    const location_id = Number(query.location_id) || undefined;
    const search = query.search || undefined;
    const orderBy = query.orderBy
      ? (query.orderBy + '')?.split(' ')[0].replace(/\-/g, '')
      : undefined;
    const [history, count] = await Promise.all([
      this.getService.getHistory(limit, offset, {
        id,
        sock_id,
        location_id,
        orderBy,
        search,
      }),
      countRows('locations_history'),
    ]);

    let pages = Math.ceil(count / 20);

    return {
      history,
      pages,
      success: true,
    };
  }
}
