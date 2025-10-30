import { Controller, Delete, Get, Post, Put } from '@router';

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
    return 'update';
  }

  @Delete(':id')
  public delete() {
    return 'delete';
  }
}
