import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {ContainerComponent} from './container/container.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './pages/login/login.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {IndexComponent} from './pages/index/index.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {InstallComponent} from './pages/install/install.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatSidenavModule} from "@angular/material/sidenav";
import {SidebarComponent, SidebarDialogComponent} from './views/sidebar/sidebar.component';
import {MatListModule} from "@angular/material/list";
import {MatRippleModule} from "@angular/material/core";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {ConfigClientComponent} from './pages/config-client/config-client.component';
import {ConfigUserUserComponent, UserConfigDialog} from './pages/config-user-user/config-user-user.component';
import {DashBoardComponent} from './pages/dashboard/dash-board.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSelectModule} from "@angular/material/select";
import {ConfigClientUserComponent} from './pages/config-client-user/config-client-user.component';
import {ConfigClientGroupComponent} from './pages/config-client-group/config-client-group.component';
import {MatCardModule} from "@angular/material/card";
import {MatExpansionModule} from "@angular/material/expansion";
import {ClientInsertDialog} from "./pages/config-client-user/client-insert-dialog";
import {ClientOptionDialog} from "./pages/config-client-user/client-options-dialog";
import {UserSelectorComponent} from './views/user-selector/user-selector.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {DeleteViewComponent} from './views/delete-view/delete-view.component';
import {ConfigUserGroupComponent} from './pages/config-user-group/config-user-group.component';
import {ConfigUserComponent} from "./pages/config-user/config-user.component";
import { UserGroupSelectorComponent } from './views/user-group-selector/user-group-selector.component';
import { UserGroupInsertComponent } from './views/user-group-insert/user-group-insert.component';

@NgModule({
  declarations: [
    ContainerComponent,
    LoginComponent,
    IndexComponent,
    InstallComponent,
    DashBoardComponent,
    SidebarComponent,
    SidebarDialogComponent,
    UserConfigDialog,
    ClientInsertDialog,
    ClientOptionDialog,
    ConfigClientComponent,
    ConfigUserUserComponent,
    ConfigUserComponent,
    ConfigClientUserComponent,
    ConfigClientGroupComponent,
    UserSelectorComponent,
    DeleteViewComponent,
    ConfigUserGroupComponent,
    UserGroupSelectorComponent,
    UserGroupInsertComponent,
  ],
  imports: [
    MatDialogModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressBarModule,
    MatTabsModule,
    MatSidenavModule,
    MatListModule,
    MatRippleModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    FormsModule,
    MatCardModule,
    MatExpansionModule,
    MatSlideToggleModule,
  ],
  providers: [HttpClient],
  bootstrap: [ContainerComponent]
})
export class AppModule {
}
