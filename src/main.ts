import 'reflect-metadata';

import { Application } from '@core';

import { AppModule } from './app/app.module';

Application.init(AppModule, { host: 'localhost', port: 3000 });
