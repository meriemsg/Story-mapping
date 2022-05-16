import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '../app/pages/login/login.component';
import {HomeComponent} from './pages/home/home.component';
import {DetailsComponent} from './pages/details/details.component';
import {ProjectsComponent} from './reusables/components/project/projects.component';
import {AuthGuard} from './reusables/guards/auth.guard'

// @ts-ignore
const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'project/:id', component: DetailsComponent, canActivate: [AuthGuard]},
  {path: 'project', component: ProjectsComponent, canActivate: [AuthGuard]}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
