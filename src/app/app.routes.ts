import { Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path:'',
        component:SignInComponent,
        title:"Authentication"
    },
    {
        path:'register',
        component:RegisterComponent,
        title: "Register"
    },
    {
        path:'dashboard',
        component: HomeComponent,
        title: "Dashboard"
    }
];
