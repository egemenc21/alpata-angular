import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [],
  template: `
    <section
      class="container d-flex flex-column justify-content-center align-content-center text-center"
      style="height: 100vh;"
    >
      <h3 class="h4 text-center">Already have an account? Please sign in!</h3>

      <form class="container">
        <label class="row justify-content-center align-content-center">
          <input type="email" class="form-control col-6" placeholder="Email" />
        </label>
        <label class="row justify-content-center">
          <input
            type="password"
            class="form-control col-6"
            placeholder="Password"
          />
        </label>
      </form>
    </section>
  `,
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {}
