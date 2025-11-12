import { validate, version } from 'uuid';

import { BadRequestError, NotFoundError } from '@repo/http';

import { UserModel, type UserModelProps } from '../models/user.model';

export class UserService {
  private readonly users = new Map<string, UserModel>();

  public getAll() {
    return Array.from(this.users.values());
  }

  public getOne(id: string) {
    const user = this.users.get(id);

    if (!validate(id) && version(id) !== 4) throw new BadRequestError('Invalid user id');

    if (!user) throw new NotFoundError(`User with id "${id}" not found`);

    return user;
  }

  public create(user: UserModelProps) {
    const newUser = new UserModel(user);
    this.users.set(newUser.id, newUser);
  }

  public update(id: string, user: UserModelProps) {
    const existingUser = this.getOne(id);

    this.users.set(existingUser.id, existingUser.update(user));
  }

  public delete(id: string) {
    const user = this.getOne(id);

    this.users.delete(user.id);
  }
}
