/*
 * Angular 2 decorators and services
 */
import {Component} from 'angular2/core';
import {ViewEncapsulation} from 'angular2/core';
import {RouteConfig, Router} from 'angular2/router';

import {Home} from './home';
import {APIs} from './apis';
import {AppState} from './app.service';
import {Dashboard} from './dashboard';
import {ClientApps} from './clientApps';
import {RouterActive} from './router-active';

/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'app',
    pipes: [],
    providers: [],
    directives: [RouterActive],
    styles: [
        require('../assets/scss/main.scss')
    ],
    encapsulation: ViewEncapsulation.None,
    template: require('./layout.html')
})
@RouteConfig([
    {path: '/', name: 'Home', component: Home, useAsDefault: true},
    {path: '/apis', name: 'APIs', component: APIs},
    {path: '/apps', name: 'Client Apps', component: ClientApps},
    {path: '/dashboard', name: 'Dashboard', component: Dashboard}
])
export class App {
    logoWhiteBg = 'assets/img/dev-portal-logo-01.png';
    logoDarkBg = 'assets/img/dev-portal-logo-02.png';
    title = 'Developer Portal';
    url = 'https://twitter.com/apiman_io';
    loggedIn = true;
    //loggedIn = false;

    constructor(public appState:AppState) {
    }

    get state() {
        return this.appState.get();
    }

    ngOnInit() {
        console.log('Initial App State', this.state);
    }

}
