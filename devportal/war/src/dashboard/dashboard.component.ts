import { Component } from 'angular2/core';

@Component({
    selector: 'dp-dashboard',
    template: `
    <h3>{{dashboard.name}}</h3>
  `
})

export class DashboardComponent {
    dashboard = { name: 'Lex' };
}

