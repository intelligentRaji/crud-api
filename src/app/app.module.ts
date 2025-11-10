import { Module } from '@di';
import { HttpModule } from '@http';

import { UsersModule } from './users/users.module';

@Module({
  imports: [HttpModule.forRoot({ host: 'localhost', port: 3000 }), UsersModule],
})
export class AppModule {}
