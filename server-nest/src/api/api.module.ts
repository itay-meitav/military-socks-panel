import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { GetModule } from './get/get.module';
import { AddModule } from './add/add.module';
import { DeleteModule } from './delete/delete.module';
import { EditModule } from './edit/edit.module';

@Module({
  controllers: [ApiController],
  providers: [ApiService],
  imports: [GetModule, AddModule, DeleteModule, EditModule],
})
export class ApiModule {}
