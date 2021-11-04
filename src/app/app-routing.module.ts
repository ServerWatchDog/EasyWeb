import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {IndexComponent} from "./pages/index/index.component";
import {InstallComponent} from "./pages/install/install.component";
import {ConfigClientComponent} from "./pages/config-client/config-client.component";
import {DashBoardComponent} from "./pages/dashboard/dash-board.component";
import { ConfigUserComponent } from './pages/config-user/config-user.component';
import {ConfigUserUserComponent} from "./pages/config-user-user/config-user-user.component";
import {ConfigUserGroupComponent} from "./pages/config-user-group/config-user-group.component";
import {ConfigClientUserComponent} from "./pages/config-client-user/config-client-user.component";
import {ConfigClientGroupComponent} from "./pages/config-client-group/config-client-group.component";
import {ConfigLogComponent} from "./pages/config-log/config-log.component";
import {ConfigLogUserComponent} from "./pages/config-log-user/config-log-user.component";
import {ConfigLogClientComponent} from "./pages/config-log-client/config-log-client.component";

const routes: Routes = [
  {

    path: '',
    component: IndexComponent,
    children: [
      {
        path: 'dashboard',
        component: DashBoardComponent
      },{
        path: 'log',
        component: ConfigLogComponent,
        children:[
          {
            path:'user',
            component:ConfigLogUserComponent
          },
          {
            path:'client',
            component:ConfigLogClientComponent
          }
        ]
      }, {
        path: 'user',
        component: ConfigUserComponent,
        children:[
          {
            path:'user',
            component:ConfigUserUserComponent
          },
          {
            path:'group',
            component:ConfigUserGroupComponent
          }
        ]
      }, {
        path: 'client',
        component: ConfigClientComponent,
        children:[
          {
            path:'client',
            component:ConfigClientUserComponent
          },
          {
            path:'group',
            component:ConfigClientGroupComponent
          }
        ]
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
