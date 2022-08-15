import { Module } from '@nestjs/common';
import { AddController } from './add.controller';
import { AddService } from './add.service';

@Module({
  controllers: [AddController],
  providers: [AddService]
})
export class AddModule {}
