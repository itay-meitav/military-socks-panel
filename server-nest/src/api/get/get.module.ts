import { Module } from '@nestjs/common';
import { GetController } from './get.controller';
import { GetService } from './get.service';
import { EditModule } from './edit/edit.module';
import { AddModule } from './add/add.module';
import { SearchModule } from './search/search.module';

@Module({
  controllers: [GetController],
  providers: [GetService],
  imports: [EditModule, AddModule, SearchModule],
})
export class GetModule {}
