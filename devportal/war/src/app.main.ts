/// <reference path="../tsd.d.ts" />

import {provide, enableProdMode} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, APP_BASE_HREF} from 'angular2/router';
import { DashboardComponent } from './dashboard/dashboard.component';

//bootstrap(DashboardComponent)
//    .then(success => console.log(`Bootstrapped successfully...`))
//    .catch(error => console.log(error));

//noinspection TypeScriptValidateTypes
bootstrap(DashboardComponent, [
    ROUTER_PROVIDERS,
    provide(APP_BASE_HREF, { useValue: '<%= APP_BASE %>' })
]);
