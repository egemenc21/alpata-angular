import { Component, inject, Input } from '@angular/core';
import { AuthService, User } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `<header class="bg-primary container-fluid " *ngIf="user">
    <nav
      class="w-50 mx-auto d-flex flex-column flex-sm-row align-items-center justify-content-center  "
    >
      <img
        [src]="imageUrl"
        alt="Img"
        class="img-thumbnail m-4"
        width="150"
        height="150"
      />

      <div class="container-fluid my-4 text-light ">
        <h2 class="h2 ">User Details</h2>
        <div class="row justify-content-center align-items-center">
          <div class="col">{{ user.name }} {{ user.surname }}</div>
        </div>
        <div class="row">
          <div class="col">{{ user.email }}</div>
        </div>
        <div class="row">
          <div class="col">{{ user.phoneNumber }}</div>
        </div>
      </div>
      <p-button label="Logout" severity="danger" (click)="logout()" class="m-4"></p-button>
    </nav>
  </header>`,
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  @Input() user: User;
  @Input() imageUrl: string;
  authService = inject(AuthService);
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token');
    this.authService.setAuthToken(null);

    setTimeout(() => {
      this.router.navigate(['/']);
    }, 200);
  }
}
