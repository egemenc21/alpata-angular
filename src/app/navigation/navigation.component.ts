import { Component, Input } from '@angular/core';
import { User } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule],
  template: `<header
    class="bg-primary container-fluid d-flex align-content-center "
    *ngIf="user"
  >
    <img
      [src]="imageUrl"
      alt="Img"
      class="img-thumbnail m-4"
      width="150"
      height="150"
    />

    <div class="container-fluid mt-4 text-light ">
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
  </header>`,
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  @Input() user: User;
  @Input() imageUrl: string;
}
