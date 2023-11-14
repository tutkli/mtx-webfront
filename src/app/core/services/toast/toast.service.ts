import { Injectable, signal } from '@angular/core';
import { ToastConfig } from '@core/models/toast.model';
import { nanoid } from 'nanoid';

const defaultToastConfig: Partial<ToastConfig> = {
  type: 'info',
  msTimeout: 5000,
};

@Injectable({ providedIn: 'root' })
export class ToastService {
  private _toasts = signal<ToastConfig[]>([]);
  toasts = this._toasts.asReadonly();

  show(config: Partial<ToastConfig>) {
    const completeConfig = this.completeToastConfig(config);
    this._toasts.update(current => [...current, completeConfig]);

    return completeConfig.id;
  }

  remove(id: string) {
    this._toasts.update(current => current.filter(toast => toast.id !== id));
  }

  private completeToastConfig(config: Partial<ToastConfig>): ToastConfig {
    const id = config.id ?? nanoid();
    return <ToastConfig>{ id, ...defaultToastConfig, ...config };
  }
}
