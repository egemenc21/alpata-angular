import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
  ],
  template: `
    <section
      class="container-fluid d-flex flex-column justify-content-center align-content-center text-center bg-info "
      style="height: 100vh;"
    >
      <h3 class="h4 text-center">Already have an account? Please sign in!</h3>

      <form class="container" [formGroup]="applyForm" (submit)="submitApplication()">
        <label class="row justify-content-center align-content-center">
          <input
            type="email"
            pInputText
            formControlName="email"
            placeholder="Email"
            class="col-lg-6"
          />
        </label>
        <label class="row justify-content-center align-content-center ">
          <input
            type="password"
            pInputText
            formControlName="password"
            placeholder="Password"
            class="col-lg-6"
          />
        </label>
        <button
          pButton
          pRipple
          type="submit"
          label="Sign in"
          class="p-button-success"
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
  value = 5;

  applyForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });

  

  constructor() {
    console.log(this.value);
  }

  submitApplication() {
    console.log(this.applyForm.value.email, this.applyForm.value.password);
  }
}
