import { Component } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [ProgressSpinnerModule],
  template:`
  <div class="progress-spinner">
    <p-progressSpinner ariaLabel="loading" styleClass=""></p-progressSpinner>
  </div>`,
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {

}
