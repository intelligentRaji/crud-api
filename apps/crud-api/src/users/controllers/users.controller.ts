import { inject } from '@di';
import { Controller, Delete, Get, params, Post, Put, request } from '@http/router';
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
    const { body } = request();

    return this.userService.create(body);
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
