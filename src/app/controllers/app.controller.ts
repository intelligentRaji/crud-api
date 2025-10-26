import { inject } from '../../di/inject';
import { TestService } from '../services/test.service';

export class AppController {
  private readonly testService = inject(TestService);

  constructor() {
    console.log(this.testService.test);
  }
}
