import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  inject,
  runInInjectionContext,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthService, RegistrationResponse } from '../services/auth.service';
import { InputMask, InputMaskModule } from 'primeng/inputmask';
import {
  FileSelectEvent,
  FileUploadEvent,
  FileUploadModule,
} from 'primeng/fileupload';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    InputMaskModule,
    FileUploadModule,
  ],
  template: `<section
    class="container-fluid d-flex flex-column justify-content-center align-content-center text-center bg-info "
    style="height: 100vh;"
  >
    <h3 class="h4 text-center font-weight-bolder p-3">
      You don't have an account? Please Register!
    </h3>

    <form class="container" [formGroup]="applyForm" (submit)="submitForm()">
      <label class="row justify-content-center align-content-center">
        <input
          type="text"
          pInputText
          formControlName="name"
          placeholder="Your Name"
          class="col-lg-6"
          required
        />
      </label>
      <label class="row justify-content-center align-content-center">
        <input
          type="text"
          pInputText
          formControlName="surname"
          placeholder="Your Surname"
          class="col-lg-6"
          required
        />
      </label>
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
          placeholder="Your Password"
          class="col-lg-6"
          required
        />
      </label>

      <label class="row justify-content-center align-content-center">
        <p-inputMask
          ariaLabelledBy="phone"
          mask="(999) 999-9999"
          formControlName="phoneNumber"
          placeholder="(999) 999-9999"
        ></p-inputMask>
      </label>

      <p-fileUpload
        mode="basic"
        chooseLabel="Choose"
        name="demo[]"
        accept="image/*"
        maxFileSize="1000000"
        (onSelect)="onSelect($event)"
        styleClass="mb-2"
      ></p-fileUpload>

      <button
        pButton
        pRipple
        type="submit"
        label="Register"
        class="p-button-success w-50 col-lg-2"
        [raised]="true"
        [rounded]="true"
        severity="success"
      ></button>
    </form>
  </section>`,
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  authService = inject(AuthService);
  registrationSucceeded = false;
  registrationResponse: RegistrationResponse = {
    succeeded: false,
    message: '',
  };
  constructor(private router: Router) {}

  applyForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    phoneNumber: new FormControl('', [Validators.required]),
    file: new FormControl(null, [Validators.required]),
  });

  ngDoCheck() {
    if (this.registrationResponse.succeeded)
      this.router.navigate(['/dashboard']);

    console.log(this.applyForm.valid);
    console.log(this.applyForm.value);
  }

  onSelect($event: FileSelectEvent) {
    
    const file = $event.files[0];
    if (file) {
      this.applyForm.patchValue({ file: file });
    }
  }

  submitForm = async () => {
    try {
      const data = await this.authService.toFormData(this.applyForm.value);
      this.authService.register(data).subscribe({
        next: (res) => {
          this.registrationResponse = res;
          console.log(this.registrationResponse);
        },
        error: (err) => {
          console.error(err);
        },
      });
      console.log(this.registrationResponse);
    } catch (error) {
      console.log(error);
    }
  };
}
