import 'reflect-metadata';
import { AppModule } from './app/app.module';
import { Application } from './core/application';

Application.init(AppModule, { host: 'localhost', port: 3000 });
