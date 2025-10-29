import { Controller } from '../../routing/decorators/controller';
import { Get } from '../../routing/decorators/method-decorators/get';
import { req } from '../../routing/tokens';

@Controller('test')
export class AppController {
  @Get()
  public test() {
    return req().url;
  }
}
