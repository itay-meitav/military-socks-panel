import { Injectable } from '@nestjs/common';
import { EditService } from '../edit/edit.service';

@Injectable()
export class AddService extends EditService {
  constructor() {
    super();
  }
}
