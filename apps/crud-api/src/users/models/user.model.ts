import { v4 as uuid } from 'uuid';

import { BadRequestError } from '@repo/http';

import type { User } from '../types/user';

export type UserModelProps = Omit<User, 'id'>;

export class UserModel implements User {
  private user: User;

  public get id(): string {
    return this.user.id;
  }

  public get username(): string {
    return this.user.username;
  }

  public get age(): number {
    return this.user.age;
  }

  public get hobbies(): string[] {
    return this.user.hobbies;
  }

  constructor({ username, age, hobbies }: UserModelProps) {
    if (!username) throw this.throwRequiredProperty('username');
    if (!age) throw this.throwRequiredProperty('age');
    if (!hobbies) throw this.throwRequiredProperty('hobbies');

    this.user = {
      id: uuid(),
      username,
      age,
      hobbies,
    };
  }

  public update(user: Partial<UserModelProps>): UserModel {
    this.user = {
      ...this.user,
      ...user,
    };

    return this;
  }

  public toJSON(): User {
    return this.user;
  }

  private throwRequiredProperty(property: string): never {
    throw new BadRequestError(`property "${property}" is required for user creation`);
  }
}
