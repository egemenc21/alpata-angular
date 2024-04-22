import { Component, inject, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  template:`<div class="bg-primary">home</div>`,
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  authService = inject(AuthService);
  ngOnInit(){
    console.log(this.authService.getAuthToken())
  }
  
}
