import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {NavbarComponent} from './navbar.component';
import {HomeComponent} from '../home/home.component';

@Component({
    selector: 'sd-app',
    templateUrl: './app.component.html',
    directives: [ROUTER_DIRECTIVES, NavbarComponent]
})
@RouteConfig([
    { path: '/',      name: 'Home',  component: HomeComponent  }
])
export class AppComponent {}
