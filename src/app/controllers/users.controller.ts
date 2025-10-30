import { Controller, Get, Post } from '@router';

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
}
