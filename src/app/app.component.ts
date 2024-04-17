import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLinkActive, RouterLink],
  template: `
    <main class=" " style="height: 100vh;">
      <section>
        <!-- The routed views render in the <router-outlet>-->
        <router-outlet></router-outlet>
      </section>

    </main>
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'client';
}

// //
// <!-- <nav>
// <ul>
//   <li>
//     <a
//       routerLink="/register"
//       routerLinkActive="bg-success"
//       ariaCurrentWhenActive="page"
//       >First Component</a
//     >
//   </li>
//   <li>
//     <a
//       routerLink="/dashboard"
//       routerLinkActive="bg-success"
//       ariaCurrentWhenActive="page"
//       >Second Component</a
//     >
//   </li>
// </ul>
// </nav> -->
