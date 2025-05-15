import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor() {}

  findAll() {
    return {
      id: 1,
      name: '完署111',
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
