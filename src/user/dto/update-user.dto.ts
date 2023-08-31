import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  tg_id: number;
  is_bot: boolean;
  first_name: string;
  last_name: string;
  username: string;
}
