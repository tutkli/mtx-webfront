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
import { hostBinding } from 'ngxtension/host-binding';

const tabsContentVariants = cva({
  base: 'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
});

export type TabsContentVariants = VariantProps<typeof tabsContentVariants>;

@Directive({
  selector: '[mtxTabsContent]',
  standalone: true,
  host: {
    role: 'tabpanel',
    tabindex: '0',
    '[id]': 'contentId',
    '[attr.aria-labelledby]': 'labelId',
    '[hidden]': '_isSelected() === false',
  },
})
export class TabsContentDirective implements OnChanges {
  private _root = inject(TabsComponent);
  private _elementRef = inject(ElementRef);

  private _key: string | undefined;
  protected contentId: string | undefined;
  protected labelId: string | undefined;
  protected readonly _isSelected = computed(() => this._root.$value() === this._key);

  @Input('mtxTabsContent')
  set contentFor(key: string) {
    this._key = key;
    this.contentId = 'mtx-tabs-content-' + this._key;
    this.labelId = 'mtx-tabs-label-' + this._key;
    this._root.registerContent(key, this);
  }

  @Input() class = '';

  _class = hostBinding(
    'attr.class',
    signal(tabsContentVariants({ className: this.class }))
  );

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('class')) {
      this._class.set(tabsContentVariants({ className: this.class }));
    }
  }

  public focus() {
    this._elementRef.nativeElement.focus();
  }
}
