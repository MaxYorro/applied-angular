import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-counter-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: ` <div>Counter Stuff Goes Here</div> `,
  styles: ``,
})
export class CounterComponent {}
