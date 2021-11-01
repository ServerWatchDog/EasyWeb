import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {IndexComponent} from "./pages/index/index.component";
import {InstallComponent} from "./pages/install/install.component";
import {ConfigUserComponent} from "./pages/config-user/config-user.component";
import {ConfigClientComponent} from "./pages/config-client/config-client.component";
import {DashBoardComponent} from "./pages/dashboard/dash-board.component";

const routes: Routes = [
  {

    path: '',
    component: IndexComponent,
    children: [
      {
        path: 'dashboard',
        component: DashBoardComponent
      }, {
        path: 'user',
        component: ConfigUserComponent,
      }, {
        path: 'client',
        component: ConfigClientComponent,
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'install',
    component: InstallComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
