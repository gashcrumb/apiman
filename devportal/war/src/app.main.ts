/// <reference path="../node_modules/angular2/typings/browser.d.ts" />

import { bootstrap } from 'angular2/platform/browser';
import { DashboardComponent } from './dashboard/dashboard.component';

bootstrap(DashboardComponent)
    .then(success => console.log(`Bootstrapped successfully...`))
    .catch(error => console.log(error));
