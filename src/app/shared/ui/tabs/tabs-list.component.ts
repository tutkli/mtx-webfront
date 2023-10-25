import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  HostBinding,
  inject,
  Input,
  OnChanges,
  QueryList,
  signal,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { FocusKeyManager } from '@angular/cdk/a11y';
import { take } from 'rxjs';
import { TabsComponent } from '@shared/ui/tabs/tabs.component';
import { TabsTriggerDirective } from '@shared/ui/tabs/tabs-trigger.component';
import { rxHostListener } from '@utils/rx-host-integration';
import { cva } from '@utils/cva';
import { VariantProps } from 'cva';
import { hostBinding } from 'ngxtension/host-binding';

const tabsListVariants = cva({
  base: 'inline-flex items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
  variants: {
    orientation: {
      horizontal: 'h-10 space-x-1',
      vertical: 'mt-2 flex-col h-fit space-y-1',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

type TabsListVariants = VariantProps<typeof tabsListVariants>;

@Component({
  selector: 'mtx-tabs-list',
  standalone: true,
  template: ` <ng-content />`,
  host: {
    role: 'tablist',
    '[attr.aria-orientation]': '_orientation()',
    '[attr.data-orientation]': '_orientation()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TabsListComponent implements OnChanges, AfterContentInit {
  private _root = inject(TabsComponent);

  protected readonly _orientation = this._root.$orientation;
  private readonly _direction = this._root.$direction;
  private readonly _value = this._root.$value;
  private readonly _tabs = this._root.$tabs;
  private readonly _keyDownListener = rxHostListener('keydown');

  private _keyManager?: FocusKeyManager<TabsTriggerDirective>;

  @HostBinding('attr.aria-label')
  @Input('aria-label')
  ariaLabel: string | undefined;

  @Input() class = '';

  hostClass = hostBinding(
    'attr.class',
    signal(
      tabsListVariants({
        orientation: this._orientation(),
        className: this.class,
      })
    )
  );

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('class')) {
      this.hostClass.set(
        tabsListVariants({
          orientation: this._orientation(),
          className: this.class,
        })
      );
    }
  }

  @ContentChildren(TabsTriggerDirective, { descendants: true })
  public triggers?: QueryList<TabsTriggerDirective>;

  public ngAfterContentInit() {
    if (!this.triggers) {
      return;
    }
    this._keyManager = new FocusKeyManager<TabsTriggerDirective>(this.triggers)
      .withHorizontalOrientation(this._direction())
      .withHomeAndEnd()
      .withPageUpDown()
      .withWrap();

    // needed because by default the index is set to -1, which means first interaction is skipped
    this._keyDownListener.pipe(take(1)).subscribe(() => {
      const currentKey = this._value();
      let activeIndex = 0;
      if (currentKey && this.triggers) {
        const currentTab = this._tabs[currentKey];
        if (currentTab) {
          activeIndex = this.triggers.toArray().indexOf(currentTab.trigger);
        }
      }
      this._keyManager?.setActiveItem(activeIndex);
    });

    this._keyDownListener.subscribe(event => {
      if ('key' in event) {
        if (this._orientation() === 'horizontal') {
          if (event.key === 'ArrowUp' || event.key === 'ArrowDown') return;
        }
        if (this._orientation() === 'vertical') {
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') return;
        }
      }
      this._keyManager?.onKeydown(event as KeyboardEvent);
    });
  }
}
