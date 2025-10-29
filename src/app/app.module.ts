import { Module } from '../di/decorators/module';
import { AppController } from './controllers/app.controller';
import { TestService } from './services/test.service';

@Module({
  providers: [TestService],
  controllers: [AppController],
})
export class AppModule {}
