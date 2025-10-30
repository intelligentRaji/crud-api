import { Module } from '@di';
import { UsersController } from './controllers/users.controller';

@Module({
  imports: [],
  controllers: [UsersController],
})
export class AppModule {}
