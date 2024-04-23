import { Component, DEFAULT_CURRENCY_CODE } from '@angular/core';
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
  providers:[{provide: DEFAULT_CURRENCY_CODE, useValue: 'TL'}]
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
