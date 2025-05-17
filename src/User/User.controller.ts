/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Controller, Get, Post, Delete, Put, Query } from '@nestjs/common';
import { UserService } from './User.service';
import OSS from 'ali-oss';
import { Inject } from '@nestjs/common';
import { OSS_PROVIDER } from 'src/core/oss';

@Controller('user')
export class UserController {
  constructor(
    private readonly UserService: UserService,
    @Inject(OSS_PROVIDER)
    private readonly ossClient: OSS,
  ) {}

  @Get()
  findAll() {
    return this.UserService.findAll();
  }

  @Get()
  findOne() {
    return {};
  }
  // 图片获取
  @Get('img')
  findImg(@Query('filename') filename: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
    const url = this.ossClient.signatureUrl(filename, {
      expires: 3600,
      response: {
        'content-disposition': 'inline', // 强制浏览器展示图片
      },
    });
    return {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      url,
    };
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
