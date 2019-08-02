import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SpacesComponent } from './spaces/spaces.component';
import { TaskComponent } from './task/task.component';
import { MembersComponent } from './members/members.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { RedirectComponent } from './redirect/redirect.component';

const routes: Routes = [
  { path: 'login', component: ProfileComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'members', component: MembersComponent },
  { path: 'spaces', component: SpacesComponent },
  { path: 'task', component: TaskComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '', component: LoginComponent },
  { path: '/register', component: RegisterComponent },
  { path: '/redirect', component: RedirectComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
