// Browserify Entry Point
// This file includes a list of dependencies we want to use on the client, but must be
// installed server-side with npm. Browserify will check all requires(), subsequently
// bundling them into a single file, which we can then use on the client.

/*
<!-- IE required polyfills, order is important -->
var es6Shim = require('es6-shim/es6-shim.min.js');
var systemPolyfills = require('systemjs/dist/system-polyfills.js');

var angularPolyfills = require('angular2/bundles/angular2-polyfills.js'); // Polyfills for Angular2
var systemjs = require('systemjs/dist/system.src.js'); // SystemJS for module loading
var rxjs = require('rxjs/bundles/Rx.js'); // Reactive Extensions RxJS
var angular = require('angular2/bundles/angular2.dev.js'); // Web development version of Angular 2
*/

/**
 * ES6 Polyfills
 */
require('es6-promise');
require('es6-collections');

/**
 * Zone.js
 */
require('zone.js/dist/zone');
require('zone.js/dist/long-stack-trace-zone');

/**
 * ReflectMetadata
 */
require('reflect-metadata');

/**
 * RxJS
 */
require('rxjs/Rx');

require('angular2/bundles/angular2.dev.js'); // Web development version of Angular 2
