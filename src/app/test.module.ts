import { Module } from '../di/decorators/module';
import { TestService } from './services/test.service';

@Module({
  providers: [TestService],
  exports: [TestService],
})
export class TestModule {}
