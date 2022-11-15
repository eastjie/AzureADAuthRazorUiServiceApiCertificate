import { DirectApiCallComponent } from './directApiCall/directApiCall.component';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AuthModule, OidcConfigService, LogLevel } from 'angular-auth-oidc-client';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { GraphApiCallComponent } from './graphApiCall/graphApiCall.component';
import { ApplicationApiCallComponent } from './applicationApiCall/applicationApiCall.component';
import { DelegatedApiCallComponent } from './delegatedApiCall/delegatedApiCall.component';
import { AuthorizationGuard } from './authorization.guard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavMenuComponent,
    UnauthorizedComponent,
    DirectApiCallComponent,
    GraphApiCallComponent,
    ApplicationApiCallComponent,
    DelegatedApiCallComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'directApiCall', component: DirectApiCallComponent, canActivate: [AuthorizationGuard] },
    { path: 'graphApiCall', component: GraphApiCallComponent, canActivate: [AuthorizationGuard] },
    { path: 'applicationApiCall', component: ApplicationApiCallComponent, canActivate: [AuthorizationGuard] },
    { path: 'delegatedApiCall', component: DelegatedApiCallComponent, canActivate: [AuthorizationGuard] },
    { path: 'unauthorized', component: UnauthorizedComponent },
  ], { relativeLinkResolution: 'legacy' }),
  AuthModule.forRoot({
    config: {
      authority: 'https://login.microsoftonline.com/42f0810b-51c1-4488-89cb-3ba9af96577d/v2.0',
      authWellknownEndpointUrl: 'https://login.microsoftonline.com/42f0810b-51c1-4488-89cb-3ba9af96577d/v2.0',
      redirectUrl: window.location.origin,
      clientId: '07b92ac7-c663-4277-b832-7ed3b94dd093',
      scope: 'openid profile email api://0384055c-9c8a-4043-86aa-589b69078ba2/access_as_user offline_access',
      responseType: 'code',
      silentRenew: true,
      useRefreshToken: true,
      maxIdTokenIatOffsetAllowedInSeconds: 600,
      issValidationOff: false,
      autoUserInfo: false,
      logLevel: LogLevel.Debug
    },
  }),
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    AuthorizationGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
