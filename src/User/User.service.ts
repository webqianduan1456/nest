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

  findAll(id: number = 1) {
    const User = this.userRepository.findOne({
      where: { id },
    });
    return User;
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
