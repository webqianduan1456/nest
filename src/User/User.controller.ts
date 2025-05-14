import { Controller, Get, Post, Delete, Put } from '@nestjs/common';
import { UserService } from './User.service';
@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get()
  findAll() {
    return this.UserService.findAll();
  }

  @Get()
  findOne() {
    return {};
  }

  @Post()
  create() {
    return {};
  }

  @Put()
  update() {
    return {};
  }

  @Delete()
  remove() {
    return {};
  }
}
