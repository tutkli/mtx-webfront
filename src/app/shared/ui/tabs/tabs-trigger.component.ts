import {
  computed,
  Directive,
  ElementRef,
  inject,
  Input,
  OnChanges,
  signal,
  SimpleChanges,
} from '@angular/core';
import { TabsComponent } from '@shared/ui/tabs/tabs.component';
import { cva } from '@utils/cva';
import { VariantProps } from 'cva';

const tabsTriggerVariants = cva({
  base: 'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm',
});

export type TabsTriggerVariants = VariantProps<typeof tabsTriggerVariants>;

@Directive({
  selector: 'button[mtxTabsTrigger]',
  standalone: true,
  host: {
    '[attr.class]': '_class()',
    '[id]': 'labelId',
    type: 'button',
    role: 'tab',
    '[tabindex]': '_isSelected() ? "0": "-1"',
    '[attr.aria-selected]': '_isSelected()',
    '[attr.aria-controls]': 'contentId',
    '[attr.data-state]': "_isSelected() ? 'active' : 'inactive'",
    '[attr.data-orientation]': '_orientation()',
    '[attr.data-disabled]': "disabled ? '' : undefined",
    '(click)': 'activate()',
  },
})
export class TabsTriggerDirective implements OnChanges {
  private _root = inject(TabsComponent);
  private _elementRef = inject(ElementRef);

  private _key: string | undefined;
  protected contentId: string | undefined;
  protected labelId: string | undefined;
  protected readonly _orientation = this._root.$orientation;
  protected readonly _isSelected = computed(() => this._root.$value() === this._key);

  @Input('mtxTabsTrigger')
  set triggerFor(key: string) {
    this._key = key;
    this.contentId = 'mtx-tabs-content-' + this._key;
    this.labelId = 'mtx-tabs-label-' + this._key;
    this._root.registerTrigger(key, this);
  }
  @Input()
  public disabled = false;

  @Input() class = '';

  protected _class = signal(tabsTriggerVariants({ className: this.class }));

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('class')) {
      this._class.set(tabsTriggerVariants({ className: this.class }));
    }
  }

  public focus() {
    this._elementRef.nativeElement.focus();
    if (this._root.$activationMode() === 'automatic') {
      this.activate();
    }
  }

  public activate() {
    if (!this._key) return;
    this._root.setValue(this._key);
  }
}
