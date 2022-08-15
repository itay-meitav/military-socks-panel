import { Module } from '@nestjs/common';
import { GetController } from './get.controller';
import { GetService } from './get.service';
import { EditModule } from './edit/edit.module';
import { AddModule } from './add/add.module';

@Module({
  controllers: [GetController],
  providers: [GetService],
  imports: [EditModule, AddModule]
})
export class GetModule {}
