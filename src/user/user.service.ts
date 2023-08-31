import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './models/user.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepo: typeof User) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepo.create(createUserDto);
  }

  findAll() {
    return this.userRepo.findAll();
  }

  findOne(id: number) {
    return this.userRepo.findByPk(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepo.update(updateUserDto, {
      where: {
        id,
      },
    });
  }

  remove(id: number) {
    return this.userRepo.destroy({
      where: {
        id,
      },
    });
  }
}
