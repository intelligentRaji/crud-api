import { Controller, Delete, Get, params, Post, Put } from '@http/router';

@Controller('api/users')
export class UsersController {
  @Get()
  public getAll() {
    return 'getAll';
  }

  @Get(':id')
  public getOne() {
    return 'getOne';
  }

  @Post()
  public create() {
    return 'create';
  }

  @Put(':id')
  public update() {
    return params();
  }

  @Delete(':id')
  public delete() {
    return 'delete';
  }
}
