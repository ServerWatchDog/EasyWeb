import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {ContainerComponent} from './container/container.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './pages/login/login.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import { IndexComponent } from './pages/index/index.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { InstallComponent } from './pages/install/install.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatSidenavModule} from "@angular/material/sidenav";
import { PanelComponent } from './pages/panel/panel.component';
import {SidebarComponent, SidebarDialogComponent} from './views/sidebar/sidebar.component';
import {MatListModule} from "@angular/material/list";
import {MatRippleModule} from "@angular/material/core";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import { ConfigClientComponent } from './pages/config-client/config-client.component';
import { ConfigUserComponent } from './pages/config-user/config-user.component';

@NgModule({
  declarations: [
    ContainerComponent,
    LoginComponent,
    IndexComponent,
    InstallComponent,
    PanelComponent,
    SidebarComponent,
    SidebarDialogComponent,
    ConfigClientComponent,
    ConfigUserComponent
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
  ],
  providers: [HttpClient],
  bootstrap: [ContainerComponent]
})
export class AppModule {
}
