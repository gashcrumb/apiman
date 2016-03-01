import { bootstrap } from 'angular2/platform/browser';
import { ExampleComponent } from './example.component';

bootstrap(ExampleComponent)
    .then(success => console.log(`Bootstrapped successfully...`))
    .catch(error => console.log(error));
