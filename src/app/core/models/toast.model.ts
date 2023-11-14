import { ToastType } from '@shared/components/toast/toast.component';

export interface ToastConfig {
  id: string;
  type: ToastType;
  titleRef: string;
  descriptionRef?: string;
  toastClass?: string;
  msTimeout?: number;
}
