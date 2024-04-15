import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthComponent } from './auth/auth.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule, AuthComponent],
  template: `
    <div class="card flex justify-content-center">
      <p-button label="Submit"></p-button>
      <app-auth></app-auth>
    </div>
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'client';
}
