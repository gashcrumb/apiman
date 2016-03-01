import {
    TestComponentBuilder,
    describe,
    expect,
    injectAsync,
    it,
    beforeEachProviders
} from 'angular2/testing';

import {Component, provide, DirectiveResolver} from 'angular2/core';

import {Location, Router, RouteRegistry, ROUTER_PRIMARY_COMPONENT} from 'angular2/router';
import {SpyLocation} from 'angular2/src/mock/location_mock';
import {RootRouter} from 'angular2/src/router/router';

import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import {DashboardComponent} from './dashboard.component';

export function main() {
    describe('Dashboard component', () => {

        // Support for testing component that uses Router
        beforeEachProviders(() => [
        RouteRegistry,
        DirectiveResolver,
        provide(Location, {useClass: SpyLocation}),
        provide(ROUTER_PRIMARY_COMPONENT, {useValue: DashboardComponent}),
        provide(Router, {useClass: RootRouter})
    ]);

    it('should work',
        injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    }));
});
}

@Component({
    selector: 'test-cmp',
    template: '<sd-dashboard></sd-dashboard>',
    directives: [DashboardComponent]
});

class TestComponent {}