import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RequestService } from '@core/services/request/request.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { ButtonDirective } from '@shared/ui/button/button.directive';
import { Router } from '@angular/router';
import { lucideX } from '@ng-icons/lucide';

@Component({
  selector: 'mtx-request-detail',
  standalone: true,
  imports: [NgIcon, ButtonDirective],
  providers: [provideIcons({ lucideX })],
  template: `
    <div>
      <button mtxButton type="ghost" (click)="closeDetail()">
        <ng-icon name="lucideX" />
      </button>
      <h1>{{ selectedRequest()?.token }}</h1>
      <p>{{ selectedRequest()?.description }}</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RequestDetailComponent {
  private readonly requestService = inject(RequestService);
  private readonly router = inject(Router);

  selectedRequest = this.requestService.selectedRequest;

  closeDetail() {
    this.requestService.selectRequest();
    this.router.navigate(['list']).then();
  }
}
