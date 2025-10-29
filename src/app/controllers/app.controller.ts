import { inject } from '../../di/inject';
import { Controller } from '../../routing/decorators/controller';
import { Get } from '../../routing/decorators/method-decorators/get';
import { params, req } from '../../routing/tokens';
import { ContentType } from '../../serializing/decorators/content-type';
import { TestService } from '../services/test.service';

@Controller('test')
export class AppController {
  private readonly testService = inject(TestService);

  @Get()
  public test() {
    return this.testService.test;
  }

  @Get('url')
  public testUrl() {
    return req().url;
  }

  @ContentType('application/json')
  @Get(':id')
  public testById() {
    return params('id');
  }
}
