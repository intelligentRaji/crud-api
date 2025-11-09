import { Module } from '@di';
import { HttpModule } from '@http';

import { UsersController } from './controllers/users.controller';

@Module({
  imports: [HttpModule.forRoot({ host: 'localhost', port: 3000 })],
  controllers: [UsersController],
})
export class AppModule {}
