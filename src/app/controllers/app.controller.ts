import { Controller } from '../../routing/decorators/controller';
import { Get } from '../../routing/decorators/get';
import { req } from '../../routing/tokens';

@Controller('test')
export class AppController {
  @Get('natasha')
  public returnData() {
    return this.test();
  }

  @Get('data')
  public test() {
    return req().url;
  }
}
