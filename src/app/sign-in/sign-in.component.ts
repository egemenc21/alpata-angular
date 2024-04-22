import { Component, inject, Input, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
FormsModule;
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CustomPipe } from '../pipes/custom.pipe';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
    CustomPipe,
  ],
  template: `
    <section
      class="container-fluid d-flex flex-column justify-content-center align-content-center text-center bg-info "
      style="height: 100vh;"
    >
      <h3 class="h4 text-center font-weight-bolder p-3">
        Already have an account? Please sign in!
      </h3>

      <form
        class="container"
        [formGroup]="applyForm"
        (submit)="submitApplication()"
      >
        <label class="row justify-content-center align-content-center">
          <input
            type="email"
            pInputText
            formControlName="email"
            placeholder="Email"
            class="col-lg-6"
            required
          />
        </label>
        <label class="row justify-content-center align-content-center ">
          <input
            type="password"
            pInputText
            formControlName="password"
            placeholder="Password"
            class="col-lg-6"
            required
          />
        </label>
        <button
          pButton
          pRipple
          type="submit"
          label="Sign in"
          class="p-button-success w-50 col-lg-2"
          [raised]="true"
          [rounded]="true"
          severity="success"
        ></button>
      </form>
    </section>
  `,
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  authService = inject(AuthService);

  applyForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
    date: new FormControl(),
  });

  constructor(private router: Router) {}

  ngOnInit() {
    const isToken = localStorage.getItem('token');
    if (isToken) this.router.navigate(['/dashboard']);
  }

  ngDoCheck() {
    console.log(this.authService.getAuthToken());
    if (this.authService.getAuthToken()) this.router.navigate(['/dashboard']);
  }

  async submitApplication() {
    try {
      this.authService
        .signIn(this.applyForm.value.email, this.applyForm.value.password)
        .subscribe({
          next: (res) => {
            this.authService.setAuthToken(res.token);
            localStorage.setItem('token', res.token);
          },
          error: (err) => console.log(err),
        });
    } catch (error) {
      console.log(error);
    }
  }
}
