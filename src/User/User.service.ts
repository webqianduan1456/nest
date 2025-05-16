import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Entity/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll() {
    // const User = this.userRepository.findOne({
    //   where: { id: 1 },
    // });
    return {
      id: 1,
      name: 'y111q',
      age: 18,
    };
  }

  findOne() {
    return `Get user with id `;
  }

  create() {
    return 'Create user';
  }

  update() {
    return `Update user with id `;
  }

  remove() {
    return `Remove user with id `;
  }
}
