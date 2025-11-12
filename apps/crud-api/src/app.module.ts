import { Module } from '@repo/core';
import { HttpModule } from '@repo/http';

import { UsersModule } from '@users/users.module';

@Module({
  imports: [HttpModule.forRoot({ host: 'localhost', port: 3000 }), UsersModule],
})
export class AppModule {}
