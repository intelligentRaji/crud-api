import { inject } from '@repo/core';
import { Controller, Delete, Get, params, Post, Put } from '@repo/http';

import { UserService } from '../services/user.service';

@Controller('api/users')
export class UsersController {
  private readonly userService = inject(UserService);

  @Get()
  public getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  public getOne() {
    return this.userService.getOne(params('id'));
  }

  @Post()
  public create() {
    throw new Error('Not implemented');
  }

  @Put(':id')
  public update() {
    throw new Error('Not implemented');
  }

  @Delete(':id')
  public delete() {
    return this.userService.delete(params('id'));
  }
}
