import { Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ModifyMeetingComponent } from './modify-meeting/modify-meeting.component';
import { MeetingComponent } from './meeting/meeting.component';

export const routes: Routes = [
  {
    path: '',
    component: SignInComponent,
    title: 'Authentication',
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register',
  },
  {
    path: 'dashboard',
    component: HomeComponent,
    title: 'Dashboard',
    children: [
      {
        path: '',
        component: MeetingComponent,
      },
      {
        path: 'modify/:id',
        title: 'Modify',
        component: ModifyMeetingComponent,
      },
    ],
  },
];
