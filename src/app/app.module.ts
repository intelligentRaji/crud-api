import { Module } from '@di';
import { UsersController } from './controllers/users.controller';
import { HttpModule } from '@http/http.module';

@Module({
  imports: [HttpModule.forRoot({ host: 'localhost', port: 3000 })],
  controllers: [UsersController],
})
export class AppModule {}
