import { Module } from '../di/decorators/module';
import { AppController } from './controllers/app.controller';
import { TestModule } from './test.module';

@Module({
  imports: [TestModule],
  controllers: [AppController],
})
export class AppModule {}
