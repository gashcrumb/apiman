import { Component } from 'angular2/core';

@Component({
    selector: 'example',
    template: `
    <h3>{{example.name}}</h3>
  `
})
export class ExampleComponent {
    example = { name: 'Lex' };
}

