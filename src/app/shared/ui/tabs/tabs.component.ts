import {
  ChangeDetectionStrategy,
  Component,
  Input,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { hostBinding } from 'ngxtension/host-binding';
import { TabsTriggerDirective } from '@shared/ui/tabs/tabs-trigger.component';
import { TabsContentDirective } from '@shared/ui/tabs/tabs-content.directive';

export type TabsOrientation = 'horizontal' | 'vertical';
export type TabsDirection = 'ltr' | 'rtl';
export type TabsActivationMode = 'automatic' | 'manual';

@Component({
  selector: 'mtx-tabs',
  standalone: true,
  template: ` <ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TabsComponent {
  protected readonly _orientation = hostBinding(
    'attr.data-orientation',
    signal<TabsOrientation>('horizontal')
  );
  @Input()
  set orientation(value: TabsOrientation) {
    this._orientation.set(value);
  }
  $orientation = this._orientation.asReadonly();

  protected readonly _direction = hostBinding(
    'attr.dir',
    signal<TabsDirection>('ltr')
  );
  @Input()
  set direction(value: TabsDirection) {
    this._direction.set(value);
  }
  $direction = this._direction.asReadonly();

  protected readonly _value = signal<string | undefined>(undefined);
  @Input()
  set value(value: string) {
    this._value.set(value);
  }
  $value = this._value.asReadonly();

  protected readonly _activationMode = signal<TabsActivationMode>('automatic');
  @Input()
  set activationMode(value: TabsActivationMode) {
    this._activationMode.set(value);
  }
  $activationMode = this._activationMode.asReadonly();

  private _tabs: {
    [key: string]: {
      trigger: TabsTriggerDirective;
      content: TabsContentDirective;
    };
  } = {};
  public readonly $tabs = this._tabs;

  public registerTrigger(key: string, trigger: TabsTriggerDirective) {
    this._tabs[key] = {
      ...(this._tabs[key] ?? {}),
      trigger,
    };
  }

  public registerContent(key: string, content: TabsContentDirective) {
    this._tabs[key] = {
      ...(this._tabs[key] ?? {}),
      content,
    };
  }

  setValue(key: string) {
    this._value.set(key);
  }
}
